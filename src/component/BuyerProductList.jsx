import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import $axios from "../axios/axios.instance";
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  OutlinedInput,
  Pagination,
  TextField,
} from "@mui/material";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import SearchIcon from "@mui/icons-material/Search";

const BuyerProductList = () => {
  const [searchText, setSearchText] = useState(" ");
  // console.log(searchText);
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data } = useQuery({
    // yo currentPage, searchText yesma rakkhnu ko reason is when we hit
    // whichever page that api must be re-hit or refresh to give latest page
    queryKey: ["get-buyer-product", currentPage, searchText],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: currentPage,
        limit: 3,
        searchText: searchText || null,
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
      {/* <TextField
        sx={{ marginBottom: "2rem" }}
        placeholder="search product"
        variant="outlined"
        onChange={(event) => {
          const searchText = event?.target?.value;

          setSearchItem(searchText);
        }}
      /> */}

      <FormControl variant="standard" sx={{ marginBottom: "1rem" }}>
        <OutlinedInput
          onChange={(event) => {
            setSearchText(event?.target?.value);
            setCurrentPage(1);
          }}
          placeholder="search products here..."
          startAdornment={
            <InputAdornment position="start" sx={{ color: "purple" }}>
              <SearchIcon sx={{ fontSize: "2rem" }} />
            </InputAdornment>
          }
        />
      </FormControl>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          marginBottom: "2rem 0",
        }}
      >
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
      <Pagination
        page={currentPage}
        count={totalPage}
        color="secondary"
        onChange={(_, value) => {
          setCurrentPage(value);
          // console.log(value);
        }}
      />
    </>
  );
};

export default BuyerProductList;
