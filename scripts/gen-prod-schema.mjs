import { readFileSync, writeFileSync } from "node:fs";
const path = "prisma/schema.prisma";
let s = readFileSync(path, "utf-8");
s = s.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');
if (!s.includes("directUrl")) s = s.replace(/(url\s*=\s*env\("DATABASE_URL"\))/, '$1\n  directUrl = env("DATABASE_URL_UNPOOLED")');
writeFileSync(path, s);
console.log("[gen-prod-schema] -> postgresql (+directUrl)");
