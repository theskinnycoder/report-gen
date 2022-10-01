import { Box, Button } from "@mantine/core";
import { useState } from "react";
import { TbPlus as PlusIcon } from "react-icons/tb";
import NewReportDialog from "../components/NewReportDialog";

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Box p="lg">
        <Button
          leftIcon={<PlusIcon />}
          size="md"
          onClick={() => setDialogOpen(true)}
        >
          Create New Report
        </Button>
      </Box>
      <NewReportDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
