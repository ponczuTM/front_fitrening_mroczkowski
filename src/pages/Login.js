import React, { useState } from "react";
import { TextField, Box, Button, Typography, FormControl, Alert, } from "@mui/material";
import { api } from "../index";
import { useForm } from "react-hook-form";
import MD5 from "crypto-js/md5";
import { HttpError } from "../common/http-error";
import LockIcon from "@mui/icons-material/Lock";
import { Link, Navigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "../components/Navbar/index";
import SnackBarSuccess from "../components/SnackBar/SnackBarSuccess";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { state } = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const onSubmit = async (data) => {
    const passwordHash = MD5(data.password).toString();
    api.http.applyCredentials(data.email, passwordHash);
    localStorage.clear();
    try {
      const user = await api.tryLogin(data.email, passwordHash);
      setInvalidCredentials(false);
      setLoggedIn(true);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("username", data.email);
      localStorage.setItem("departmentId", user.department.id);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userFirstName", user.firstName);
      localStorage.setItem("userLastName", user.lastName);
      localStorage.setItem("passwordHash", passwordHash);
      localStorage.setItem("role", user.role.key);
    } catch (e) {
      console.log(e);
      if (e instanceof HttpError) {
        setInvalidCredentials(true);
      } else {
        throw e;
      }
    }
  };
  const isJustLoggedIn = false;
  return (
    <React.Fragment>
      {state && state.isJustRegistered && <SnackBarSuccess message="Zarejestrowano poprawnie! Możesz teraz zalogować się do aplikacji." />}
      <Navbar />
      <Box
        component="div"
        noValidate
        sx={{
          display: "flex",
          minHeight: "90vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ marginTop: "90px" }}></Typography>
        <Link to="/">
          <HomeIcon sx={{ color: "#3471eb", fontSize: 50 }} />
        </Link>
        <Typography sx={{ marginTop: "30px" }}></Typography>
        <hr width="17%" color="3471eb"></hr>
        <Typography sx={{ marginTop: "30px" }}></Typography>
        <div className="circle">
          <LockIcon className="circle-icon" />
        </div>
        <Typography variant="h5" component="h5" color="white">
          Zaloguj się
        </Typography>
        <Typography sx={{ marginTop: "30px" }}></Typography>
        <FormControl
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          noValidate
          className="form-login"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            minWidth: { md: 400, xs: 350 },
          }}
        >
          {invalidCredentials && (
            <Alert severity="error">Nieprawidłowe dane logowania!</Alert>
          )}
          <p style={{ color: 'white' }}>Adres e-mail</p>
          <TextField
            {...register("email", { required: true })}
            size="small"
            id="outlined-password"
            variant="outlined"
            inputProps={{ style: { textAlign: 'center', color: 'white' } }}
            sx={{ "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb" }, }, }}
          />
          <Typography sx={{ marginTop: "30px" }}></Typography>
          {errors.email && <Alert severity="error">Pole wymagane!</Alert>}
          <p style={{ color: 'white' }}>Hasło</p>
          <TextField {...register("password", { required: true })}
            type="password"
            size="small"
            id="outlined-password"
            variant="outlined"
            inputProps={{ style: { textAlign: 'center', color: 'white' } }}
            sx={{ "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb" }, }, }}
          />
          {errors.password && <Alert severity="error">Pole wymagane!</Alert>}
          <Typography sx={{ marginTop: "30px" }}></Typography>
          <Button
            type="submit"
            className="submit_button"
            sx={{ color: "#ffffff" }}
          >
            Zaloguj
          </Button>
        </FormControl>
        <Box
          component="div"
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "row",
            gap: "10pt",
            justifyContent: "space-between",
          }}
        >
          <Link to="/register" style={{ color: 'white' }}>Nie masz konta? Zapisz się</Link>
        </Box>
        <p style={{ color: 'white' }}>możliwość rejestracji dostępna tylko dla organizatora</p>
        {loggedIn && <Navigate to="/" state={{
              isJustLoggedIn: true
          }}/>}
      </Box>
    </React.Fragment>
  );
};

export default Login;