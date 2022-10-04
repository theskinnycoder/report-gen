import { Button, Textarea, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { FiSave as SaveIcon } from "react-icons/fi";
import RichTextEditor from "./RichTextEditor";

export default function OverallFeedbackParagraph({
  overall,
  addOverallFeedback,
}) {
  const [overallFeedback, setOverallFeedback] = useState(overall);

  useEffect(() => {
    setOverallFeedback(overall);
  }, [overall]);

  const theme = useMantineTheme();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await addOverallFeedback(overallFeedback);
      }}
    >
      <RichTextEditor
        value={overallFeedback}
        onChange={(value) => setOverallFeedback(value)}
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
  );
}
