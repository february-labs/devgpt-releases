import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { ChakraProvider, Heading, Text, useToast } from "@chakra-ui/react";
import router from "next/router";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
import { ipcRenderer } from "electron";

export default function Home() {
  useEffect(() => {
    if (router) {
      router.push("/signup");
    }
  }, []);

  const toast = useToast();

  useEffect(() => {
    ipcRenderer.on("update_available", () => {
      router.push("/upgrade");
      toast({
        title: "A new version is available!",
        description: "Please wait while the app updates...",
        status: "success",
        duration: 8000,
        isClosable: true,
        position: "top-right",
      });
    });
  }, []);

  const global = globalThis;

  return (
    <>
      <Head>
        <script>var global = global || window;</script>
        <title>DevGPT</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button
          onClick={() => {
            router.push("/login");
          }}
        ></button>
      </main>
    </>
  );
}