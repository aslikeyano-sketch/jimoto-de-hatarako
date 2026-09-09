import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const COOKIE = "jm_admin";
export function adminPassword(){ return process.env.ADMIN_PASSWORD || "jimoto-admin-2026"; }
export function sessionToken(){ return "ok:"+Buffer.from(adminPassword()).toString("base64").slice(0,24); }
export function isAdmin(){ return cookies().get(COOKIE)?.value === sessionToken(); }
export function requireAdmin(){ if(!isAdmin()) redirect("/admin/login"); }
export const ADMIN_COOKIE = COOKIE;
