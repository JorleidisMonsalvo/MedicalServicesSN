import "../styles/globals.css";
import { StateContext} from "../context/StateContext";
import Layout from "../components/Layout";
function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
