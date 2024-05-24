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
  Stack,
  TextField,
} from "@mui/material";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import SearchIcon from "@mui/icons-material/Search";
import ProductFilterDialog from "./ProductFilterDialog";

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
        limit: 6,
        searchText: searchText || null,
      });
    },
  });

  const productList = data?.data?.productList;
  // console.log(productList);
  const totalPage = data?.data?.totalPages;

  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      <Stack direction="row" spacing="1rem" sx={{ marginBottom: "1rem" }}>
        <ProductFilterDialog />
        <FormControl variant="standard">
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
      </Stack>

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
