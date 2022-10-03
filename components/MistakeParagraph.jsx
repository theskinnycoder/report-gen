import {
  ActionIcon,
  Button,
  FileInput,
  Group,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiSave as SaveIcon } from "react-icons/fi";
import { TbEdit as IconEdit, TbX as IconX } from "react-icons/tb";
import useFeedBack from "../hooks/use-feed-back";

export default function MistakeParagraph({ data }) {
  const { query } = useRouter();
  const { document, loading, removeParagraph, commitParagraph } = useFeedBack(
    query.id
  );

  const [screenshot, setScreenshot] = useState(data.screenshot);
  const [explanationText, setExplanationText] = useState(data.explanationText);
  const [overcomeText, setOvercomeText] = useState(data.overcomeText);

  const theme = useMantineTheme();

  return (
    <>
      {data.stale ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await commitParagraph(data.id, {
              ...data,
              screenshot,
              explanationText,
              overcomeText,
              stale: false,
            });
          }}
        >
          <Stack
            spacing="md"
            p="md"
            mb="xs"
            sx={{
              position: "relative",
              border: "1.5px solid",
              borderColor: theme.colors.red,
              borderRadius: "4px",
            }}
          >
            <FileInput
              placeholder="Pick Image"
              label="Screen Shot"
              variant="filled"
              size="md"
              withAsterisk
              labelProps={{
                sx: {
                  marginBottom: theme.spacing.xs,
                },
              }}
              value={screenshot}
              onChange={(e) => setScreenshot(e.target.files[0])}
            />

            <Textarea
              minRows={5}
              label="Explanation"
              labelProps={{
                sx: {
                  marginBottom: theme.spacing.xs,
                },
              }}
              withAsterisk
              value={explanationText}
              onChange={(e) => setExplanationText(e.target.value)}
            />

            <Textarea
              minRows={5}
              label="How can you correct it"
              labelProps={{
                sx: {
                  marginBottom: theme.spacing.xs,
                },
              }}
              withAsterisk
              value={overcomeText}
              onChange={(e) => setOvercomeText(e.target.value)}
            />

            <Button
              sx={{
                placeSelf: "flex-end",
              }}
              leftIcon={<SaveIcon />}
              type="submit"
              loading={loading}
            >
              Commit
            </Button>
          </Stack>
        </form>
      ) : (
        <Stack
          spacing="md"
          mb="xs"
          p="md"
          sx={{
            position: "relative",
            border: "1.5px solid",
            borderColor: theme.colors.red,
            borderRadius: "4px",
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
            Mistake -{" "}
            {document[data.section]?.mistakes.findIndex(
              (elem) => elem.id === data.id
            ) + 1}
          </Text>
        </Stack>
      )}
    </>
  );
}
