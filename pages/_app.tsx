import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import Navbar from "../components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps, router }: AppProps) {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "Merriweather",
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster />
        <CssBaseline />
        <Navbar />
        <AnimatePresence exitBeforeEnter>
          <motion.div exit={{ opacity: 0 }} key={router.route}>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
