import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import $axios from "../axios/axios.instance";
import { Box, Button, Pagination } from "@mui/material";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import SellProductPrompt from "./SellProductPrompt";

const SellerProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: ["get-seller-products", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", {
        page: currentPage,
        limit: 3,
      });
    },
  });

  const productList = data?.data?.productList;
  const totalPage = data?.data?.totalPages;

  if (isPending) {
    return <Loader />;
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

      {productList.length === 0 && <SellProductPrompt />}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          marginBottom: "2rem",
          marginLeft: "4rem",
        }}
      >
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>

      <Pagination
        count={totalPage}
        color="secondary"
        page={currentPage}
        onChange={(_, value) => {
          setCurrentPage(value);
        }}
      />
    </>
  );
};

export default SellerProductList;
