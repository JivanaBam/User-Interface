import React from "react";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  Button,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { Formik } from "formik";
import { registerValidationSchema } from "../validationSchema/register.validation.schema";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation } from "@tanstack/react-query";
import $axios from "../axios/axios.instance";

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // hit register api
  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (values) => {
      console.log(values);
      return await $axios.post("/user/register", values);
    },
    onSuccess: (res) => {
      navigate("/login");
    },
    onError: (error) => {
      console.log(error.response.data.message);
    },
  });

  return (
    <Box>
      <>
        {isPending && <LinearProgress color="success" />}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "",
            gender: "",
          }}
          validationSchema={registerValidationSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {({ handleSubmit, getFieldProps, touched, errors }) => {
            return (
              <form
                onSubmit={handleSubmit}
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
                <Typography variant="h4">Sign up</Typography>
                <FormControl>
                  <TextField
                    label="First name"
                    {...getFieldProps("firstName")}
                    required
                  />
                  {touched.firstName && errors.firstName ? (
                    <FormHelperText error>{errors.firstName}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    label="Last name"
                    {...getFieldProps("lastName")}
                    required
                  />
                  {touched.lastName && errors.lastName ? (
                    <FormHelperText error>{errors.lastName}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    label="Email"
                    {...getFieldProps("email")}
                    required
                  />
                  {touched.email && errors.email ? (
                    <FormHelperText error>{errors.email}</FormHelperText>
                  ) : null}
                </FormControl>

                {/* <FormControl>
                <TextField
                  label="Password"
                  {...getFieldProps("password")}
                  required
                />
                {touched.password && errors.password ? (
                  <FormHelperText error>{errors.password}</FormHelperText>
                ) : null}
              </FormControl> */}

                <FormControl variant="outlined">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    {...getFieldProps("password")}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {touched.password && errors.password ? (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select label="Role" {...getFieldProps("role")}>
                    <MenuItem value="buyer">Buyer</MenuItem>
                    <MenuItem value="seller">Seller</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                  {touched.role && errors.role ? (
                    <FormHelperText error>{errors.role}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select label="Gender" {...getFieldProps("gender")}>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="preferNotToSay">Other</MenuItem>
                  </Select>
                  {touched.gender && errors.gender ? (
                    <FormHelperText error>{errors.gender}</FormHelperText>
                  ) : null}
                </FormControl>

                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{ mt: "1rem" }}
                >
                  Register
                </Button>

                <Link to="/login">Already registered? Login</Link>
              </form>
            );
          }}
        </Formik>
      </>
    </Box>
  );
};

export default Register;
