import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.literal("development").or(z.literal("production")).optional(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	GOOGLE_REDIRECT_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
