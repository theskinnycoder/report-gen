import { auth, docs } from "@googleapis/docs";

export default async function handler(req, res) {
  try {
    const authService = new auth.GoogleAuth({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ["https://www.googleapis.com/auth/documents"],
    });

    const authClient = await authService.getClient();

    const docsClient = docs({
      version: "v1",
      auth: authClient,
    });
    if (req.method === "POST") {
      const { text, id } = req.body;

      const result = await docsClient.documents.create({
        requestBody: {
          title: `My Document ${id}`,
        },
      });

      console.log(result.data);

      return res.status(201).json({
        data: result.data,
      });
    } else if (req.method === "PUT") {
    } else {
      return res.status(405).send("Method not allowed");
    }
  } catch (error) {
    console.log(error);
  }
}
