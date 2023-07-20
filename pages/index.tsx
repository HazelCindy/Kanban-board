import * as React from "react";
import Head from "next/head";
import { ApolloProvider, gql } from "@apollo/client";
import { startApolloServer } from "../src/api/graphql";
import Kanban from "./dashboard/kanban";
import { client } from "../src/api/hello";

export default function Home({ boards }: any) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Kanban</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Kanban />
    </ApolloProvider>
  );
}

export async function getServerSideProps() {
  startApolloServer();

  return {
    props: { boards: [] },
  };
}
