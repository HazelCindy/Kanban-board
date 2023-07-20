import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export type TaskProps = {
  id: number;
  description: string;
};

const Task: React.FC<TaskProps> = ({ id, description }) => {
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
        label="Name"
        error={error}
        helperText={error ? "Please add title" : ""}
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setTaskName(e.target.value);
          setError(false);
        }}
      />
    </Box>
  );
};
export default Task;