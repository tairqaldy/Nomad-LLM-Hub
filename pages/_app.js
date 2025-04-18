import { ClerkProvider } from "@clerk/nextjs";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
