import {
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { HiTrash as TrashIcon } from "react-icons/hi"

export default function DeleteConfirmationDialog({
  open,
  onClose,
  document,
  deleteDocument,
}) {
  const { colorScheme } = useMantineColorScheme()

  const handleDelete = (_e) => {
    deleteDocument(document.id)
    onClose()
    showNotification({
      title: "Feedback Report Deleted!",
      message: `Feedback Report of ${document?.name} has been deleted.`,
      color: "red",
      icon: <TrashIcon />,
    })
  }

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={<Title order={3}>Confirm Delete?</Title>}
    >
      <Stack spacing="xl">
        <Text size="md">
          Are you sure you want to delete <b>{document?.name}</b>
          &apos;s feedback? All your data will be lost.
        </Text>
        <Group align="center" position="right">
          <Button
            color="gray"
            variant={colorScheme === "dark" ? "light" : "default"}
            onClick={onClose}
            size="md"
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleDelete}
            size="md"
            leftIcon={<TrashIcon />}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
