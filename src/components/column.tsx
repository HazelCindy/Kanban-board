import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Cards from "./card";
import Task, { TaskProps } from "./task";

interface ColumnsProps {
  column?: {
    id: number;
    name: string;
    tasks: TaskProps[];
  };
}

function Columns({ column }: ColumnsProps) {
  return (
    <Card sx={{ maxWidth: "inherit", backgroundColor: "white" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          height: "40px",
          alignItems: "center",
          mx: "10px",
        }}
      >
        <Typography>{column?.name}</Typography>
        <MoreHorizIcon />
      </Box>
      {column?.tasks?.map((task) => (
        <Task description={task?.description} key={task?.description} />
      ))}

      <Cards />
    </Card>
  );
}
export default Columns;
