import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>MedicalServices!</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
    </div>
  );
};

export default Layout;
