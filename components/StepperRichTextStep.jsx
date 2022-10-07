import {
  Button,
  Group,
  ScrollArea,
  Stack,
  useMantineColorScheme,
} from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import {
  SiAdobeacrobatreader as PdfIcon,
  SiNotion as NotionIcon,
} from "react-icons/si"
import useFeedBack from "~/hooks/use-feed-back"
import { mapJSONtoRichText } from "~/utils/functions"
import RichTextEditor from "./RichTextEditor"

export default function StepperRichTextStep() {
  const { query } = useRouter()
  const { document } = useFeedBack(query.id)

  const richText = useMemo(
    () => mapJSONtoRichText(document),
    [document],
  )

  const [text, setText] = useState(richText)

  useEffect(() => {
    if (document) {
      setText(richText)
    }
  }, [document, richText])

  const { colorScheme } = useMantineColorScheme()

  return (
    <Stack my="xl" px="sm" spacing="xl">
      <Group position="center">
        <Button
          size="md"
          leftIcon={<NotionIcon />}
          color={colorScheme === "dark" ? "gray" : "dark"}
          variant="outline"
          sx={{
            border: "1.5px solid",
          }}
        >
          Save to Notion
        </Button>
        <Button
          size="md"
          leftIcon={<PdfIcon />}
          color={colorScheme === "dark" ? "red" : "red.8"}
          variant="outline"
          sx={{
            border: "1.5px solid",
          }}
        >
          Download PDF
        </Button>
      </Group>
      <ScrollArea
        sx={{ height: "70vh" }}
        scrollbarSize={4}
        styles={{
          scrollbar: {
            '&[data-orientation="vertical"] .mantine-ScrollArea-thumb':
              {
                zIndex: 1,
              },
          },
        }}
      >
        <RichTextEditor
          value={text}
          onChange={(value) => {
            setText(value)
          }}
          sticky
        />
      </ScrollArea>
    </Stack>
  )
}
