import React, { useEffect, useState } from "react";
import { Alert, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "../components/Navbar/index";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { api } from "../index";
import { HttpError } from "../common/http-error";
import CrudTable from "../components/CrudTable/CrudTableElements";
import { MD5 } from "crypto-js";

const User = () => {
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
          <AccountCircleIcon className="circle-icon" />
        </div>
        <Typography variant="h5" component="h5" color="white">
          W tym panelu możesz zarządzać uczestnikami.
        </Typography>
        <Typography variant="h5" component="h5" color="white">
          Masz możliwość dodania nowego oraz modyfikację i usunięcie istniejącego
        </Typography>
        <Typography sx={{ marginTop: "50px" }}></Typography>
        <Box className="CrudTable">
          <CrudTable addButtonText="Dodaj użytkownika"
            rows={[]}
            rowPreProcessFunction={async () => {
              return {
                lastName: "",
                firstName: "",
                email: "",
                passwordHash: "",
                department: { id: localStorage.getItem("departmentId") },
                role: (await api.retrieveRoles())[0],
                sex: (await api.retrieveSexes())[0],
                roles: await api.retrieveRoles(),
                sexes: await api.retrieveSexes()
              };
            }}
            rowPostProcessFunction={async (row, isNew) => {
              if (isNew) {
                row.passwordHash = MD5(row.passwordHash).toString();
              }
            }}
            updateFunction={api.updateUser.bind(api)}
            createFunction={api.createUser.bind(api)}
            readFunction={React.useCallback(async () => {
              const roles = await api.retrieveRoles();
              const sexes = await api.retrieveSexes();
              return (await api.retrieveUsers())
                .filter(u => u.department.id == localStorage.getItem("departmentId"))
                .map(u => ({ ...u, roles, sexes }));
            })}
            deleteFunction={api.deleteUser.bind(api)}
            columns={
              [
                { field: 'lastName', headerName: 'Nazwisko', flex: 1, type: 'string', editable: true },
                { field: 'firstName', headerName: 'Imię', flex: 1, type: 'string', editable: true },
                { field: 'email', headerName: 'E-Mail', flex: 1, type: 'string', editable: true },
                { field: 'passwordHash', headerName: 'Hasło', flex: 1, type: 'string', editable: true },
                {
                  field: 'role',
                  headerName: "Rola",
                  flex: 1,
                  type: 'singleSelect',
                  editable: true,
                  valueOptions: (params) => params.row?.roles.map(r => r.name),
                  valueGetter: (params) => params.row.role.name,
                  valueSetter: (params) => ({ ...params.row, role: params.row.roles.find(r => r.name == params.value) })
                },
                {
                  field: 'sex',
                  headerName: "Płeć",
                  flex: 1,
                  type: 'singleSelect',
                  editable: true,
                  valueOptions: (params) => params.row?.sexes.map(s => s.name),
                  valueGetter: (params) => params.row.sex.name,
                  valueSetter: (params) => ({ ...params.row, sex: params.row.sexes.find(s => s.name == params.value) })
                }
              ]} />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default User;
