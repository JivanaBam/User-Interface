import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fallbackImage } from "../constants/general.constants";

const ProductCard = (props) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <CardMedia
        sx={{ height: "300px", width: "400px", cursor: "pointer" }}
        image={props?.image || fallbackImage}
        title="watch"
        onClick={() => {
          navigate(`/product-details/${props._id}`);
        }}
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>

          <Chip label={props.brand} color="secondary" variant="outlined" />
        </Stack>

        <Typography>Price: रु{props.price}</Typography>

        <Typography variant="body2" color="text.secondary">
          {props.description}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate(`/product-details/${props._id}`);
          }}
          fullWidth
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
