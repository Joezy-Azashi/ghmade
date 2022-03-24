import { useRouter } from "next/router";
import { ContextWrapper } from "../contextStore";

function MyApp({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <Component {...pageProps} />
    </ContextWrapper>
  );
}

export default MyApp;
