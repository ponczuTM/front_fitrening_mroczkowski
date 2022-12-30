import React from "react";
import { Box, Typography, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from '@mui/icons-material/Business';
import { api } from "../index";
import CrudTable from "../components/CrudTable/CrudTableElements";
import Navbar from "../components/Navbar";

const Department = () => {
    return (
        <React.Fragment>
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
        <Link to="/">
          <HomeIcon sx={{ color: "#3471eb", fontSize: 50, marginTop: 10 }} />
        </Link>
        <Typography sx={{ marginTop: "30px" }}></Typography>
        <hr width="17%" color="3471eb"></hr>
        <Typography sx={{ marginTop: "30px" }}></Typography>
        <div className="circle">
                <BusinessIcon className="circle-icon" />
                </div>
                <Typography variant="h5" component="h5" color="white">
                W tym panelu możesz przejrzeć listę instytucji
                </Typography>
                <Typography variant="h5" component="h5" color="white">
                i dodać nowe instytucje pozycje
                </Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Box className="CrudTable">
                    <CrudTable addButtonText="Dodaj instytucję"
                        rowPreProcessFunction={async () => {
                            return {
                                name: "",
                                location: "",
                                managerFirstName: localStorage.getItem("userFirstName"),
                                managerLastName: localStorage.getItem("userLastName"),
                                managerEmail: localStorage.getItem("username")
                            };
                        }}
                        rowPostProcessFunction={async (row, isNew) => {
                        }}
                        updateFunction={api.updateDepartment.bind(api)}
                        createFunction={api.createDepartment.bind(api)}
                        readFunction={React.useCallback(async () => {
                            return await api.retrieveDepartments();
                        })}
                        rows={[]}
                        deleteFunction={api.deleteDepartment.bind(api)}
                        columns={
                            [
                                { field: 'name', headerName: 'Nazwa', flex: 1, type: 'string', editable: true },
                                { field: 'location', headerName: 'Adres', flex: 1, type: 'string', editable: true },
                                { field: 'managerFirstName', headerName: 'Imię admina', flex: 1, type: 'string', editable: true },
                                { field: 'managerLastName', headerName: 'Nazwisko admina', flex: 1, type: 'string', editable: true },
                                { field: 'managerEmail', headerName: 'E-Mail admina', flex: 1, type: 'string', editable: true }
                            ]} />
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default Department;
