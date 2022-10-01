import { Button, Modal, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import useFeedBack from "../hooks/use-feed-back";

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

  const { createReport } = useFeedBack();

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={<Title size="h4">New Report Form</Title>}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          const id = createReport(values.name);
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
