import React, { useEffect, useState } from "react";
import { Alert, Box, Button, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "../components/Navbar/index";
import { api } from "../index";
import { useForm } from "react-hook-form";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function refreshPage() {
  window.location.reload(false);
}

const Activity = () => {
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
    if (schedule) {
      fetchScheduleItems(schedule.id);
    }
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
    return new Date(moment).toLocaleString("pl-PL");
  }

  function applySchedule(params) {
    const activity = { ...params.row };
    activity.schedule = params.row.schedules.find(s => formatSchedule(s) == params.value);
    return activity;
  }
  function applyMoment(params) {
    const activity = { ...params.row };
    activity.moment = params.value;
    return activity;
  }
  async function generateScheduleMoments(params) {
    const moments = (await api.generateSchedule(params.row.schedule.id)).map(m => new Date(m.from));
    return moments;
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
      <Typography sx={{ marginTop: "150px" }}></Typography>  <Link to="/">
          <HomeIcon sx={{ color: "#3471eb", fontSize: 50}} />
        </Link>
        <Typography sx={{ marginTop: "30px" }}></Typography>
        <hr width="17%" color="3471eb"></hr>
        <Typography sx={{ marginTop: "30px" }}></Typography>
        <div className="circle">
          <CheckCircleIcon className="circle-icon" />
        </div>
        <Typography variant="h5" component="h5" color="white">
          W tym panelu dodać zajęcia,
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
          {invalidData && (
            <Alert severity="error">Nieprawidłowe lub niekompletne dane!</Alert>
          )}
          <Typography sx={{ marginTop: "30px" }}></Typography>
          {errors.moment && <Alert severity="error">Pole wymagane!</Alert>}
          <p style={{ color: '#333' }}>Prowadzący i obiekt:</p>
          <Select {...register("schedule", { required: true })}
            size="small"
            variant="outlined"
            inputProps={{ style: { textAlign: 'center', color: 'white' } }}
            sx={{ margin:'10px', "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb" }, }, minWidth:"150px" }}
          >
            {schedules.map((schedule) => <MenuItem value={schedule}>{formatSchedule(schedule)}</MenuItem>)}

          </Select>
          <Typography sx={{ marginTop: "30px" }}></Typography>
          <p style={{ color: '#333', margin:'10px'}}>Data i godzina:</p>
          <Select
            {...register("item", { required: true })}
            size="small"
            variant="outlined"
            width="100px"
            inputProps={{ style: { textAlign: 'center', color: 'white' } }}
            sx={{ "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#3471eb" }, }, minWidth:"150px" }}
          >
            {scheduleItems.map((item) => <MenuItem value={item}>{formatMoment(item.from)}</MenuItem>)}
          </Select>
          {errors.schedule && <Alert severity="error">Pole wymagane!</Alert>}
          <Typography sx={{ marginTop: "50px" }}></Typography>
          <Button
            type="submit"
            className="submit_button"
            sx={{ color: "#ffffff" }}
            onClick={refreshPage}
          >
            Dodaj Zajęcia
          </Button>
          <Typography sx={{ marginTop: "50px" }}></Typography>
        </FormControl>
      </Box>
        <Typography sx={{ marginTop: "120px" }}></Typography>
    </React.Fragment>
  );
};

export default Activity;
