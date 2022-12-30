import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "../components/Navbar/index";
import Groups2Icon from '@mui/icons-material/Groups2';
import { api } from "../index";
import CrudTable from "../components/CrudTable/CrudTableElements";

const Role = () => {
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
          <Groups2Icon className="circle-icon" />
        </div>
        <Typography variant="h5" component="h5" color="white">
          W tym panelu możesz przejrzeć listę ról
        </Typography>
        <Typography variant="h5" component="h5" color="white">
          oraz dodać własną
        </Typography>
        <Typography sx={{ marginTop: "30px" }}></Typography>
        <Box className="CrudTable">
          <CrudTable addButtonText="Dodaj rolę"
            rows={[]}
            rowPreProcessFunction={async () => {
              return {
                name: "",
                key: ""
              };
            }}
            rowPostProcessFunction={async (row, isNew) => {
            }}
            updateFunction={api.updateRole.bind(api)}
            createFunction={api.createRole.bind(api)}
            readFunction={React.useCallback(async () => {
              return await api.retrieveRoles();
            })}
            deleteFunction={api.deleteRole.bind(api)}
            columns={
              [
                { field: 'name', headerName: 'Nazwa', flex: 1, type: 'string', editable: true },
                { field: 'key', headerName: 'Klucz', flex: 1, type: 'string', editable: true }
              ]} />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Role;
