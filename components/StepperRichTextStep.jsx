import { Button, Group, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import useFeedBack from "../hooks/use-feed-back";
import { mapJSONtoRichText } from "../utils/functions";
import RichTextEditor from "./RichTextEditor";
import { SiNotion as NotionIcon } from "react-icons/si";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { SiAdobeacrobatreader as PdfIcon } from "react-icons/si";

export default function StepperRichTextStep() {
  const { query } = useRouter();
  const { document } = useFeedBack(query.id);

  const richText = useMemo(() => mapJSONtoRichText(document), [document]);

  const [text, setText] = useState(richText);

  useEffect(() => {
    if (document) {
      setText(richText);
    }
  }, [document, richText]);

  return (
    <Stack m="xl">
      <Group position="center">
        <Button
          size="md"
          leftIcon={<NotionIcon />}
          color="gray"
          variant="outline"
        >
          Save to Notion
        </Button>
        <Button
          size="md"
          leftIcon={<GoogleIcon />}
          color="yellow"
          variant="outline"
        >
          Save to Google Docs
        </Button>
        <Button size="md" leftIcon={<PdfIcon />} color="red" variant="outline">
          Download PDF
        </Button>
      </Group>
      <RichTextEditor
        value={text}
        onChange={(value) => {
          setText(value);
        }}
      />
    </Stack>
  );
}
