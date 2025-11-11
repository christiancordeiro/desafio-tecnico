import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema"; // your Drizzle schema

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    providerId: "credentials",
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  user: {
    modelName: "userTable",
  },
  session: {
    modelName: "sessionTable",
  },
  account: {
    modelName: "accountTable",
    fields: {
      password: "password",
    },
  },
  verification: {
    modelName: "verificationTable",
  },
});
