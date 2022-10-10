import {
  Box,
  Button,
  Center,
  CheckIcon,
  ColorSwatch,
  Group,
  Modal,
  SegmentedControl,
  Stack,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import {
  TbMoonStars as MoonIcon,
  TbSun as SunIcon,
} from "react-icons/tb"
import { capitalize } from "~/utils/functions"

export default function SettingsDialog({
  open,
  onClose,
  colorScheme,
  setColorScheme,
  toggleColorScheme,
  colorTheme,
  setTheme,
}) {
  const theme = useMantineTheme()

  const swatches = Object.keys(theme.colors).map((color) => (
    <Tooltip label={capitalize(color)} key={color} withArrow>
      <ColorSwatch
        component="button"
        onClick={() => setTheme(color)}
        color={theme.colors[color][6]}
        sx={{
          color: colorScheme === "dark" ? "#fff" : "#000",
          cursor: "pointer",
          border: `2px solid ${
            colorScheme === "dark" ? "#fff" : "#000"
          }`,
        }}
      >
        {colorTheme === color && <CheckIcon width={10} />}
      </ColorSwatch>
    </Tooltip>
  ))

  return (
    <Modal
      title={<Title order={3}>Settings</Title>}
      opened={open}
      onClose={onClose}
      size="lg"
    >
      <Stack spacing="xl">
        <Group align="center" position="left">
          <Title order={6}>Color Mode</Title>
          <SegmentedControl
            value={colorScheme}
            onChange={() => toggleColorScheme()}
            data={[
              {
                label: (
                  <Center>
                    <SunIcon size={16} />
                    <Box ml={10}>Light</Box>
                  </Center>
                ),
                value: "light",
              },
              {
                label: (
                  <Center>
                    <MoonIcon size={16} />
                    <Box ml={10}>Dark</Box>
                  </Center>
                ),
                value: "dark",
              },
            ]}
          ></SegmentedControl>
        </Group>
        <Stack spacing="xs">
          <Title order={6}>Color Theme</Title>
          <Group position="left" spacing="xs">
            {swatches}
          </Group>
        </Stack>
        <Group mt="xl">
          <Button
            variant="outline"
            color={colorScheme === "dark" ? "gray" : "dark"}
            onClick={() => {
              setColorScheme("light")
              setTheme("teal")
            }}
          >
            Reset to defaults
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
