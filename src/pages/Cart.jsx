import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import CartItemTable from "../component/CartItemTable";
import OrderSummary from "../component/OrderSummary";
import { useQuery } from "@tanstack/react-query";
import KeepShopping from "../component/KeepShopping";
import $axios from "../axios/axios.instance";

const Cart = () => {
  // get cart items
  const { isPending, data } = useQuery({
    queryKey: ["get-cart-item-list"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list");
    },
  });

  const cartData = data?.data?.cartData;

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h3" sx={{ marginBottom: "2rem" }}>
        Shopping cart
      </Typography>
      {cartData?.length === 0 ? (
        <KeepShopping />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            width: "90%",
          }}
        >
          <CartItemTable cartData={cartData} />
          <OrderSummary />
        </Box>
      )}
    </>
  );
};

export default Cart;
