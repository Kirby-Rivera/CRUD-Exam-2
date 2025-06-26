import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import AppThemeProvider from "@/modules/app/AppThemeProvider";
import { AuthProvider } from "@/modules/app/AppAuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Component {...pageProps} />;
      </AppThemeProvider>
    </AuthProvider>
  );
}
