import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import {
  AppShell,
  ColorSchemeProvider,
  Group,
  Header,
  MantineProvider,
  Switch,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { getCookie, setCookie } from "cookies-next";
import { useState } from "react";
import { TbMoonStars as MoonIcon, TbSun as SunIcon } from "react-icons/tb";

export default function App(props) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useState(props.colorScheme);

  const toggleColorScheme = (value) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

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
            primaryColor: "teal",
            fontFamily: "Poppins, sans-serif",
            headings: {
              fontFamily: "Poppins, sans-serif",
            },
          }}
        >
          <AppShell
            padding="xl"
            header={
              <Header
                p="xl"
                sx={{
                  top: 0,
                  position: "sticky",
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
                  <Switch
                    checked={colorScheme === "dark"}
                    onChange={() => toggleColorScheme()}
                    color="gray"
                    size="lg"
                    onLabel={<SunIcon size="20" color="#fff" />}
                    offLabel={<MoonIcon size="20" color="#495057" />}
                  />
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
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
