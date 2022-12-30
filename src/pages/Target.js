import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "../components/Navbar/index";
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { api } from "../index";
import CrudTable from "../components/CrudTable/CrudTableElements";

const Target = () => {
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
          <HolidayVillageIcon className="circle-icon" />
        </div>
        <Typography variant="h5" component="h5" color="white">
          W tym panelu możesz przejrzeć listę objektów
        </Typography>
        <Typography variant="h5" component="h5" color="white">
          i dodać nowe pozycje
        </Typography>
        <Typography sx={{ marginTop: "30px" }}></Typography>
        <Box className="CrudTable">
          <CrudTable addButtonText="Dodaj obiekt"
            rows={[]}
            rowPreProcessFunction={async () => {
              return {
                name: "",
                location: "",
                department: { id: localStorage.getItem("departmentId") }
              };
            }}
            rowPostProcessFunction={async (row, isNew) => {
            }}
            updateFunction={api.updateTarget.bind(api)}
            createFunction={api.createTarget.bind(api)}
            readFunction={React.useCallback(async () => {
              const roles = await api.retrieveRoles();
              const sexes = await api.retrieveSexes();
              return (await api.retrieveTargets())
                .filter(t => t.department.id == localStorage.getItem("departmentId"))
                .map(u => ({ ...u, roles, sexes }))
            })}
            deleteFunction={async (id) => {
              await api.deleteTarget(id);
            }}
            columns={
              [
                { field: 'name', headerName: 'Nazwa', flex: 1, type: 'string', editable: true },
                { field: 'location', headerName: 'Adres', flex: 1, type: 'string', editable: true }
              ]} />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Target;
