import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Title,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core"
import Link from "next/link"
import { useState } from "react"
import {
  HiExternalLink as VisitIcon,
  HiTrash as TrashIcon,
} from "react-icons/hi"
import { TbPlus as PlusIcon } from "react-icons/tb"
import DeleteConfirmationDialog from "~/components/DeleteConfirmationDialog"
import NewReportDialog from "~/components/NewReportDialog"
import useCollection from "~/hooks/use-collection"

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedToDelete, setSelectedToDelete] = useState(null)
  const { documents, addNewDocument, deleteDocument } =
    useCollection("reports")

  const { colorScheme } = useMantineColorScheme()

  return (
    <>
      <Stack spacing="xl" p="lg" my="xl">
        <Button
          sx={{
            justifySelf: "start",
            width: "fit-content",
          }}
          mb="xl"
          leftIcon={<PlusIcon strokeWidth="4px" />}
          size="md"
          onClick={() => setDialogOpen(true)}
        >
          Create New Report
        </Button>
        <Divider />
        <Stack spacing="xl" mt="xl">
          <Group position="apart">
            <Title order={2}>Latest Feedback Reports</Title>
            <Link href="/feedback" passHref>
              <Button
                component="a"
                variant="subtle"
                size="xs"
                color="gray"
                rightIcon={<VisitIcon />}
              >
                View All
              </Button>
            </Link>
          </Group>
          <SimpleGrid cols={3} spacing="xl">
            {documents.slice(0, 9).map((doc) => (
              <Paper
                key={doc.id}
                p="lg"
                withBorder
                sx={(theme) => ({
                  borderWidth: "1.5px",
                  ":hover": {
                    transition: "all 0.3s ease",
                    borderColor: theme.colors[theme.primaryColor][6],
                  },
                })}
              >
                <Group position="apart" align="center">
                  <Title order={4}>{doc?.name}</Title>
                  <Group align="center" position="right">
                    <Link href={`/feedback/${doc.id}`} passHref>
                      <ActionIcon
                        component="a"
                        color="gray"
                        variant={
                          colorScheme === "dark" ? "light" : "subtle"
                        }
                      >
                        <VisitIcon />
                      </ActionIcon>
                    </Link>
                    <Tooltip label="Delete" withArrow>
                      <ActionIcon
                        onClick={(e) => {
                          e.preventDefault()
                          setSelectedToDelete(doc)
                        }}
                        color="red"
                        variant={
                          colorScheme === "dark" ? "light" : "subtle"
                        }
                      >
                        <TrashIcon />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Group>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
      <NewReportDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        addNewDocument={addNewDocument}
      />
      <DeleteConfirmationDialog
        open={selectedToDelete !== null}
        onClose={() => setSelectedToDelete(null)}
        document={selectedToDelete}
        deleteDocument={deleteDocument}
      />
    </>
  )
}
