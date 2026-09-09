"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, adminPassword, sessionToken } from "@/lib/auth";
export async function loginAction(fd: FormData){
  const pw = String(fd.get("password") ?? "");
  if (pw && pw === adminPassword()){
    cookies().set(ADMIN_COOKIE, sessionToken(), { httpOnly:true, sameSite:"lax", path:"/", maxAge:60*60*24*30 });
    redirect("/admin");
  }
  redirect("/admin/login?e=1");
}
export async function logoutAction(){ cookies().delete(ADMIN_COOKIE); redirect("/admin/login"); }
