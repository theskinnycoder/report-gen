import { Button, Stack, useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { FiSave as SaveIcon } from "react-icons/fi"
import RichTextEditor from "./RichTextEditor"

export default function IntroductionParagraph({
  intro,
  addIntroduction,
}) {
  const [introduction, setIntroduction] = useState(intro)

  useEffect(() => {
    setIntroduction(intro)
  }, [intro])

  const theme = useMantineTheme()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await addIntroduction(introduction)
      }}
    >
      <Stack spacing="xs">
        <RichTextEditor
          value={introduction}
          onChange={(value) => setIntroduction(value)}
        />
        <Button
          sx={{
            marginTop: theme.spacing.md,
            alignSelf: "end",
          }}
          leftIcon={<SaveIcon strokeWidth="3px" />}
          type="submit"
        >
          Commit
        </Button>
      </Stack>
    </form>
  )
}
