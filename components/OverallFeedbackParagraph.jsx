import { Button, Textarea, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FiSave as SaveIcon } from "react-icons/fi";
import useFeedBack from "../hooks/use-feed-back";

export default function OverallFeedbackParagraph() {
  const { feedback, addOverallFeedback } = useFeedBack();

  const form = useForm({
    initialValues: {
      overallFeedback: feedback.overallFeedback,
    },
    validate: {
      overallFeedback: (value) =>
        !value ? "Please write an overall feedback" : null,
    },
  });

  const theme = useMantineTheme();

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        addOverallFeedback(values.overallFeedback);
      })}
    >
      <Textarea minRows={5} {...form.getInputProps("overallFeedback")} />
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
