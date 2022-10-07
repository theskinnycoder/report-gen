import {
  Accordion,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Stepper,
  Title,
  useMantineTheme,
} from "@mantine/core"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { TbPlus as PlusIcon } from "react-icons/tb"
import DidWellParagraph from "~/components/DidWellParagraph"
import IntroductionParagraph from "~/components/IntroductionParagraph"
import MistakeParagraph from "~/components/MistakeParagraph"
import NewDidWellDialog from "~/components/NewDidWellDialog"
import NewMistakeDialog from "~/components/NewMistakeDialog"
import OverallFeedbackParagraph from "~/components/OverallFeedbackParagraph"
import StepperRichTextStep from "~/components/StepperRichTextStep"
import useFeedBack from "~/hooks/use-feed-back"
import { SECTIONS } from "~/utils/constants"
import { capitalize, mapJSONtoRichText } from "~/utils/functions"

export default function EditFeedbackPage() {
  const { query } = useRouter()
  const {
    document,
    addNewParagraph,
    removeParagraph,
    commitParagraph,
    addIntroduction,
    addOverallFeedback,
  } = useFeedBack(query.id)

  const richText = useMemo(
    () => mapJSONtoRichText(document),
    [document],
  )

  const [mistakeDialogOpen, setMistakeDialogOpen] = useState(false)
  const [didWellDialogOpen, setDidWellDialogOpen] = useState(false)
  const [dialogClickedArena, setDialogClickedArena] = useState()

  const theme = useMantineTheme()
  const [openedEditors, setOpenedEditors] = useState([])

  const [active, setActive] = useState(0)

  return (
    <>
      <Box my="xl" px="md">
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          styles={(theme) => ({
            steps: {
              maxWidth: theme.breakpoints.md,
              margin: "0 auto",
            },
          })}
        >
          <Stepper.Step
            label="Generate Text"
            description="Generate the feedback using the builder"
          >
            <Grid
              gutter="xs"
              sx={{
                minHeight: "100vh",
              }}
            >
              <Grid.Col span={6}>
                <Paper withBorder p="xl" m="xs">
                  <Accordion
                    value={openedEditors}
                    onChange={setOpenedEditors}
                    multiple
                  >
                    <Accordion.Item value="overall-feedback">
                      <Accordion.Control
                        sx={{
                          fontSize: theme.fontSizes.xl,
                          fontWeight: "bolder",
                        }}
                      >
                        Overall FeedBack
                      </Accordion.Control>
                      <Accordion.Panel
                        sx={{
                          width: "100%",
                        }}
                      >
                        <OverallFeedbackParagraph
                          overall={document.overallFeedback}
                          addOverallFeedback={addOverallFeedback}
                        />
                      </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="introduction">
                      <Accordion.Control
                        sx={{
                          fontSize: theme.fontSizes.xl,
                          fontWeight: "bolder",
                        }}
                      >
                        Introduction
                      </Accordion.Control>
                      <Accordion.Panel
                        sx={{
                          width: "100%",
                        }}
                      >
                        <IntroductionParagraph
                          intro={document.introduction}
                          addIntroduction={addIntroduction}
                        />
                      </Accordion.Panel>
                    </Accordion.Item>

                    {Object.values(SECTIONS).map((key) => {
                      return (
                        <Accordion.Item value={key} key={key}>
                          <Accordion.Control
                            sx={{
                              fontSize: theme.fontSizes.xl,
                              fontWeight: "bolder",
                            }}
                          >
                            {capitalize(key)} Section
                          </Accordion.Control>
                          <Accordion.Panel>
                            <Stack spacing="sm">
                              <Paper
                                p="sm"
                                withBorder
                                sx={(theme) => ({
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "stretch",
                                  gap: theme.spacing.sm,
                                })}
                              >
                                <Title size="h5">Mistakes</Title>
                                {document[key]?.mistakes.length >=
                                  1 && (
                                  <Stack spacing="sm">
                                    {document[key]?.mistakes.map(
                                      (item, idx) => (
                                        <MistakeParagraph
                                          key={item?.id}
                                          data={item}
                                          count={idx + 1}
                                          commitParagraph={
                                            commitParagraph
                                          }
                                          removeParagraph={
                                            removeParagraph
                                          }
                                        />
                                      ),
                                    )}
                                  </Stack>
                                )}
                                <Button
                                  leftIcon={<PlusIcon />}
                                  variant="outline"
                                  color="red.7"
                                  sx={{
                                    border: "1.5px solid",
                                    alignSelf: "flex-start",
                                  }}
                                  onClick={async () => {
                                    const id = await addNewParagraph(
                                      key,
                                      "mistakes",
                                    )
                                    setDialogClickedArena({
                                      stage: key,
                                      id,
                                      type: "mistakes",
                                    })
                                    setMistakeDialogOpen(true)
                                  }}
                                >
                                  Add Mistake
                                </Button>
                              </Paper>
                              <Paper
                                p="sm"
                                withBorder
                                sx={(theme) => ({
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "stretch",
                                  gap: theme.spacing.sm,
                                })}
                              >
                                <Title size="h5">
                                  What you did well
                                </Title>
                                {document[key]?.didWell.length >=
                                  1 && (
                                  <Stack spacing="xs">
                                    {document[key]?.didWell.map(
                                      (item, idx) => (
                                        <DidWellParagraph
                                          key={item?.id}
                                          data={item}
                                          count={idx + 1}
                                          commitParagraph={
                                            commitParagraph
                                          }
                                          removeParagraph={
                                            removeParagraph
                                          }
                                        />
                                      ),
                                    )}
                                  </Stack>
                                )}
                                <Button
                                  leftIcon={<PlusIcon />}
                                  variant="outline"
                                  color="green.8"
                                  sx={{
                                    border: "1.5px solid",
                                    alignSelf: "flex-start",
                                  }}
                                  onClick={async () => {
                                    const id = await addNewParagraph(
                                      key,
                                      "didWell",
                                    )
                                    setDialogClickedArena({
                                      stage: key,
                                      id,
                                      type: "didWell",
                                    })
                                    setDidWellDialogOpen(true)
                                  }}
                                >
                                  Add What You Did Well
                                </Button>
                              </Paper>
                            </Stack>
                          </Accordion.Panel>
                        </Accordion.Item>
                      )
                    })}
                  </Accordion>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper withBorder p="xl" m="xs">
                  <div
                    dangerouslySetInnerHTML={{ __html: richText }}
                  />
                </Paper>
              </Grid.Col>
            </Grid>
          </Stepper.Step>
          <Stepper.Step
            label="Edit Text"
            description="Edit the generated text using the Rich Text Editor"
          >
            <StepperRichTextStep />
          </Stepper.Step>
        </Stepper>
      </Box>
      <NewMistakeDialog
        open={mistakeDialogOpen}
        onClose={() => setMistakeDialogOpen(false)}
        arena={dialogClickedArena}
        feedbackId={query.id}
        removeParagraph={removeParagraph}
        commitParagraph={commitParagraph}
      />
      <NewDidWellDialog
        open={didWellDialogOpen}
        onClose={() => setDidWellDialogOpen(false)}
        arena={dialogClickedArena}
        feedbackId={query.id}
        removeParagraph={removeParagraph}
        commitParagraph={commitParagraph}
      />
    </>
  )
}
