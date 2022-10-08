import { Button, Modal, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useRouter } from "next/router"
import { SECTIONS } from "~/utils/constants"

export default function NewReportDialog({
  open,
  onClose,
  addNewDocument,
}) {
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) =>
        !value ? "Please enter student's name" : null,
    },
  })
  const { push } = useRouter()

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={<Title order={3}>New Report Form</Title>}
    >
      <form
        onSubmit={form.onSubmit(async (values) => {
          const id = await addNewDocument({
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
          })
          onClose()
          push(`/feedback/${id}`)
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
            alignSelf: "end",
          }}
        >
          Create
        </Button>
      </form>
    </Modal>
  )
}
