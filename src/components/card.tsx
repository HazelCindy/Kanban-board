import * as React from "react";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

const Cards: React.FC = () => {
  const [cardContent, setCardContent] = React.useState([]);
  return (
    <Box>
      <Input type="text" />
      {"text"}
      <CardActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button size="small">Add Card</Button>
      </CardActions>
    </Box>
  );
};
export default Cards;
