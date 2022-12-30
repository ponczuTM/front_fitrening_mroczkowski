import React, { useState } from "react";
import { TextField, Box, Button, Typography, FormControl, Alert, } from "@mui/material";
import { api } from "../index";
import { useForm } from "react-hook-form";
import MD5 from "crypto-js/md5";
import { HttpError } from "../common/http-error";
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "../components/Navbar/index";
import SnackBarSuccess from "../components/SnackBar/SnackBarSuccess";

export default function ChangePassword() {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const [isChanged, setIsChanged] = useState(false);
      const [invalidCredentials, setInvalidCredentials] = useState(false);
      
      const onSubmit = async (data) => {
        const email = localStorage.getItem("username");
        const oldPasswordHash = MD5(data.oldPassword).toString();
        const newPasswordHash = MD5(data.newPassword).toString();
        try {
            setInvalidCredentials(false);
            setIsChanged(false);
            await api.changePassword(localStorage.getItem("userId"), oldPasswordHash, newPasswordHash);
            api.http.applyCredentials(email, newPasswordHash);
            setIsChanged(true);
            setValue("oldPassword", "");
            setValue("newPassword", "");
        } catch (e) {
          if (e instanceof HttpError) {
            setInvalidCredentials(true);
          } else {
            throw e;
          }
        }
      };
    return (
        <>
            {isChanged && <SnackBarSuccess message="Hasło zmieniono poprawnie!" />}
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
                    <ChangeCircleOutlinedIcon className="circle-icon" />
                </div>
                <Typography variant="h5" component="h5" color="white">
                    Zmień hasło
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
                        <Alert severity="error">Nieprawidłowe stare hasło!</Alert>
                    )}
                    <p style={{ color: 'white' }}>Stare hasło</p>
                    <TextField
                        {...register("oldPassword", { required: true })}
                        type="password"
                        size="small"
                        id="outlined-password"
                        variant="outlined"
                        inputProps={{ style: { textAlign: 'center', color: 'white' } }}
                        sx={{ "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb" }, }, }}
                    />
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    {errors.oldPassword && <Alert severity="error">Pole wymagane!</Alert>}
                    <p style={{ color: 'white' }}>Nowe hasło</p>
                    <TextField {...register("newPassword", { required: true })}
                        type="password"
                        size="small"
                        id="outlined-password"
                        variant="outlined"
                        inputProps={{ style: { textAlign: 'center', color: 'white' } }}
                        sx={{ "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb" }, }, }}
                    />
                    {errors.newPassword && <Alert severity="error">Pole wymagane!</Alert>}
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    <Button
                        type="submit"
                        className="submit_button"
                        sx={{ color: "#ffffff" }}
                    >
                        Zmień hasło
                    </Button>
                </FormControl>
            </Box>
        </>
    );
}
