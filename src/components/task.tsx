import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export interface TaskProps {
  id?: string;
  Description?: string;
  ColumnId?: string;
}

function Task({ Description }: TaskProps) {
  const [, setTaskName] = React.useState("");
  const [error, setError] = React.useState(false);

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: "10px", width: "90%", height: "60px" },
      }}
      component="form"
    >
      <TextField
        id={error ? "outlined-error-helper-text" : "outlined-required"}
        label="Title"
        error={error}
        aria-readonly
        helperText={error ? "Please add title" : ""}
        value={Description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setTaskName(e.target.value);
          setError(false);
        }}
      />
    </Box>
  );
}
export default Task;
