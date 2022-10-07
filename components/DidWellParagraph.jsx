import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core"
import { useEffect, useState } from "react"
import { FiSave as SaveIcon } from "react-icons/fi"
import { TbEdit as IconEdit, TbX as IconX } from "react-icons/tb"
import RichTextEditor from "./RichTextEditor"

export default function DidWellParagraph({
  data,
  removeParagraph,
  commitParagraph,
  count,
}) {
  const [text, setText] = useState(data.text)

  useEffect(() => {
    setText(data.text)
  }, [data.text])

  const theme = useMantineTheme()

  return (
    <>
      {data.stale ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await commitParagraph(data.id, {
              ...data,
              screenshot: data.screenshot,
              text,
              stale: false,
            })
          }}
        >
          <Stack
            spacing="md"
            p="md"
            sx={{
              border: "1.5px solid",
              borderColor: theme.colors.green,
              borderRadius: theme.radius.sm,
            }}
          >
            <Stack
              p="xs"
              sx={{
                border: "1.5px solid",
                borderColor: theme.colors.gray,
                borderRadius: theme.radius.sm,
              }}
            >
              <img src={data.screenshot} alt="" />
            </Stack>

            <RichTextEditor
              value={text}
              onChange={(value) => setText(value)}
            />

            <Button
              sx={{
                placeSelf: "flex-end",
              }}
              leftIcon={<SaveIcon />}
              type="submit"
            >
              Commit
            </Button>
          </Stack>
        </form>
      ) : (
        <Stack
          spacing="md"
          p="md"
          sx={{
            position: "relative",
            border: "1.5px solid",
            borderColor: theme.colors.green,
            borderRadius: theme.radius.sm,
          }}
        >
          <Group
            spacing="xs"
            position="right"
            sx={{
              position: "absolute",
              top: "0px",
              right: "18px",
              transform: "translate(50%, -50%)",
            }}
          >
            <ActionIcon
              onClick={async () => {
                await commitParagraph(data.id, {
                  ...data,
                  stale: true,
                })
              }}
              radius="xl"
              variant="filled"
              size="md"
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              onClick={async () =>
                await removeParagraph(
                  data.section,
                  data.type,
                  data.id,
                )
              }
              radius="xl"
              variant="filled"
              size="md"
            >
              <IconX size={18} />
            </ActionIcon>
          </Group>

          <Text>What you did well - {count}</Text>
        </Stack>
      )}
    </>
  )
}
