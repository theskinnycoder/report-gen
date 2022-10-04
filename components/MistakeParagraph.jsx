import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { FiSave as SaveIcon } from "react-icons/fi";
import { TbEdit as IconEdit, TbX as IconX } from "react-icons/tb";
import RichTextEditor from "./RichTextEditor";

export default function MistakeParagraph({
  data,
  removeParagraph,
  commitParagraph,
  count,
}) {
  const [explanationText, setExplanationText] = useState(data.explanationText);
  const [overcomeText, setOvercomeText] = useState(data.overcomeText);

  useEffect(() => {
    setExplanationText(data.explanationText);
    setOvercomeText(data.overcomeText);
  }, [data.explanationText, data.overcomeText]);

  const theme = useMantineTheme();

  return (
    <>
      {data.stale ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await commitParagraph(data.id, {
              ...data,
              screenshot: data.screenshot,
              explanationText,
              overcomeText,
              stale: false,
            });
          }}
        >
          <Stack
            spacing="md"
            p="md"
            sx={{
              border: "1.5px solid",
              borderColor: theme.colors.red,
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
            borderColor: theme.colors.red,
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
                });
              }}
              radius="xl"
              variant="filled"
              size="md"
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              onClick={async () =>
                await removeParagraph(data.section, data.type, data.id)
              }
              radius="xl"
              variant="filled"
              size="md"
            >
              <IconX size={18} />
            </ActionIcon>
          </Group>

          <Text>
            <Text>What you did well - {count}</Text>
          </Text>
        </Stack>
      )}
    </>
  );
}
