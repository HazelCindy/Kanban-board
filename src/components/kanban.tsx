import * as React from "react";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Cards from "./card";
import BreadCrumb from "./breadcrumb";
import Columns from "./column";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { COLUMNS } from "../../utils/mutations";

function Kanban() {
  // get all the columns
  const { loading, error, data } = useQuery(COLUMNS);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return (
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
        <Grid container columnSpacing={{ xs: 1, md: 2, lg: 2 }} rowSpacing={1}>
          {/* Display columns once added */}
          {data?.Columns?.map((board: any) => (
            <Grid md={2} lg={2.2} key={board?.id}>
              <DndProvider backend={HTML5Backend}>
                <Columns Title={board?.Title} id={board?.id} />
              </DndProvider>
            </Grid>
          ))}
          {/* Display the add column only if there less than 5 columns present */}
          {(!data?.Columns || data?.Columns?.length < 5) && (
            <Grid md={2} lg={2.2} key="*">
              <Cards column />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
export default Kanban;
