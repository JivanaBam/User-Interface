import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import CartItemTable from "../component/CartItemTable";
import OrderSummary from "../component/OrderSummary";
import { useQuery } from "@tanstack/react-query";
import KeepShopping from "../component/KeepShopping";
import $axios from "../axios/axios.instance";
import Loader from "../component/Loader";

const Cart = () => {
  // get cart items
  const { isPending, data } = useQuery({
    queryKey: ["get-cart-item-list"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list");
    },
  });

  const cartData = data?.data?.cartData;
  // console.log(cartData);

  const orderSummary = data?.data?.orderSummary;
  // console.log(orderSummary);

  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      {cartData?.length === 0 ? (
        <KeepShopping />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "4rem",
            width: "90%",
          }}
        >
          <CartItemTable cartData={cartData} />
          <OrderSummary orderSummary={orderSummary} />
        </Box>
      )}
    </>
  );
};

export default Cart;
