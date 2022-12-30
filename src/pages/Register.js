import React, { useState } from "react";
import { TextField, Box, Button, Typography, FormControl, Alert, Menu, Select, MenuItem } from "@mui/material";
import { api } from "../index";
import { useForm } from "react-hook-form";
import MD5 from "crypto-js/md5";
import { HttpError } from "../common/http-error";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, Navigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [error, setError] = useState(false);
    const onSubmit = async (data) => {
        try {
            const department = await api.createDepartment({ ...data });
            await api.createUser({
                role: {id: 1},
                department: { id: department.id },
                email: data.managerEmail,
                passwordHash: MD5(data.password).toString(),
                firstName: data.managerFirstName,
                lastName: data.managerLastName,
                sex: { id: data.managerSex }
            });
            setError({});
            setRedirectToLogin(true);
        } catch (e) {
            if (e instanceof HttpError) {
                setError(await e.response.json());
            } else {
                throw e;
            }
        }
    };
    return (
        <React.Fragment>
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
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Link to="/">
                    <HomeIcon sx={{ color: "#3471eb", fontSize: 50 }} />
                </Link>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <hr width="17%" color="3471eb"></hr>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <div className="circle">
                    <LockOpenIcon className="circle-icon" />
                </div>

                <Typography variant="h5" component="h5" color="white">
                    Rejestracja
                </Typography>
                { error.message && <Alert sx={{maxWidth: 500}} severity="error">Nie można zarejestrować podanego 
                użytkownika. Upewnij się, że podałeś(aś) poprawne informacje oraz, że konto nie 
                zostało utworzone już wcześniej. Komunikat błędu: {error.message}</Alert>}
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
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    <p>Imię</p>
                    <TextField {...register("managerFirstName", { required: true })} size="small" id="outlined-login" variant="outlined" inputProps={{ style: { textAlign: 'center', color: 'white'} }} sx={{ "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb"}, },}} />
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    {errors.managerFirstName && <Alert severity="error">Pole wymagane!</Alert>}
                    <p>Nazwisko</p>
                    <TextField {...register("managerLastName", { required: true })} size="small" id="outlined-password" 
                    variant="outlined" inputProps={{ style: { textAlign: 'center', color: 'white' } }} 
                    sx={{ "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb" }, }, border: '10'}} />
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    {errors.managerLastName && <Alert severity="error">Pole wymagane!</Alert>}
                    <p>Płeć</p>
                    <Select {...register("managerSex", { required: true })} size="small" id="outlined-password" 
                    variant="outlined" inputProps={{ style: { textAlign: 'center', color: 'white' } }} 
                    sx={{ "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb" }, }, width:"220px", backgroundColor: '#6b6b6b',}}>
                        <MenuItem value={1}>Mężczyzna</MenuItem>
                        <MenuItem value={2}>Kobieta</MenuItem>
                        <MenuItem value={3}>Inna</MenuItem>
                    </Select>
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    {errors.managerSex && <Alert severity="error">Pole wymagane!</Alert>}
                    <p>Nazwa obiektu</p>
                    <TextField {...register("name", { required: true })} size="small" id="outlined-login" variant="outlined" inputProps={{ style: { textAlign: 'center', color: 'white' } }} sx={{ "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb" }, }, }} />
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    {errors.name && <Alert severity="error">Pole wymagane!</Alert>}
                    <p>Adres obiektu</p>
                    <TextField {...register("location", { required: true })} size="small" id="outlined-password" variant="outlined" inputProps={{ style: { textAlign: 'center', color: 'white' } }} sx={{ "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb" }, }, }} />
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    {errors.location && <Alert severity="error">Pole wymagane!</Alert>}
                    <p>Adres e-mail</p>
                    <TextField {...register("managerEmail", { required: true })} size="small" id="outlined-login" variant="outlined" inputProps={{ style: { textAlign: 'center', color: 'white' } }} sx={{ "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb" }, }, }} />
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    {errors.managerEmail && <Alert severity="error">Pole wymagane!</Alert>}
                    <p>Hasło</p>
                    <TextField {...register("password", { required: true })} type="password" size="small" id="outlined-password" variant="outlined" inputProps={{ style: { textAlign: 'center', color: 'white' } }} sx={{ "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb" }, }, }} />
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    {errors.password && <Alert severity="error">Pole wymagane!</Alert>}
                    <Button type="submit" className="submit_button" sx={{ color: '#ffffff' }}>Zarejestruj</Button>
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
                    <Link to="/login">Masz już konto? Zaloguj się!</Link>
                </Box>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
            </Box>
            {redirectToLogin && <Navigate to="/login" state={{
                isJustRegistered: true
            }} />}
        </React.Fragment>
    );
};

export default Register;
