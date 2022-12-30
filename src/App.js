import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Statute from "./pages/Statute";
import Department from "./pages/Department";
import Purchase from "./pages/Purchase";
import Activity from "./pages/Activity";
import List from "./pages/List";
import Schedule from "./pages/Schedule";
import Register from "./pages/Register";
import User from "./pages/User";
import Role from "./pages/Role";
import Target from "./pages/Target";
import Sex from "./pages/Sex";
import Report from "./pages/Report";
import Charts from "./pages/Charts";
import ChangePassword from "./pages/ChangePassword";
import React from "react";

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Home/>} />
				<Route exact path="/login" element={<Login/>} />
				<Route exact path="/logout" element={<Logout/>} />
				<Route exact path="/register" element={<Register/>} />
				<Route exact path="/statute" element={<Statute/>} />
				<Route exact path="/department" element={<Department/>} />
				<Route exact path="/purchase" element={<Purchase/>} />
				<Route exact path="/activity" element={<Activity/>} />
				<Route exact path="/list" element={<List/>} />
				<Route exact path="/schedule" element={<Schedule/>} />
				<Route exact path="/user" element={<User/>} />
				<Route exact path="/role" element={<Role/>} />
				<Route exact path="/sex" element={<Sex/>} />
				<Route exact path="/target" element={<Target/>} />
				<Route exact path="/report" element={<Report/>} />
				<Route exact path="/change-password" element={<ChangePassword/>} />
				<Route exact path="/charts" element={<Charts/>} />
			</Routes>
		</Router>
	);
}

export default App;