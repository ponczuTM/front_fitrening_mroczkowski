import React, { useEffect, useState } from "react";
import { Alert, Box, Button, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "../components/Navbar/index";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { api } from "../index";
import CrudTable from "../components/CrudTable/CrudTableElements";
import { useForm } from "react-hook-form";

const List = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [invalidData, setInvalidData] = useState(false);
  const [schedules, setSchedules] = useState([]);  
  const [scheduleItems, setScheduleItems] = useState([]);
  const [activities, setActivities] = useState([]);
  const schedule = watch("schedule");

  const fetchSchedules = async () => {
    const schedules = await api.retrieveSchedules();
    setSchedules(schedules);
  };

  const fetchScheduleItems = async (scheduleId) => {
    const scheduleItems = await api.generateSchedule(scheduleId);
    const twoWeeksBefore = new Date();
    twoWeeksBefore.setDate(twoWeeksBefore.getDate() - 14);
    setScheduleItems(scheduleItems.filter((item) => new Date(item.from) >= twoWeeksBefore));
  };

  const fetchActivities = async () => {
    const activities = (await api.retrieveActivities()).filter(
      activity => activity.user.id == localStorage.getItem("userId"));
    setActivities(activities);
  };

  useEffect(() => {
    fetchActivities();
    fetchSchedules();
  }, []);

  useEffect(() => {
    fetchScheduleItems(schedule?.id);
  }, [schedule]);

  const onSubmit = async (data) => {
    try {
      await api.createActivity({
        moment: data.item.from,
        schedule: { id: data.schedule.id },
        user: { id: localStorage.getItem("userId") }
      });
      setInvalidData(false);
      await fetchActivities();
    } catch (e) {
      setInvalidData(true);
    }
  };

  function formatSchedule(schedule) {
    if (schedule) {
      return `${schedule.leaderUser.firstName} ${schedule.leaderUser.lastName} (${schedule.target.name})`;
    }
    return "---";
  }
  function formatMoment(moment) {
    return moment.replace("T", " ").replace(":00.000Z", "");
  }

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
      <Typography sx={{ marginTop: "150px" }}></Typography>
        <Link to="/">
          <HomeIcon sx={{ color: "#3471eb", fontSize: 50}} />
        </Link>
        <Typography sx={{ marginTop: "30px" }}></Typography>
        <hr width="17%" color="3471eb"></hr>
        <Typography sx={{ marginTop: "30px" }}></Typography>
        <div className="circle">
          <CalendarMonthIcon className="circle-icon" />
        </div>
        <Typography variant="h5" component="h5" color="white">
          W tym panelu możesz przejrzeć kalendarz zajęć,
        </Typography>
        <Typography variant="h5" component="h5" color="white">
          na które uczęszczałeś(aś).
        </Typography>
        <Typography sx={{ marginTop: "30px" }}></Typography>

        <FormControl
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          noValidate
          className="Form"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            minWidth: { md: 400, xs: 350 },
          }}
        >
        </FormControl>

        <Box className="CrudTable">
          <CrudTable
            rows={activities}
            rowPreProcessFunction={() => {}}
            rowPostProcessFunction={async (row, isNew) => {}}
            updateFunction={api.updateActivity.bind(api)}
            createFunction={api.createActivity.bind(api)}
            readFunction={() => undefined}
            deleteFunction={api.deleteActivity.bind(api)}
            columns={
              [
                {
                  field: 'moment',
                  headerName: 'Data i godzina',
                  flex: 1,
                  valueGetter: (params) => formatMoment(params.row.moment)
                },
                {
                  field: 'schedule',
                  headerName: "Prowadzący i obiekt",
                  flex: 1,
                  valueGetter: (params) => formatSchedule(params.row.schedule)
                }
              ]} />
        </Box>
        
      </Box>
    </React.Fragment>
  );
};

export default List;
