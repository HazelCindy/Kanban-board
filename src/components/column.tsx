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
      itle
      description
    }
  }
`;

interface ColumnsProps {
  column?: {
    id: number;
    Title: string;
    TaskId: number[];
  };
}

function Columns({ column }: ColumnsProps) {
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
      setTasks(
        data?.tasks?.filter(
          (task: TaskProps) => column?.TaskId.includes(task?.id || 0)
        )
      );
    }
  }, [column, data]);

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
        <Typography>{column?.Title}</Typography>
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

      {tasks.length === 0 ? (
        <Task />
      ) : (
        //   Display task if availabe
        tasks?.map((task) => (
          <Task description={task?.description} key={task?.id} />
        ))
      )}

      <Cards />
    </Card>
  );
}
export default Columns;
