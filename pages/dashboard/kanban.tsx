import * as React from "react";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BreadCrumb from "../../src/components/breadcrumb";
import Grid from "@mui/material/Unstable_Grid2";
import Columns from "../../src/components/column";

export default function Kanban({ boards }: any) {
  return (
    <>
      <Head>
        <title>Kanban</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          padding: "20px",
        }}
      >
        <Typography variant="h3">Kanban</Typography>
        <BreadCrumb />
        <Box
          sx={{
            mt: 2,
          }}
        >
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {boards.map((board: any) => (
              <Grid xs={6} md={4} key={board?.id}>
                <Columns board={board} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}