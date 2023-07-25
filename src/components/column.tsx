import * as React from "react";
import { useDrop } from "react-dnd";
import Card from "@mui/material/Card";
import { useMutation, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import {
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Cards from "./card";
import Task, { TaskProps } from "./task";
import {
  CLEAR_TASKS,
  COLUMNS,
  DELETE_COLUMN,
  TASKS,
  UPDATE_COLUMNS,
  UPDATE_TASKS,
} from "../../utils/mutations";

export interface ColumnsProps {
  id?: string;
  Title: string;
}

function Columns({ id, Title }: ColumnsProps) {
  const [tasks, setTasks] = React.useState<Array<TaskProps>>([]);
  const [columnUpdate, setColumnUpdate] = React.useState({
    rename: {
      edit: false,
      name: "",
    },
    clear: false,
    delete: false,
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // get tasks in cache
  const { data } = useQuery(TASKS);
  // Mutations for a single column
  const [deleteColumn] = useMutation(DELETE_COLUMN);
  const [clearTasks] = useMutation(CLEAR_TASKS);
  const [updateColumn] = useMutation(UPDATE_COLUMNS);
  const [updateTask] = useMutation(UPDATE_TASKS);

  // handle drag and drop to a separate column
  const [, drop] = useDrop({
    accept: "task",
    drop: (item: any) => {
      if (item.columnID !== id) {
        updateTask({
          variables: {
            columnId: id,
            description: item.Description,
            updateTaskId: item.id,
          },
          // refetch the tasks
          refetchQueries: [TASKS, "Tasks"],
        });
      }
    },
  });

  // handle opening the more menu
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // handle closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  // handle the renaming of a column
  const handleRename = () => {
    setColumnUpdate({
      ...columnUpdate,
      rename: {
        edit: true,
        name: "",
      },
    });
  };

  // handling deleting a column
  const handleDelete = () => {
    deleteColumn({
      variables: { deleteColumnId: id },
      // refetch the columns
      refetchQueries: [COLUMNS, "Columns"],
    });
    setAnchorEl(null);
  };
  // handle clearing the tasks in a column
  const handleClear = () => {
    clearTasks({
      variables: { columnId: id },
      // refetch the tasks
      refetchQueries: [TASKS, "Tasks"],
    });
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (data?.Tasks) {
      // set the tasks for each indvidual column
      setTasks(data?.Tasks?.filter((task: TaskProps) => task?.ColumnId === id));
    }
  }, [id, data]);

  return (
    <Card sx={{ maxWidth: "inherit", backgroundColor: "white" }} ref={drop}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          height: "60px",
          alignItems: "center",
          mx: "10px",
        }}
      >
        {columnUpdate.rename.edit ? (
          <TextField
            variant="outlined"
            value={Title}
            size="small"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              columnUpdate["rename"].name = e.target.value;
            }}
          />
        ) : (
          <Typography>{Title}</Typography>
        )}

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
          <MenuItem onClick={handleRename}>Rename</MenuItem>
          <MenuItem onClick={handleClear}>Clear</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Box>

      {tasks?.length === 0 ? (
        <Task Description="" />
      ) : (
        //   Display task if availabe
        tasks?.map((task, index) => (
          <Task
            Description={task?.Description}
            ColumnId={id}
            id={task?.id}
            key={task?.id}
            index={index}
          />
        ))
      )}

      <Cards columnId={id} />
    </Card>
  );
}
export default Columns;
