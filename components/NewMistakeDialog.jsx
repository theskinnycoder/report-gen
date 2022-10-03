import { Modal, Title } from "@mantine/core";

export default function NewMistakeDialog({ open, onClose }) {
  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={<Title>Add a New Mistake</Title>}
    >
      {/* Modal content */}
    </Modal>
  );
}
