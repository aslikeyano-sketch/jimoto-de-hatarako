"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function inquiryAction(fd: FormData) {
  const g = (k:string)=>String(fd.get(k) ?? "").trim();
  if (!g("name") || !g("contact")) redirect("/inquiry?e=1");
  await prisma.inquiry.create({ data: {
    type:"取材掲載", orgType:g("orgType"), name:g("name"), prefecture:g("prefecture"),
    contact:g("contact"), message:g("message"),
  }});
  redirect("/thanks?t=inquiry");
}

export async function submitAction(fd: FormData) {
  const g = (k:string)=>String(fd.get(k) ?? "").trim();
  if (!g("name") || !g("contact")) redirect("/submit?e=1");
  await prisma.inquiry.create({ data: {
    type:"情報提供", orgType:g("orgType"), name:g("name"), prefecture:g("prefecture"),
    contact:g("contact"), message:g("message"),
  }});
  redirect("/thanks?t=submit");
}
