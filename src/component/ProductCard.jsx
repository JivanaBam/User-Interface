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
        width: "300px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 400,
          width: "100%",
          cursor: "pointer",
          objectFit: "cover",
        }}
        image={props?.image || fallbackImage}
        title={`${props?.name}- ${props?.brand}`}
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

        <Stack direction="row">
          <Typography>Price: Rs.{props.price}</Typography>
        </Stack>
        <Stack direction="row" spacing={4}>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="justify"
            sx={{ height: "50px" }}
          >
            {props.description}...
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => {
            navigate(`/product-details/${props._id}`);
          }}
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
