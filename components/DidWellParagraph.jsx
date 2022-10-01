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
import { useForm } from "@mantine/form";
import { useMemo } from "react";
import { FiSave as SaveIcon } from "react-icons/fi";
import { TbEdit as IconEdit, TbX as IconX } from "react-icons/tb";
import useFeedBack from "../hooks/use-feed-back";

export default function DidWellParagraph({ data }) {
  const {
    removeParagraph,
    commitParagraph,
    makeParagraphStale,
    getStaleParagraph,
    getParagraph,
    feedback,
  } = useFeedBack();

  const theme = useMantineTheme();

  const localItem = useMemo(
    () => getParagraph(data.section, data.type, data.id),
    [getParagraph, data.id, data.section, data.type]
  );

  const form = useForm({
    initialValues: {
      screenshot: localItem.screenshot,
      text: localItem.text,
    },
    validate: {
      text: (value) => (!value ? "Explanation Text must not be empty" : null),
    },
  });

  return (
    <>
      {getStaleParagraph(data.section)?.id === data.id ? (
        <form
          onSubmit={form.onSubmit((values) => {
            commitParagraph(data.id, { ...localItem, ...values });
          })}
        >
          <Stack
            spacing="md"
            p="md"
            mb="xs"
            sx={{
              position: "relative",
              border: "1.5px solid",
              borderColor: theme.colors.green,
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
              {!getStaleParagraph(data.section) && (
                <ActionIcon
                  onClick={() =>
                    makeParagraphStale(data.section, data.type, data.id)
                  }
                  radius="xl"
                  variant="filled"
                  size="md"
                >
                  <IconEdit size={18} />
                </ActionIcon>
              )}
              <ActionIcon
                onClick={() =>
                  removeParagraph(data.section, data.type, data.id)
                }
                radius="xl"
                variant="filled"
                size="md"
              >
                <IconX size={18} />
              </ActionIcon>
            </Group>

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
              {...form.getInputProps("screenshot")}
            />

            <Textarea
              minRows={5}
              label="What you did well"
              labelProps={{
                sx: {
                  marginBottom: theme.spacing.xs,
                },
              }}
              withAsterisk
              {...form.getInputProps("text")}
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
          mb="xs"
          p="md"
          sx={{
            position: "relative",
            border: "1.5px solid",
            borderColor: theme.colors.green,
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
            {!getStaleParagraph(data.section) && (
              <ActionIcon
                onClick={() =>
                  makeParagraphStale(data.section, data.type, data.id)
                }
                radius="xl"
                variant="filled"
                size="md"
              >
                <IconEdit size={18} />
              </ActionIcon>
            )}
            <ActionIcon
              onClick={() => removeParagraph(data.section, data.type, data.id)}
              radius="xl"
              variant="filled"
              size="md"
            >
              <IconX size={18} />
            </ActionIcon>
          </Group>

          <Text>
            What you did well -{" "}
            {feedback[data.section].didWell.findIndex(
              (elem) => elem.id === data.id
            ) + 1}
          </Text>
        </Stack>
      )}
    </>
  );
}
