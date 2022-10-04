import { Button, Group, Modal, Radio, Stack, Text, Title } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import useStorage from "../hooks/use-storage";

export default function NewDidWellDialog({
  open,
  onClose,
  arena,
  feedbackId,
  commitParagraph,
  removeParagraph,
}) {
  const { uploadImage } = useStorage();
  const [data, setData] = useState(null);
  const [radios, setRadios] = useState([]);
  const [versions, setVersions] = useState([]);

  const [screenshot, setScreenshot] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `/api/sheets?stage=${arena?.stage}&feedback_type=good`
      );
      const { values } = await response.json();
      setData(values);
      setRadios(values.map((row) => row.checkbox_text));
    })();
  }, [arena]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = await uploadImage(
      feedbackId,
      arena.stage,
      arena.type,
      arena.id,
      screenshot
    );
    await commitParagraph(arena.id, {
      id: arena.id,
      section: arena.stage,
      text: data[selectedRadio - 1].explanations[selectedVersion - 1] ?? "",
      screenshot: url,
      type: arena.type,
      stale: true,
    });
    setData(null);
    setRadios([]);
    setVersions([]);
    setScreenshot(null);
    setSelectedRadio(0);
    setSelectedVersion(0);

    onClose();
  };

  return (
    <Modal
      size="lg"
      opened={open}
      onClose={async () => {
        if (!screenshot || !selectedRadio || !selectedVersion) {
          await removeParagraph(arena.stage, arena.type, arena.id);
        }
        onClose();
      }}
      title={<Title>Add a Positive Feedback Point</Title>}
    >
      <form onSubmit={submitHandler}>
        <Stack spacing="md">
          <Dropzone
            onDrop={(files) => {
              setScreenshot(files[0]);
            }}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
          >
            {screenshot ? (
              <img
                src={URL.createObjectURL(screenshot)}
                alt=""
                style={{ width: "100%" }}
              />
            ) : (
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: 220, pointerEvents: "none" }}
              >
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
              </Group>
            )}
          </Dropzone>

          {screenshot && (
            <Radio.Group
              orientation="vertical"
              label="Select a suitable explanation for this screenshot"
              spacing="sm"
              offset="sm"
              withAsterisk
              value={selectedRadio}
              onChange={(value) => {
                setSelectedRadio(+value);
                setVersions(
                  Array.from(
                    {
                      length: data[+value - 1].explanations.filter((el) => el)
                        .length,
                    },
                    (_v, i) => i + 1
                  )
                );
              }}
            >
              {radios.map((radio, idx) => (
                <Radio key={idx} value={idx + 1} label={radio} />
              ))}
            </Radio.Group>
          )}

          {screenshot && selectedRadio && (
            <Radio.Group
              name="version"
              orientation="vertical"
              label="Select a version of the paragraph to be populated"
              spacing="sm"
              offset="sm"
              withAsterisk
              value={selectedVersion}
              onChange={(value) => setSelectedVersion(+value)}
            >
              {versions.map((version) => (
                <Radio key={version} value={version} label={version} />
              ))}
            </Radio.Group>
          )}

          <Button type="submit" size="md">
            Generate
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
