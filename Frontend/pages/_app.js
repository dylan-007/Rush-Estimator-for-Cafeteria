import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import AuthState from "../hooks/AuthContext/AuthState";
import DataState from "../hooks/DataContext/DataState";
import Layout from "../components/common/Layout";
import Head from "next/head";
import React from "react";
import DishState from "../hooks/DishContext/DishState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Rush Estimator</title>
        <meta
          name="description"
          content="Restaurent Rush Estimator by Elite Coders"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthState>
        <DataState>
          <DishState>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ToastContainer />
          </DishState>
        </DataState>
      </AuthState>
    </React.Fragment>
  );
}

export default MyApp;
