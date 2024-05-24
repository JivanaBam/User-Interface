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
  Toolbar,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch } from "react-redux";
import { openErrorSnackbar } from "../store/slices/snackbarSlice";

const CartItemTable = ({ cartData }) => {
  const dispatch = useDispatch();
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
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
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
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  // update quantity api hit
  const { isPending: updateQuantityPending, mutate: updateQuantityMutate } =
    useMutation({
      mutationKey: ["update-cart-item-quantity"],
      mutationFn: async (values) => {
        return await $axios.put(
          `/cart/item/update/quantity/${values.productId}`,
          {
            action: values.action,
          }
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries("get-cart-item-list");
      },
      onError: (error) => {
        dispatch(openErrorSnackbar(error?.response?.data?.message));
      },
    });

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "80%",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      {(removeSingleItemFromCartPending ||
        clearCartPending ||
        updateQuantityPending) && <LinearProgress color="success" />}

      <Toolbar>
        <Stack display="flex" flexDirection="row" gap="2rem">
          <Typography
            variant="h5"
            sx={{ marginBottom: "2rem", fontWeight: "bold" }}
          >
            <ShoppingCartOutlinedIcon sx={{ fontSize: "2rem" }} />
            Shopping cart
          </Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ height: "45px" }}
            onClick={() => {
              clearCart();
            }}
          >
            clear cart
          </Button>
        </Stack>
      </Toolbar>

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
            <TableCell align="left">
              <Typography variant="h6">Quantity</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Sub total</Typography>
            </TableCell>
            <TableCell align="left">
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
              <TableCell align="center">
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
              <TableCell align="center">
                <Typography variant="body1">Rs.{item.unitPrice}</Typography>
              </TableCell>
              <TableCell align="center">
                <Stack direction="row" alignItems="center">
                  <IconButton
                    disabled={
                      item.orderedQuantity === 1 || updateQuantityPending
                    }
                    onClick={() => {
                      updateQuantityMutate({
                        productId: item?.productId,
                        action: "dec",
                      });
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="h6">{item.orderedQuantity}</Typography>
                  <IconButton
                    disabled={updateQuantityPending}
                    onClick={() => {
                      updateQuantityMutate({
                        productId: item?.productId,
                        action: "inc",
                      });
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">Rs {item?.subTotal}</Typography>
              </TableCell>
              <TableCell align="left">
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
