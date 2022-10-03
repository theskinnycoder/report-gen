import {
  AppShell,
  ColorSchemeProvider,
  Header,
  MantineProvider,
  Switch,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { getCookie, setCookie } from "cookies-next";
import Head from "next/head";
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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Poppins, SF Pro Text, sans-serif",
            headings: { fontFamily: "Poppins, SF Pro Display, sans-serif" },
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
    </>
  );
}

App.getInitialProps = ({ ctx }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
