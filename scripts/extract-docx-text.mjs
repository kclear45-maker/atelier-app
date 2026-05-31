import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

function decodeXmlEntities(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function extractFromDocumentXml(xml) {
  const parts = [];
  const re = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const inner = m[1].replace(/<[^>]+>/g, "");
    parts.push(decodeXmlEntities(inner));
  }
  return parts.join("");
}

const docxPath = process.argv[2];
const outPath = process.argv[3];
if (!docxPath || !outPath) {
  console.error(
    "Usage: node scripts/extract-docx-text.mjs <file.docx> <out.txt>",
  );
  process.exit(1);
}

const work = fs.mkdtempSync(path.join(os.tmpdir(), "docx-extract-"));
const zipCopy = path.join(work, "spec.zip");
const unpacked = path.join(work, "out");
fs.copyFileSync(docxPath, zipCopy);
execFileSync(
  "powershell.exe",
  [
    "-NoProfile",
    "-Command",
    `Expand-Archive -LiteralPath '${zipCopy.replace(/'/g, "''")}' -DestinationPath '${unpacked.replace(/'/g, "''")}' -Force`,
  ],
  { stdio: "inherit" },
);

const xmlPath = path.join(unpacked, "word", "document.xml");
const xml = fs.readFileSync(xmlPath, "utf8");
const text = extractFromDocumentXml(xml);
fs.writeFileSync(outPath, text, "utf8");
console.error("Wrote", outPath, "chars=", text.length);
