import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import { useState, useEffect } from "react"
import { FiSave as SaveIcon } from "react-icons/fi"
import {
  HiTrash as TrashIcon,
  HiPencilAlt as EditIcon,
} from "react-icons/hi"
import RichTextEditor from "./RichTextEditor"

export default function MistakeParagraph({
  data,
  removeParagraph,
  commitParagraph,
  count,
  loading,
}) {
  const [explanationText, setExplanationText] = useState(
    data.explanationText,
  )
  const [overcomeText, setOvercomeText] = useState(data.overcomeText)

  useEffect(() => {
    setExplanationText(data.explanationText)
    setOvercomeText(data.overcomeText)
  }, [data.explanationText, data.overcomeText])

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
              explanationText,
              overcomeText,
              stale: false,
            })
          }}
        >
          <Stack
            spacing="md"
            p="md"
            sx={{
              border: "1.5px solid",
              borderColor: theme.colors.red[6],
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
              <img
                src={data.screenshot}
                alt=""
                style={{
                  maxWidth: "35vw",
                }}
              />
            </Stack>

            <RichTextEditor
              value={explanationText}
              onChange={(value) => setExplanationText(value)}
            />

            <RichTextEditor
              value={overcomeText}
              onChange={(value) => setOvercomeText(value)}
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
            borderColor: theme.colors.red[6],
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
                radius="xl"
                variant="filled"
                size="md"
                color="blue"
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
                radius="xl"
                variant="filled"
                size="md"
                color="red"
                loading={loading}
                disabled={loading}
              >
                <TrashIcon size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>

          <Text>
            <Text>Mistake - {count}</Text>
          </Text>
        </Stack>
      )}
    </>
  )
}
