import { auth, sheets } from "@googleapis/sheets";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      console.log(process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"));
      const authService = new auth.GoogleAuth({
        projectId: process.env.GOOGLE_PROJECT_ID,
        credentials: {
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      });

      const authClient = await authService.getClient();

      const sheetsClient = sheets({
        version: "v4",
        auth: authClient,
      });

      const { stage, feedback_type } = req.query;

      const result = await sheetsClient.spreadsheets.values.get({
        spreadsheetId: "1SheDEEmtlur2InXy7efIZWTYeJJM7HQY6u0IMACnHwU",
        range: "Sheet1",
      });

      const response = result.data.values.filter(
        (row) => row[0] === stage && row[1] === feedback_type
      );

      const explanationRows = [3, 5, 7, 9, 11];
      const correctionRows = [4, 6, 8, 10, 12];

      const mappedResponse = response.map((row) => {
        return {
          checkbox_text: row[2],
          explanations: explanationRows
            .map((rowIndex) => row[rowIndex])
            .filter((row) => row !== null),
          corrections: correctionRows
            .map((rowIndex) => row[rowIndex])
            .filter((row) => row !== null),
        };
      });

      return res.status(200).json({
        values: mappedResponse,
      });
    } else {
      return res.status(405).send("Method not allowed");
    }
  } catch (error) {
    console.log(error);
  }
}
