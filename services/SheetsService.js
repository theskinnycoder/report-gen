import { auth, sheets } from "@googleapis/sheets"

export default async function getSheetsClient() {
  const authService = new auth.GoogleAuth({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(
        /\\n/g,
        "\n",
      ),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  })

  const authClient = await authService.getClient()

  const sheetsClient = sheets({
    version: "v4",
    auth: authClient,
  })

  return sheetsClient
}
