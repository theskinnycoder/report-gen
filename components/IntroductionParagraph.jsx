import { Button, useMantineTheme } from "@mantine/core"
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
      <RichTextEditor
        value={introduction}
        onChange={(value) => setIntroduction(value)}
      />
      <Button
        sx={{
          marginTop: theme.spacing.md,
          placeSelf: "flex-end",
        }}
        leftIcon={<SaveIcon />}
        type="submit"
      >
        Commit
      </Button>
    </form>
  )
}
