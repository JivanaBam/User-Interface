import { useQuery } from "@tanstack/react-query";
import React from "react";
import $axios from "../axios/axios.instance";
import { Box, CircularProgress } from "@mui/material";

import ProductCard from "./ProductCard";

const BuyerProductList = () => {
  const { isPending, data } = useQuery({
    queryKey: ["get-buyer-product"],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: 1,
        limit: 2,
      });
    },
  });

  const productList = data?.data?.productList;

  if (isPending) {
    return <CircularProgress />;
  }

  return (
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
  );
};

export default BuyerProductList;
