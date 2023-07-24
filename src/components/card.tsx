import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { gql, useMutation } from "@apollo/client";
import { BOARD } from "../../pages/dashboard/kanban";

const ADD_COLUMN = gql`
  mutation addColumn($title: String) {
    addColumn(Title: $title) {
      TaskId
      Title
      id
    }
  }
`;

type CardsProps = {
  column?: boolean;
};

function Cards({ column }: CardsProps) {
  const [cardName, setCardName] = React.useState("");
  const [addCard, setAddCard] = React.useState(false);
  const [errorMessage, setError] = React.useState(false);
  // Mutation to add a new column
  const [addColumn, { data, loading, error }] = useMutation(ADD_COLUMN);

  const handleAddColumn = (id: number, name: string) => {
    if (name !== "" && column) {
      addColumn({
        variables: { title: name },
      });
    }
  };

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
            label={column ? "Name" : "Title"}
            error={errorMessage}
            helperText={error ? "Please add title" : ""}
            value={cardName}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setCardName(e.target.value);
              setError(false);
            }}
          />
        </Box>
      )}

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
                column ? handleAddColumn(1, cardName) : "";
                cardName !== "" && setAddCard(false);
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
              height: "40px",
              alignItems: "center",
              justifySelf: "center",
            }}
            onClick={() => setAddCard(true)}
          >
            {column ? "Add Column" : " Add Card"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
export default Cards;
