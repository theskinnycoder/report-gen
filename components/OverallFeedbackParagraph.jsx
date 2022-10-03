import { Button, Textarea, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiSave as SaveIcon } from "react-icons/fi";
import useFeedBack from "../hooks/use-feed-back";

export default function OverallFeedbackParagraph() {
  const { query } = useRouter();
  const { document, addOverallFeedback, loading } = useFeedBack(query.id);
  const [overallFeedback, setOverallFeedback] = useState(
    document?.overallFeedback
  );

  useEffect(() => {
    if (!loading) {
      setOverallFeedback(document?.overallFeedback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const theme = useMantineTheme();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await addOverallFeedback(overallFeedback);
      }}
    >
      <Textarea
        minRows={5}
        value={overallFeedback}
        onChange={(e) => setOverallFeedback(e.target.value)}
      />
      <Button
        sx={{
          marginTop: theme.spacing.md,
          placeSelf: "flex-end",
        }}
        leftIcon={<SaveIcon />}
        type="submit"
        loading={loading}
      >
        Commit
      </Button>
    </form>
  );
}
