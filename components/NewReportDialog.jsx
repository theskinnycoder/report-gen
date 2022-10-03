import { Button, Modal, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import useCollection from "../hooks/use-collection";
import { SECTIONS } from "../utils/constants";

export default function NewReportDialog({ open, onClose }) {
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (!value ? "Please enter student's name" : null),
    },
  });
  const { push } = useRouter();

  const { addNewDoc } = useCollection("reports");

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={<Title size="h4">New Report Form</Title>}
    >
      <form
        onSubmit={form.onSubmit(async (values) => {
          const id = await addNewDoc({
            name: values.name,
            introduction: "",
            overallFeedback: "",
            [SECTIONS.EMPATHISE]: {
              mistakes: [],
              didWell: [],
            },
            [SECTIONS.DEFINE]: {
              mistakes: [],
              didWell: [],
            },
            [SECTIONS.IDEATE]: {
              mistakes: [],
              didWell: [],
            },
            [SECTIONS.PROTOTYPE]: {
              mistakes: [],
              didWell: [],
            },
            [SECTIONS.TESTING]: {
              mistakes: [],
              didWell: [],
            },
          });
          onClose();
          push(`/new/${id}`);
        })}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextInput
          size="md"
          withAsterisk
          label="Name"
          placeholder="John Doe"
          {...form.getInputProps("name")}
        />

        <Button
          size="md"
          type="submit"
          sx={{
            alignSelf: "flex-end",
          }}
        >
          Create
        </Button>
      </form>
    </Modal>
  );
}
