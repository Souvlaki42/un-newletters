import { Hono } from "hono";
import { google } from "googleapis";
import { env } from "@/lib/env";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

const router = new Hono();

const oauth2Client = new google.auth.OAuth2({
	clientId: env.GOOGLE_CLIENT_ID,
	clientSecret: env.GOOGLE_CLIENT_SECRET,
	redirectUri: env.GOOGLE_REDIRECT_URL,
});

router.use("/newsletters/*", async (c, next) => {
	const authorization_code = getCookie(c, "authorization_code");
	if (!authorization_code) return c.text("Code not found", 401);

	await next();
});

router.get("/newsletters", async (c) => {
	try {
		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);
		const gmail = google.gmail({ version: "v1", auth: oauth2Client });
		const res = await gmail.users.messages.list({ userId: "me" });
		return c.json(res.data, 200);
	} catch (error) {
		console.log(`Error: ${error}`);
		return c.text("Error occurred during authentication.", 500);
	}
});

router.get("/callback", (c) => {
	const code = c.req.query("code");
	if (!code) return c.text("Code not found", 401);
	const authorization_code = getCookie(c, "authorization_code");
	if (authorization_code) deleteCookie(c, "authorization_code");
	setCookie(c, "authorization_code", code);
	return c.redirect("/api/gmail/newletters");
});

router.get("/authorize", (c) => {
	const scopes = [
		"https://www.googleapis.com/auth/gmail.addons.current.message.action",
		"https://www.googleapis.com/auth/gmail.readonly",
	];
	const url = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: scopes,
	});
	return c.redirect(url);
});

export { router };
