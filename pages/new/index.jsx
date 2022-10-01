import {
  Accordion,
  Button,
  Grid,
  Paper,
  Stack,
  Title,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { TbPlus as PlusIcon } from "react-icons/tb";
import DidWellParagraph from "../../components/DidWellParagraph";
import IntroductionParagraph from "../../components/IntroductionParagraph";
import MistakeParagraph from "../../components/MistakeParagraph";
import OverallFeedbackParagraph from "../../components/OverallFeedbackParagraph";
import useFeedBack from "../../hooks/use-feed-back";
import useRichText from "../../hooks/use-rich-text";
import { SECTIONS } from "../../utils/constants";
import { capitalize } from "../../utils/functions";

export default function NewReportPage() {
  const [openedEditors, setOpenedEditors] = useState(["overall-feedback"]);
  const theme = useMantineTheme();
  const { feedback, addNewParagraph, getStaleParagraph } = useFeedBack();
  const { richText } = useRichText();

  return (
    <Grid
      gutter="xl"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid.Col span={6}>
        <Paper withBorder p="xl" m="xs">
          <Accordion value={openedEditors} onChange={setOpenedEditors} multiple>
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
                <OverallFeedbackParagraph />
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
                <IntroductionParagraph />
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
                      <Paper p="sm" withBorder>
                        <Title size="h5" mb="xs">
                          Mistakes
                        </Title>
                        {feedback[key].mistakes.length >= 1 && (
                          <Stack spacing="lg">
                            {feedback[key].mistakes.map((item) => (
                              <MistakeParagraph key={item.id} data={item} />
                            ))}
                          </Stack>
                        )}
                        <Button
                          disabled={getStaleParagraph(key)}
                          leftIcon={<PlusIcon />}
                          variant="outline"
                          color="red.7"
                          onClick={() => {
                            addNewParagraph(key, "mistakes");
                          }}
                        >
                          Add Mistake
                        </Button>
                      </Paper>
                      <Paper p="sm" withBorder>
                        <Title size="h5" mb="xs">
                          What you did well
                        </Title>
                        {feedback[key].didWell.length >= 1 && (
                          <Stack spacing="lg">
                            {feedback[key].didWell.map((item) => (
                              <DidWellParagraph key={item.id} data={item} />
                            ))}
                          </Stack>
                        )}
                        <Button
                          disabled={getStaleParagraph(key)}
                          leftIcon={<PlusIcon />}
                          variant="outline"
                          color="green.8"
                          onClick={() => {
                            addNewParagraph(key, "didWell");
                          }}
                        >
                          Add What You Did Well
                        </Button>
                      </Paper>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Paper>
      </Grid.Col>
      <Grid.Col span={6}>
        <Paper withBorder p="xl" m="xs">
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: richText }} />
          </TypographyStylesProvider>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
