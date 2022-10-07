import getSheetsClient from "~/services/SheetsService"

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const sheetsClient = await getSheetsClient()

      const { stage, feedback_type } = req.query

      const result = await sheetsClient.spreadsheets.values.get({
        spreadsheetId: "1SheDEEmtlur2InXy7efIZWTYeJJM7HQY6u0IMACnHwU",
        range: "Sheet1",
      })

      const response = result.data.values.filter(
        (row) => row[0] === stage && row[1] === feedback_type,
      )

      const explanationRows = [3, 5, 7, 9, 11]
      const correctionRows = [4, 6, 8, 10, 12]

      const mappedResponse = response.map((row) => {
        return {
          checkbox_text: row[2],
          explanations: explanationRows
            .map((rowIndex) => row[rowIndex])
            .filter((row) => row !== null),
          corrections: correctionRows
            .map((rowIndex) => row[rowIndex])
            .filter((row) => row !== null),
        }
      })

      return res.status(200).json({
        values: mappedResponse,
      })
    } else {
      return res.status(405).send("Method not allowed")
    }
  } catch (error) {
    console.log(error)
  }
}
