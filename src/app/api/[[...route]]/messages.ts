import { Hono } from "hono";
// these errors are expected
import { google } from "googleapis"; // install `googleapis`
import { env } from "./env"; // validate `env`

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

const oauth2Client = new google.auth.OAuth2({
	clientId: env.GOOGLE_CLIENT_ID,
	clientSecret: env.GOOGLE_CLIENT_SECRET,
	redirectUri: env.GOOGLE_REDIRECT_URL,
});

app.get("/auth/callback", async (c) => {
	const code = c.req.query("code");
	if (!code) return c.text("Code not found", 401);
	try {
		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);
		const gmail = google.gmail({ version: "v1", auth: oauth2Client });
		const allMessages = await gmail.users.messages.list({ userId: "me" });
		const message = await gmail.users.messages.get({ userId: "me", id: "" }); // get message by id
		return c.json(allMessages.data, 200);
	} catch (error) {
		console.log(`Error: ${error}`);
		return c.text("Error occurred during authentication.", 500);
	}
});

app.get("/auth/authorize", (c) => {
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

export default app;
