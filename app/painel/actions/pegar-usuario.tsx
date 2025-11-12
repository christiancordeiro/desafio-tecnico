"use server";

import { db } from "@/db";
import { userTable } from "@/db/schema";

export async function pegarUsers() {
  return await db.select().from(userTable);
}
