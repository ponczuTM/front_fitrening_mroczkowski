import React from "react";
import { Box, Typography, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
const Purchase = () => {
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
                <hr width="20%" color="3471eb"></hr>
                
                <div className="circle">
                    <PaidIcon className="circle-icon" />
                </div>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography variant="h5" component="h5" color="white">
                    Jak dokonać zakupu aplikacji
                </Typography>
                <FormControl
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
                    <div className="centered_div">
                        <p>
                            Aby dokonać zakupu aplikacji należy skontaktować się
                            bezpośrednio z Właścicielem Aplikacji za pomocą
                            dolonej formy kontaktu znajdującej się na dole
                            strony głównej aplikacji. Niniejsza aplikacja może
                            być zrealizowana w formie umowy-zlecenie
                        </p>
                        <Link to="/">Powrót na stronę główną</Link>
                    </div>
                </FormControl>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
            </Box>
        </React.Fragment>
    );
};

export default Purchase;
