import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "../components/Navbar/index";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  api,
  SCHEDULE_ITEM_KIND_CYCLIC_VALUE,
  SCHEDULE_ITEM_KIND_SINGLE_PRESENCE_VALUE,
  SCHEDULE_ITEM_KIND_SINGLE_ABSENCE_VALUE,
  SCHEDULE_ITEM_KIND_CYCLIC_LABEL,
  SCHEDULE_ITEM_KIND_SINGLE_PRESENCE_LABEL,
  SCHEDULE_ITEM_KIND_SINGLE_ABSENCE_LABEL
} from "../index";
import CrudTable from "../components/CrudTable/CrudTableElements";

const Schedule = () => {
  const [selectedScheduleId, setSelectedScheduleId] = React.useState(null);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const role = localStorage.getItem("role");

  function formatUser(user) {
    if (user) {
      return `${user.firstName} ${user.lastName}`
    }
    return "---";
  }
  function formatTarget(target) {
    if (target) {
      return `${target.name} (${target.location})`
    }
    return "---";
  }
  function formatScheduleItemKind(kind) {
    if (kind == SCHEDULE_ITEM_KIND_CYCLIC_VALUE) return SCHEDULE_ITEM_KIND_CYCLIC_LABEL;
    if (kind == SCHEDULE_ITEM_KIND_SINGLE_PRESENCE_VALUE) return SCHEDULE_ITEM_KIND_SINGLE_PRESENCE_LABEL;
    if (kind == SCHEDULE_ITEM_KIND_SINGLE_ABSENCE_VALUE) return SCHEDULE_ITEM_KIND_SINGLE_ABSENCE_LABEL;
    return "---";
  }
  function parseScheduleItemKind(text) {
    if (text == SCHEDULE_ITEM_KIND_CYCLIC_LABEL) return SCHEDULE_ITEM_KIND_CYCLIC_VALUE;
    if (text == SCHEDULE_ITEM_KIND_SINGLE_PRESENCE_LABEL) return SCHEDULE_ITEM_KIND_SINGLE_PRESENCE_VALUE;
    if (text == SCHEDULE_ITEM_KIND_SINGLE_ABSENCE_LABEL) return SCHEDULE_ITEM_KIND_SINGLE_ABSENCE_VALUE;
    return "---";
  }

  const ScheduleForAdminAndLeader =
    <React.Fragment>
      <Box className="CrudTable">
        <CrudTable addButtonText="Dodaj kalendarz"
          onSelectionModelChange={async (params) => {
            setSelectedScheduleId(params[0]);
            const items = (await api.retrieveSchedule(params[0])).items ?? []
            setSelectedItems(items);
          }}
          rowPreProcessFunction={async () => {
            return {
              leaderUser: await api.retrieveUser(localStorage.getItem("userId")),
              commonUsers: [],
              items: [],
              activities: [],
              target: { id: null },
              targets: await api.retrieveTargets(),
              users: (await api.retrieveUsers()).filter(u => u.role.key === "leader")
            };
          }}
          rowPostProcessFunction={async (row, isNew) => {
          }}
          updateFunction={api.updateSchedule.bind(api)}
          createFunction={api.createSchedule.bind(api)}
          readFunction={React.useCallback(async () => {

            const targets = await api.retrieveTargets();
            const users = (await api.retrieveUsers()).filter(u => u.role.key === "leader");
            const schedules = (await api.retrieveSchedules()).map(u => ({ ...u, targets, users }));
            if (localStorage.getItem("role") == "admin") {
              return schedules;
            }
            return schedules.filter(s => s.leaderUser.id == localStorage.getItem("userId"));
          })}
          rows={[]}
          deleteFunction={api.deleteSchedule.bind(api)}
          columns={
            [
              {
                field: 'leaderUser',
                headerName: "Prowadzący",
                flex: 1,
                type: 'singleSelect',
                editable: true,
                valueGetter: (params) => new Date(params.row.from).toLocaleString("pl-PL"),
                valueOptions: (params) => params.row?.users.map(u => formatUser(u)),
                valueGetter: (params) => formatUser(params.row.leaderUser),
                valueSetter: (params) => ({
                  ...params.row, leaderUser: params.row.users.find(
                    u => formatUser(u) == params.value)
                })
              },
              {
                field: 'target',
                headerName: "Obiekt",
                flex: 1,
                type: 'singleSelect',
                editable: true,
                valueGetter: (params) => new Date(params.row.from).toLocaleString("pl-PL"),
                valueOptions: (params) => params.row?.targets.map(t => formatTarget(t)),
                valueGetter: (params) => formatTarget(params.row.target),
                valueSetter: (params) => ({
                  ...params.row, target: params.row.targets.find(
                    t => formatTarget(t) == params.value)
                })
              }
            ]} />
        <CrudTable addButtonText="Dodaj wpis"
          rowPreProcessFunction={async () => {
            return {
              schedule: { id: selectedScheduleId },
              from: new Date(),
              to: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
              kind: SCHEDULE_ITEM_KIND_CYCLIC_LABEL
            };
          }}
          rowPostProcessFunction={async (row, isNew) => {
          }}
          updateFunction={api.updateScheduleItem.bind(api)}
          createFunction={async (id) => {
            await api.createScheduleItem(id);
            window.location.reload(); // TODO: zmienić na coś lepszego - ale mi też odpowiada ;)
          }}
          readFunction={() => undefined}
          rows={selectedItems}
          deleteFunction={api.deleteScheduleItem.bind(api)}
          columns={
            [
              { 
                field: "from", 
                headerName: "Od", 
                flex: 1, 
                type: "dateTime", 
                editable: true,
                valueGetter: (params) => new Date(params.row.from).toLocaleString("pl-PL")
              },
              { 
                field: "to", 
                headerName: "Do", 
                flex: 1, 
                type: "dateTime", 
                editable: true,
                valueGetter: (params) => new Date(params.row.to).toLocaleString("pl-PL")
              },
              {
                field: 'kind',
                headerName: "Rodzaj",
                flex: 1,
                type: 'singleSelect',
                editable: true,
                valueGetter: (params) => new Date(params.row.from).toLocaleString("pl-PL"),
                valueOptions: (params) => [
                  SCHEDULE_ITEM_KIND_CYCLIC_LABEL,
                  SCHEDULE_ITEM_KIND_SINGLE_ABSENCE_LABEL,
                  SCHEDULE_ITEM_KIND_SINGLE_PRESENCE_LABEL
                ],
                valueGetter: (params) => formatScheduleItemKind(params.row.kind),
                valueSetter: (params) => ({
                  ...params.row, kind: parseScheduleItemKind(params.value)
                })
              }
            ]}>
        </CrudTable>
      </Box>;
    </React.Fragment>;
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
          <CalendarMonthIcon className="circle-icon" />
        </div>
        <Typography variant="h5" component="h5" color="white">
          W tym panelu możesz przejrzeć kalendarze
        </Typography>
        <Typography variant="h5" component="h5" color="white">
          oraz dodać nowe dla prowadzących
        </Typography>
        <Typography sx={{ marginTop: "50px" }}></Typography>
        {(role == "admin" || role == "leader") && ScheduleForAdminAndLeader}
      </Box>
    </React.Fragment>
  );
};

export default Schedule;
