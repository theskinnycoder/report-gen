import { Button, Textarea, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiSave as SaveIcon } from "react-icons/fi";
import useFeedBack from "../hooks/use-feed-back";

export default function IntroductionParagraph() {
  const { query } = useRouter();
  const { document, addIntroduction, loading } = useFeedBack(query.id);
  const [introduction, setIntroduction] = useState(document?.introduction);

  useEffect(() => {
    if (!loading) {
      setIntroduction(document?.introduction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const theme = useMantineTheme();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await addIntroduction(introduction);
      }}
    >
      <Textarea
        minRows={5}
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
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
