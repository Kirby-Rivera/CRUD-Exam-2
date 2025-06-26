import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import AppThemeProvider from "@/modules/app/AppThemeProvider";
import { AuthProvider } from "@/modules/app/AppAuthProvider";
import Layout from "@/components/layouts/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppThemeProvider>
    </AuthProvider>
  );
}
  