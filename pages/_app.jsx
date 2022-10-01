import {
  AppShell,
  Header,
  MantineProvider,
  Title,
  ColorSchemeProvider,
  Group,
  Switch,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useState } from "react";
import FeedBackItemsProvider from "../contexts/FeedBackItemsContext";
import { getCookie, setCookie } from "cookies-next";
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
    <FeedBackItemsProvider>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "SF Pro Text, sans-serif",
            headings: { fontFamily: "SF Pro Display, sans-serif" },
            colorScheme,
            primaryColor: "cyan",
          }}
        >
          <AppShell
            padding="xl"
            header={
              <Header
                height={60}
                p={40}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Title
                  component={NextLink}
                  href="/"
                  size="h4"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: "0.5",
                  }}
                >
                  blip.
                </Title>
                <Switch
                  checked={colorScheme === "dark"}
                  onChange={() => toggleColorScheme()}
                  color="gray"
                  size="lg"
                  onLabel={<SunIcon size="20" color="#fff" />}
                  offLabel={<MoonIcon size="20" color="#495057" />}
                />
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
    </FeedBackItemsProvider>
  );
}

App.getInitialProps = ({ ctx }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
