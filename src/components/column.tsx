import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

type ColumnsProps = {
  board?: {
    id: number;
    cards: {
      id: number;
      Title: string;
    };
    Title: string;
  };
};

const Columns: React.FC<ColumnsProps> = ({ board }) => {
  console.log(board);
  const [cardName, setCardName] = React.useState("");
  const [addCard, setAddCard] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <Card sx={{ maxWidth: "inherit", backgroundColor: "white" }}>
      {addCard && (
        <Box
          sx={{
            "& .MuiTextField-root": { m: "10px", width: "90%" },
          }}
          component="form"
        >
          <TextField
            id={error ? "outlined-error-helper-text" : "outlined-required"}
            label="Name"
            error={error}
            helperText={error ? "Please add title" : ""}
            value={cardName}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setCardName(e.target.value);
              setError(false);
            }}
          />
        </Box>
      )}

      {/* <Cards /> */}
      <CardActions>
        {addCard ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button onClick={() => setAddCard(false)}>Cancel</Button>
            <Button
              sx={{
                backgroundColor: "rgb(100, 112, 205)",
                color: "white",
                width: "sm",
              }}
              onClick={() => {
                cardName === "" ? setError(true) : setAddCard(false);
              }}
            >
              Add
            </Button>
          </Box>
        ) : (
          <Button
            sx={{
              display: "flex",
              width: "100%",
              justifySelf: "center",
            }}
            onClick={() => setAddCard(true)}
          >
            Add Column
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default Columns;
