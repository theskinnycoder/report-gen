import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Radio,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { FiSave as SaveIcon } from "react-icons/fi"
import {
  HiTrash as TrashIcon,
  HiPencilAlt as EditIcon,
} from "react-icons/hi"
import useStorage from "~/hooks/use-storage"
import RichTextEditor from "./RichTextEditor"

export default function MistakeParagraph({
  data,
  removeParagraph,
  commitParagraph,
  count,
  loading,
}) {
  const { query } = useRouter()
  const { uploadImage } = useStorage()
  const [completeData, setCompleteData] = useState(null)
  const [radios, setRadios] = useState([])
  const [versions, setVersions] = useState([])

  const [selectedRadio, setSelectedRadio] = useState(
    data?.selectedRadio ?? 1,
  )
  const [selectedVersion, setSelectedVersion] = useState(
    data?.selectedVersion ?? 1,
  )

  const [explanationText, setExplanationText] = useState(
    data?.explanationText ?? "",
  )
  const [overcomeText, setOvercomeText] = useState(
    data?.overcomeText ?? "",
  )
  const [ssFile, setSsFile] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (data?.stale) {
        const response = await fetch(
          `/api/sheets?stage=${data?.section}&feedback_type=mistake`,
        )
        const { values } = await response.json()
        setCompleteData(values)
        setRadios(values.map((row) => row.checkbox_text))
        setVersions(
          Array.from(
            {
              length: values[0].explanations.filter((el) => el)
                .length,
            },
            (_v, i) => i + 1,
          ),
        )
      }
    })()
  }, [data?.section, data?.stale])

  const theme = useMantineTheme()

  return (
    <>
      {data.stale ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            let url = data?.screenshot
            if (ssFile) {
              url = await uploadImage(
                query.id,
                data.section,
                data.type,
                data.id,
                ssFile,
              )
            }
            await commitParagraph(data.id, {
              ...data,
              screenshot: url,
              explanationText,
              overcomeText,
              stale: false,
              selectedRadio,
              selectedVersion,
            })
          }}
        >
          <Stack
            spacing="md"
            p="md"
            sx={{
              position: "relative",
              border: "1.5px solid",
              borderColor: theme.colors.red[6],
              borderRadius: theme.radius.sm,
            }}
          >
            <Group
              sx={{
                position: "absolute",
                top: "0px",
                right: "0px",
                transform: "translate(50%, -50%)",
              }}
            >
              <Tooltip label="Delete" withArrow>
                <ActionIcon
                  onClick={async () => {
                    await removeParagraph(
                      data.section,
                      data.type,
                      data.id,
                    )
                  }}
                  radius="xl"
                  variant="filled"
                  size="md"
                  color="red"
                  loading={loading}
                  disabled={loading}
                >
                  <TrashIcon size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>

            {/* Screenshot */}
            <Stack spacing="xs">
              <Text
                component="label"
                size="sm"
                sx={{
                  fontWeight: 500,
                }}
              >
                Screenshot
              </Text>
              <Dropzone
                onDrop={(files) => {
                  setSsFile(files[0])
                }}
                onReject={(files) =>
                  console.log("rejected files", files)
                }
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                multiple={false}
                sx={{
                  width: "100%",
                }}
              >
                {data?.screenshot && !ssFile ? (
                  <img
                    src={data?.screenshot}
                    alt=""
                    style={{ width: "100%" }}
                  />
                ) : (
                  <>
                    {ssFile ? (
                      <img
                        src={URL.createObjectURL(ssFile)}
                        alt=""
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <Group
                        position="center"
                        spacing="xl"
                        style={{
                          minHeight: 220,
                          pointerEvents: "none",
                        }}
                      >
                        <Text size="xl" inline>
                          Drag images here or click to select files
                        </Text>
                      </Group>
                    )}
                  </>
                )}
              </Dropzone>
            </Stack>

            {(ssFile || data?.screenshot) && (
              <>
                <Divider />
                <Radio.Group
                  orientation="vertical"
                  label="Select a suitable explanation for this screenshot"
                  spacing="sm"
                  offset="sm"
                  withAsterisk
                  value={selectedRadio}
                  onChange={(value) => {
                    setSelectedRadio(+value)
                    setSelectedVersion(1)
                    setExplanationText(
                      completeData[+value - 1].explanations[0],
                    )
                    setOvercomeText(
                      completeData[+value - 1].corrections[0],
                    )
                    setVersions(
                      Array.from(
                        {
                          length: completeData[
                            +value - 1
                          ].explanations.filter((el) => el).length,
                        },
                        (_v, i) => i + 1,
                      ),
                    )
                  }}
                >
                  {radios.map((radio, idx) => (
                    <Radio key={idx} value={idx + 1} label={radio} />
                  ))}
                </Radio.Group>
              </>
            )}

            {(data?.screenshot || ssFile) && selectedRadio && (
              <>
                <Divider />
                <Radio.Group
                  name="version"
                  orientation="vertical"
                  label="Select a version of the paragraph to be populated"
                  spacing="sm"
                  offset="sm"
                  withAsterisk
                  value={selectedVersion}
                  onChange={(value) => {
                    setSelectedVersion(+value)
                    setExplanationText(
                      completeData[selectedRadio - 1].explanations[
                        +value - 1
                      ],
                    )
                    setOvercomeText(
                      completeData[selectedRadio - 1].corrections[
                        +value - 1
                      ],
                    )
                  }}
                >
                  {versions.map((version) => (
                    <Radio
                      key={version}
                      value={version}
                      label={version}
                    />
                  ))}
                </Radio.Group>
              </>
            )}

            {/* Explanation Text */}
            {(data?.screenshot || ssFile) &&
              selectedRadio &&
              selectedVersion && (
                <>
                  <Divider />
                  <Stack spacing="xs">
                    <Text
                      component="label"
                      size="sm"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      Explanation Text
                    </Text>
                    <RichTextEditor
                      value={explanationText}
                      onChange={(value) => setExplanationText(value)}
                    />
                  </Stack>
                </>
              )}

            {/* Overcome Text */}
            {(data?.screenshot || ssFile) &&
              selectedRadio &&
              selectedVersion && (
                <>
                  <Divider />
                  <Stack spacing="xs">
                    <Text
                      component="label"
                      size="sm"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      Correction Text
                    </Text>
                    <RichTextEditor
                      value={overcomeText}
                      onChange={(value) => setOvercomeText(value)}
                    />
                  </Stack>
                </>
              )}

            <Group position="right" align="center">
              <Button
                loading={loading}
                disabled={loading}
                variant="default"
                color="gray"
                onClick={async () => {
                  await commitParagraph(data.id, {
                    ...data,
                    stale: false,
                  })
                }}
              >
                Nevermind
              </Button>
              <Button
                leftIcon={<SaveIcon strokeWidth="3px" />}
                type="submit"
                loading={loading}
                disabled={loading}
              >
                Commit
              </Button>
            </Group>
          </Stack>
        </form>
      ) : (
        <Stack
          spacing="md"
          p="md"
          sx={{
            position: "relative",
            border: "1.5px solid",
            borderColor: theme.colors.red[6],
            borderRadius: theme.radius.sm,
          }}
        >
          <Group
            spacing="xs"
            position="right"
            sx={{
              position: "absolute",
              top: "0px",
              right: "18px",
              transform: "translate(50%, -50%)",
            }}
          >
            <Tooltip label="Edit" withArrow>
              <ActionIcon
                onClick={async () => {
                  await commitParagraph(data.id, {
                    ...data,
                    stale: true,
                  })
                }}
                radius="xl"
                variant="filled"
                size="md"
                color="blue"
                loading={loading}
                disabled={loading}
              >
                <EditIcon size={18} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete" withArrow>
              <ActionIcon
                onClick={async () =>
                  await removeParagraph(
                    data.section,
                    data.type,
                    data.id,
                  )
                }
                radius="xl"
                variant="filled"
                size="md"
                color="red"
                loading={loading}
                disabled={loading}
              >
                <TrashIcon size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>

          <Text>
            <Text>Mistake - {count}</Text>
          </Text>
        </Stack>
      )}
    </>
  )
}
