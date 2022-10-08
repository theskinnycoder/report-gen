import {
  Accordion,
  Box,
  Button,
  Grid,
  Paper,
  ScrollArea,
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
import OverallFeedbackParagraph from "~/components/OverallFeedbackParagraph"
import StepperRichTextStep from "~/components/StepperRichTextStep"
import useFeedBack from "~/hooks/use-feed-back"
import { SECTIONS } from "~/utils/constants"
import { capitalize, mapJSONtoRichText } from "~/utils/functions"

export default function EditFeedbackPage() {
  const { query } = useRouter()
  const {
    loading,
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

  const theme = useMantineTheme()
  const [openedEditors, setOpenedEditors] = useState([])

  const [active, setActive] = useState(0)

  return (
    <>
      <Box my="xl" p="md">
        <Stepper
          size="xl"
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          styles={(theme) => ({
            steps: {
              maxWidth: theme.breakpoints.lg,
              margin: "0 auto",
              marginBottom: theme.spacing.lg,
            },
          })}
        >
          <Stepper.Step
            label="Generate Text"
            description="Generate the feedback using the builder"
          >
            <Grid gutter="xs">
              <Grid.Col span={6}>
                <Paper
                  withBorder
                  p="xl"
                  m="xs"
                  sx={{
                    borderWidth: "1.5px",
                  }}
                >
                  <ScrollArea
                    sx={{ height: "70vh" }}
                    scrollbarSize={4}
                  >
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
                                    gap: theme.spacing.xs,
                                    borderWidth: "1.5px",
                                  })}
                                >
                                  <Title order={5}>Mistakes</Title>
                                  {document[key]?.mistakes.length >=
                                    1 && (
                                    <Stack spacing="xl">
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
                                            loading={loading}
                                          />
                                        ),
                                      )}
                                    </Stack>
                                  )}
                                  <Button
                                    leftIcon={
                                      <PlusIcon strokeWidth="4px" />
                                    }
                                    variant="outline"
                                    color="red.6"
                                    sx={{
                                      borderWidth: "1.5px",
                                      alignSelf: "start",
                                    }}
                                    disabled={loading}
                                    loading={loading}
                                    onClick={async () => {
                                      await addNewParagraph(
                                        key,
                                        "mistakes",
                                      )
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
                                    gap: theme.spacing.xs,
                                    borderWidth: "1.5px",
                                  })}
                                >
                                  <Title order={5}>
                                    What you did well
                                  </Title>
                                  {document[key]?.didWell.length >=
                                    1 && (
                                    <Stack spacing="xl">
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
                                            loading={loading}
                                          />
                                        ),
                                      )}
                                    </Stack>
                                  )}
                                  <Button
                                    leftIcon={
                                      <PlusIcon strokeWidth="4px" />
                                    }
                                    variant="outline"
                                    color="green.7"
                                    sx={{
                                      borderWidth: "1.5px",
                                      alignSelf: "start",
                                    }}
                                    disabled={loading}
                                    loading={loading}
                                    onClick={async () => {
                                      await addNewParagraph(
                                        key,
                                        "didWell",
                                      )
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
                  </ScrollArea>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper
                  withBorder
                  p="xl"
                  m="xs"
                  sx={{
                    borderWidth: "1.5px",
                  }}
                >
                  <ScrollArea
                    sx={{ height: "70vh" }}
                    scrollbarSize={4}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: richText }}
                    />
                  </ScrollArea>
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
    </>
  )
}
