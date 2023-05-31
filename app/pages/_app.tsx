import "@styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState, createContext } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  Theme,
  darkTheme,
  Chain,
} from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import merge from "lodash.merge";
import Head from "next/head";
import Navbar from "@components/Navbar";

export const TIXO_API_URL = process.env.NEXT_PUBLIC_TIXO_API_URL;
export const TIXO_CLIENT_URL = process.env.NEXT_PUBLIC_TIXO_CLIENT_URL;

const polygonMumbai: Chain = {
  id: 80001,
  name: "Polygon Mumbai",
  network: "MATIC",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "MATIC",
  },
  rpcUrls: {
    default: "https://matic-mumbai.chainstacklabs.com",
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://mumbai.polygonscan.com/" },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Tixo",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const theme = extendTheme({
  styles: {
    global: {
      "*": {
        fontFamily: "Montserrat",
        color: "white",
      },
      button: {
        color: "white !important",
      },
      a: {
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

const customTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#1E1E1E",
  },
} as Theme);

export const ImageContext = createContext(null);

function MyApp({ Component, pageProps, router }: AppProps) {
  const [selectedImage, setSelectedImage] = useState("/0.jpg");

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={customTheme}>
        <ChakraProvider theme={theme}>
          <ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
            <Head>
              <title>TIXO: NFT Ticketing</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div
              className="dynamic-bg"
              style={{
                backgroundImage: `url(${selectedImage})`,
              }}
            >
              <Component {...pageProps} key={router.route} />
            </div>
          </ImageContext.Provider>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
