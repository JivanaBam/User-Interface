import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import $axios from "../axios/axios.instance";
import {
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const CartItemTable = ({ cartData }) => {
  const queryClient = useQueryClient();

  //   clear cart api
  const { isPending: clearCartPending, mutate: clearCart } = useMutation({
    mutationKey: ["clear-cart"],
    mutationFn: async () => {
      return await $axios.delete("/cart/clear");
    },
    onSuccess: () => {
      // re-hit get cart item list api
      queryClient.invalidateQueries("get-cart-item-list");
    },
  });

  //   remove single item from cart api
  const {
    isPending: removeSingleItemFromCartPending,
    mutate: removeSingleItemFromCart,
  } = useMutation({
    mutationKey: ["remove-single-cart-item"],
    mutationFn: async (productId) => {
      return await $axios.delete(`/cart/item/remove/${productId}`);
    },
    onSuccess: () => {
      // re-hit get cart item list api
      queryClient.invalidateQueries("get-cart-item-list");
    },
  });

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "70%",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      {(removeSingleItemFromCartPending || clearCartPending) && (
        <LinearProgress color="success" />
      )}

      <Button
        variant="contained"
        color="error"
        sx={{ textAlign: "right" }}
        onClick={() => {
          clearCart();
        }}
      >
        clear cart
      </Button>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">S.N.</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Image</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Price</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Quantity</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Sub total</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cartData?.map((item, index) => (
            <TableRow
              key={item._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography variant="body1"> {index + 1}</Typography>
              </TableCell>
              <TableCell align="right">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    height: "200px",
                    width: "200px",
                    objectFit: "cover",
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Stack spacing={2} justifyContent="center" alignItems="center">
                  <Typography variant="body1"> {item.name}</Typography>
                  <Chip
                    label={item.brand}
                    color="secondary"
                    variant="outlined"
                    sx={{ fontSize: "1rem" }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">${item.unitPrice}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">{item.orderedQuantity}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">{200}</Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  onClick={() => {
                    removeSingleItemFromCart(item.productId);
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartItemTable;
