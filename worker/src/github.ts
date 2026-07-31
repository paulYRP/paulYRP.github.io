import { escapeGitHubText } from "./validation";

export type GitHubConfiguration = {
  appId: string;
  installationId: string;
  owner: string;
  repository: string;
  privateKey: string;
};

const githubApiVersion = "2026-03-10";
const encoder = new TextEncoder();

function concatenate(...arrays: Uint8Array[]): Uint8Array {
  const length = arrays.reduce((total, array) => total + array.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;

  for (const array of arrays) {
    result.set(array, offset);
    offset += array.length;
  }

  return result;
}

function derLength(length: number): Uint8Array {
  if (length < 128) return new Uint8Array([length]);

  const bytes: number[] = [];
  let remaining = length;
  while (remaining > 0) {
    bytes.unshift(remaining & 0xff);
    remaining >>= 8;
  }
  return new Uint8Array([0x80 | bytes.length, ...bytes]);
}

function derElement(tag: number, value: Uint8Array): Uint8Array {
  return concatenate(new Uint8Array([tag]), derLength(value.length), value);
}

function decodePem(pem: string): Uint8Array {
  const base64 = pem
    .replace(/-----BEGIN [^-]+-----/g, "")
    .replace(/-----END [^-]+-----/g, "")
    .replace(/\s/g, "");

  if (!base64) throw new Error("GitHub private key is invalid.");

  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

export function privateKeyToPkcs8(pem: string): Uint8Array {
  const decoded = decodePem(pem);
  if (pem.includes("-----BEGIN PRIVATE KEY-----")) return decoded;

  if (!pem.includes("-----BEGIN RSA PRIVATE KEY-----")) {
    throw new Error("GitHub private key format is unsupported.");
  }

  const version = new Uint8Array([0x02, 0x01, 0x00]);
  const rsaAlgorithmIdentifier = new Uint8Array([
    0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01,
    0x01, 0x05, 0x00,
  ]);
  const privateKey = derElement(0x04, decoded);

  return derElement(
    0x30,
    concatenate(version, rsaAlgorithmIdentifier, privateKey),
  );
}

function base64Url(value: Uint8Array): string {
  let binary = "";
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function encodeJson(value: unknown): string {
  return base64Url(encoder.encode(JSON.stringify(value)));
}

export async function createGitHubAppJwt(
  appId: string,
  privateKeyPem: string,
  now = Math.floor(Date.now() / 1_000),
): Promise<string> {
  const header = encodeJson({ alg: "RS256", typ: "JWT" });
  const payload = encodeJson({
    iat: now - 60,
    exp: now + 9 * 60,
    iss: appId,
  });
  const unsignedToken = `${header}.${payload}`;
  const privateKeyBytes = privateKeyToPkcs8(privateKeyPem);
  const privateKeyBuffer = new ArrayBuffer(privateKeyBytes.byteLength);
  new Uint8Array(privateKeyBuffer).set(privateKeyBytes);

  const key = await crypto.subtle.importKey(
    "pkcs8",
    privateKeyBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    encoder.encode(unsignedToken),
  );

  return `${unsignedToken}.${base64Url(new Uint8Array(signature))}`;
}

function githubHeaders(token: string): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "paulyrp-site-api",
    "X-GitHub-Api-Version": githubApiVersion,
  };
}

async function createInstallationToken(
  configuration: GitHubConfiguration,
  fetcher: typeof fetch,
): Promise<string> {
  const jwt = await createGitHubAppJwt(
    configuration.appId,
    configuration.privateKey,
  );
  const response = await fetcher(
    `https://api.github.com/app/installations/${configuration.installationId}/access_tokens`,
    {
      method: "POST",
      headers: githubHeaders(jwt),
      body: JSON.stringify({
        repositories: [configuration.repository],
        permissions: { issues: "write" },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub installation authentication failed (${response.status}).`);
  }

  const result = (await response.json()) as { token?: string };
  if (!result.token) throw new Error("GitHub installation token was missing.");
  return result.token;
}

export async function createPrivateMessageIssue(
  configuration: GitHubConfiguration,
  message: string,
  source: string,
  reference: string,
  submittedAt: string,
  fetcher: typeof fetch = fetch,
): Promise<void> {
  const token = await createInstallationToken(configuration, fetcher);
  const safeMessage = escapeGitHubText(message);
  const quotedMessage = safeMessage
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
  const date = submittedAt.slice(0, 10);

  const response = await fetcher(
    `https://api.github.com/repos/${encodeURIComponent(configuration.owner)}/${encodeURIComponent(configuration.repository)}/issues`,
    {
      method: "POST",
      headers: githubHeaders(token),
      body: JSON.stringify({
        title: `Website message · ${date} · ${reference.slice(0, 8)}`,
        body: [
          "## Website message",
          "",
          quotedMessage,
          "",
          "---",
          `Submitted: ${submittedAt}`,
          `Source: ${source}`,
          `Reference: ${reference}`,
        ].join("\n"),
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub issue creation failed (${response.status}).`);
  }
}
