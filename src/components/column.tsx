import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Cards from "./card";
import Task, { TaskProps } from "./task";
import { gql, useQuery } from "@apollo/client";

export const Tasks = gql`
  query {
    Tasks {
      id
      Description
      ColumnId
    }
  }
`;

export interface ColumnsProps {
  id?: string;
  Title: string;
}

function Columns({ id, Title }: ColumnsProps) {
  const [tasks, setTasks] = React.useState<Array<TaskProps>>([]);
  // get tasks in cache
  const { data } = useQuery(Tasks);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // handle opening the more menu
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (data?.Tasks) {
      // set the tasks for each indvidual column
      setTasks(data?.Tasks?.filter((task: TaskProps) => task?.ColumnId === id));
    }
  }, [id, data]);

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
        <Typography>{Title}</Typography>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Rename</MenuItem>
          <MenuItem onClick={handleClose}>Clear</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </Box>

      {tasks?.length === 0 ? (
        <Task />
      ) : (
        //   Display task if availabe
        tasks?.map((task) => (
          <Task Description={task?.Description} key={task?.id} />
        ))
      )}

      <Cards columnId={id} />
    </Card>
  );
}
export default Columns;
