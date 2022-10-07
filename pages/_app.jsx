import "@fontsource/poppins/400.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import {
  ActionIcon,
  AppShell,
  ColorSchemeProvider,
  Group,
  Header,
  MantineProvider,
  Title,
} from "@mantine/core"
import { NextLink } from "@mantine/next"
import { NotificationsProvider } from "@mantine/notifications"
import { getCookie, setCookie } from "cookies-next"
import { useState } from "react"
import { HiOutlineAdjustments as SettingsIcon } from "react-icons/hi"
import SettingsDialog from "~/components/SettingsDialog"

export default function App(props) {
  const { Component, pageProps } = props

  const [colorScheme, setColorScheme] = useState(props.colorScheme)
  const [colorTheme, setColorTheme] = useState(props.colorTheme)

  const toggleColorScheme = (value) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark")
    setColorScheme(nextColorScheme)
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  const setTheme = (value) => {
    const nextColorTheme = value || "teal"
    setColorTheme(nextColorTheme)
    setCookie("mantine-color-theme", nextColorTheme, {
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  const [openSettingsDialog, setOpenSettingsDialog] = useState(false)

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor: colorTheme,
            fontFamily: "Poppins, sans-serif",
            headings: {
              fontFamily: "Poppins, sans-serif",
            },
          }}
        >
          <NotificationsProvider>
            <AppShell
              padding="xl"
              header={
                <Header
                  p="xl"
                  sx={{
                    top: 0,
                    position: "sticky",
                    backgroundColor: "transparent",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Group align="center" position="apart" px="xl">
                    <Title
                      component={NextLink}
                      href="/"
                      size="h4"
                      sx={{
                        fontWeight: "bold",
                        letterSpacing: "0.5",
                      }}
                    >
                      DT Reviews
                    </Title>
                    <ActionIcon
                      size="lg"
                      variant="light"
                      radius="md"
                      onClick={() => setOpenSettingsDialog(true)}
                      sx={(theme) => ({
                        border: "1.5px solid transparent",
                        ":hover": {
                          borderColor: theme.colors[colorTheme][6],
                        },
                      })}
                    >
                      <SettingsIcon size="20" />
                    </ActionIcon>
                  </Group>
                </Header>
              }
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
                },
              })}
            >
              <Component {...pageProps} />
            </AppShell>
            <SettingsDialog
              open={openSettingsDialog}
              onClose={() => setOpenSettingsDialog(false)}
              colorScheme={colorScheme}
              setColorScheme={setColorScheme}
              toggleColorScheme={toggleColorScheme}
              colorTheme={colorTheme}
              setTheme={setTheme}
            />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

App.getInitialProps = ({ ctx }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
  colorTheme: getCookie("mantine-color-theme", ctx) || "teal",
})
