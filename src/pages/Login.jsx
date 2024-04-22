import {
  Box,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  Button,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import React from "react";
import { Formik } from "formik";
import { loginValidationSchema } from "../validationSchema/login.validation.schema";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import $axios from "../axios/axios.instance";

const Login = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (values) => {
      console.log(values);
      return await $axios.post("/user/login", values);
    },

    onSuccess: (res) => {
      navigate("/home");

      // extract token, role, firstName from login respponse
      const accessToken = res?.data?.Token;
      const role = res?.data?.userDetails?.role;
      const firstName = res?.data?.userDetails?.firstName;

      // set these values to local storage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", role);
      localStorage.setItem("firstName", firstName);
    },
    onError: (error) => {
      console.log(error.response.data.message);
    },
  });

  // if (isPending) {
  //   <CircularProgress />;
  // }

  return (
    <Box>
      <>
        {isPending && <LinearProgress color="success" />}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => {
            mutate(values);
            console.log(values);
          }}
        >
          {(formik) => {
            return (
              <form
                onSubmit={formik.handleSubmit}
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  padding: "1rem",
                  gap: "1rem",
                  width: "400px",
                }}
              >
                <Typography variant="h4">Sign in</Typography>
                <FormControl>
                  <TextField
                    label="Email"
                    {...formik.getFieldProps("email")}
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    label="Password"
                    {...formik.getFieldProps("password")}
                    required
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <FormHelperText error>
                      {formik.errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={isPending}
                >
                  Login
                </Button>

                <Link to="/register">New here? Register</Link>
              </form>
            );
          }}
        </Formik>
      </>
    </Box>
  );
};

export default Login;
