import { Button, Textarea, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FiSave as SaveIcon } from "react-icons/fi";
import useFeedBack from "../hooks/use-feed-back";

export default function IntroductionParagraph() {
  const { feedback, addIntroduction } = useFeedBack();

  const form = useForm({
    initialValues: {
      introduction: feedback.introduction,
    },
    validate: {
      introduction: (value) => (!value ? "Please write an introduction" : null),
    },
  });

  const theme = useMantineTheme();

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        addIntroduction(values.introduction);
      })}
    >
      <Textarea minRows={5} {...form.getInputProps("introduction")} />
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
  );
}
