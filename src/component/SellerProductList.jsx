import { useQuery } from "@tanstack/react-query";
import React from "react";
import $axios from "../axios/axios.instance";
import { Box, Button, CircularProgress } from "@mui/material";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const SellerProductList = () => {
  const navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: ["get-seller-product"],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", {
        page: 1,
        limit: 9,
      });
    },
  });

  const productList = data?.data?.productList;

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/add-product");
        }}
        sx={{ marginBottom: "2rem" }}
      >
        add product
      </Button>
      <Box
        sx={{
          display: "flex",
          flexwrap: "wrap",
          justifyContent: "center",
          alignItem: "center",
          gap: "3rem",
        }}
      >
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
    </>
  );
};

export default SellerProductList;
