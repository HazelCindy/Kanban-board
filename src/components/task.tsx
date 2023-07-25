import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useDrag, useDrop } from "react-dnd";

export interface TaskProps {
  id?: string;
  Description?: string;
  ColumnId?: string;
}
function Task({ Description, id, ColumnId }: any) {
  const ref = React.useRef(null);
  const [, setTaskName] = React.useState("");
  const [error, setError] = React.useState(false);
  const [, drop] = useDrop({
    accept: "task",
  });
  // pass the task on drag
  const [, drag] = useDrag({
    type: "task",
    item: { id, ColumnId, Description, type: "task" },
  });

  drag(drop(ref));

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: "10px", width: "90%", height: "60px" },
      }}
      component="form"
      ref={ref}
    >
      <TextField
        id={error ? "outlined-error-helper-text" : "outlined-required"}
        label="Title"
        error={error}
        aria-readonly
        helperText={error ? "Please add title" : ""}
        value={Description}
        InputProps={{
          readOnly: true,
        }}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setTaskName(e.target.value);
          setError(false);
        }}
      />
    </Box>
  );
}
export default Task;
