import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fallbackImage } from "../constants/general.constants";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Box => div
// Stack => div which has display flex and direction column
const ProductDetail = () => {
  const params = useParams();
  const productId = params?.id;
  console.log(params);

  //   fetch product details
  const { isPending, data } = useQuery({
    queryKey: ["get-product-details"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${productId}`);
    },
  });

  console.log(data);

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "2rem",
        mt: "5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "50%",
        }}
      >
        <img src={fallbackImage} alt="" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-start",
          width: "500px",
          gap: "2rem",
        }}
      >
        <Typography variant="h5">Winter Woolen Jacket</Typography>
        <Chip
          label="Sonam"
          variant="outlined"
          color="success"
          sx={{ fontSize: "1rem" }}
        />
        <Typography sx={{ textAlign: "justify" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Solutrecusandae accusantium dolor aliquam doloremque beatae minima
          asperiores Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Solutrecusandae accusantium dolor aliquam doloremque beatae minima
          asperiores Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Solutrecusandae accusantium dolor aliquam doloremque beatae minima
          asperiores Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Solutrecusandae accusantium dolor aliquam doloremque beatae minima
          asperiores Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Solutrecusandae accusantium dolor aliquam doloremque beatae minima
          asperiores Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Solutrecusandae accusantium dolor aliquam doloremque beatae minima
          asperiores
        </Typography>
        <Typography variant="h6">Price: $50.50</Typography>

        <Chip
          variant="outlined"
          color="success"
          label="Grocery"
          sx={{ fontSize: "1rem" }}
        />

        <Typography variant="h6">Available quantity: 10</Typography>

        <Stack direction="row" spacing={4}>
          <Typography variant="h6">Free shipping</Typography>
          <Chip
            variant="outlined"
            color="success"
            label="Yes"
            sx={{ fontSize: "1rem" }}
          />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<EditIcon />}
            fullWidth
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            fullWidth
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductDetail;
