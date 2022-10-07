import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import { useEffect, useState } from "react"
import { FiSave as SaveIcon } from "react-icons/fi"
import {
  HiTrash as TrashIcon,
  HiPencilAlt as EditIcon,
} from "react-icons/hi"
import RichTextEditor from "./RichTextEditor"

export default function DidWellParagraph({
  data,
  removeParagraph,
  commitParagraph,
  count,
  loading,
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
              borderColor: theme.colors.green[7],
              borderRadius: theme.radius.sm,
            }}
          >
            <Stack
              p="xs"
              sx={{
                border: "1.5px solid",
                borderColor: theme.colors.gray[4],
                borderRadius: theme.radius.sm,
              }}
            >
              <img
                src={data.screenshot}
                alt=""
                style={{
                  maxWidth: "35vw",
                }}
              />
            </Stack>

            <RichTextEditor
              sx={{
                border: "1.5px solid",
                borderColor: theme.colors.gray[4],
              }}
              value={text}
              onChange={(value) => setText(value)}
            />

            <Button
              sx={{
                placeSelf: "flex-end",
              }}
              leftIcon={<SaveIcon strokeWidth="3px" />}
              type="submit"
              loading={loading}
              disabled={loading}
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
            borderColor: theme.colors.green[7],
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
            <Tooltip label="Edit" withArrow>
              <ActionIcon
                onClick={async () => {
                  await commitParagraph(data.id, {
                    ...data,
                    stale: true,
                  })
                }}
                color="blue"
                radius="xl"
                variant="filled"
                size="md"
                loading={loading}
                disabled={loading}
              >
                <EditIcon size={18} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete" withArrow>
              <ActionIcon
                onClick={async () =>
                  await removeParagraph(
                    data.section,
                    data.type,
                    data.id,
                  )
                }
                loading={loading}
                disabled={loading}
                color="red"
                radius="xl"
                variant="filled"
                size="md"
              >
                <TrashIcon size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>

          <Text>What you did well - {count}</Text>
        </Stack>
      )}
    </>
  )
}
