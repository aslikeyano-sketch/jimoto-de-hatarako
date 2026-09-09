"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function registerAction(fd: FormData) {
  const g = (k:string)=>String(fd.get(k) ?? "").trim();
  const interests = fd.getAll("interests").map(String);
  if (!g("name")) redirect("/register?e=1");
  await prisma.registration.create({ data: {
    name:g("name"), age:g("age"), homePref:g("homePref"), homeCity:g("homeCity"),
    currentLoc:g("currentLoc"), job:g("job"), industry:g("industry"), skills:g("skills"),
    interests: interests.join(","), message:g("message"),
  }});
  redirect("/thanks?t=register");
}

export async function inquiryAction(fd: FormData) {
  const g = (k:string)=>String(fd.get(k) ?? "").trim();
  if (!g("name")) redirect("/inquiry?e=1");
  await prisma.inquiry.create({ data: {
    type:"取材掲載", orgType:g("orgType"), name:g("name"), prefecture:g("prefecture"),
    contact:g("contact"), message:g("message"),
  }});
  redirect("/thanks?t=inquiry");
}

export async function submitAction(fd: FormData) {
  const g = (k:string)=>String(fd.get(k) ?? "").trim();
  if (!g("name")) redirect("/submit?e=1");
  await prisma.inquiry.create({ data: {
    type:"情報提供", orgType:g("orgType"), name:g("name"), prefecture:g("prefecture"),
    contact:g("contact"), message:g("message"),
  }});
  redirect("/thanks?t=submit");
}
