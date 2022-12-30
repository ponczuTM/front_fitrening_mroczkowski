import React from "react";
import ReportItem from "../components/ReportItem";
import Navbar from "../components/Navbar/index.js";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import opera from "../images/opera.png";
import chrome from "../images/chrome.png";
import edge from "../images/edge.png";
import gx from "../images/gx.png";

export default function Report() {
    return (
        <>
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
          <FormatListNumberedIcon className="circle-icon" />
        </div>
        <Typography variant="h5" component="h5" color="white">
          W tym panelu możesz przejrzeć i wygenerować raporty
        </Typography>
        </Box>
        <center>
            <Box>
                <ReportItem 
                    title="Prowadzący z największą ilością osób na zajęciach" 
                    query={`
                    SELECT firstName AS "Imię", lastName AS "Nazwisko", SUM(N) AS "Liczba osób"
                    FROM
                    (
                        SELECT firstName, lastName, COUNT(a.userId) AS N
                        FROM user u
                        INNER JOIN role r ON r.id = u.roleId
                        INNER JOIN schedule s ON s.leaderUserId = u.id
                        INNER JOIN activity a ON a.scheduleId = s.id
                        WHERE r.key = 'leader'
                        AND u.departmentId = ${localStorage.getItem("departmentId")}
                        GROUP BY a.userId, firstName, lastName
                    )
                    GROUP BY firstName, lastName
                    ORDER BY 3 DESC
                    `} />
                <ReportItem 
                    title="Lista wszystkich osób biorących udział w projekcie" 
                    query={`
                    SELECT firstName AS "Imię", lastName AS "Nazwisko", email AS "E-Mail", r.name AS "Rola"
                    FROM user u
                    INNER JOIN role r ON r.id = u.roleId
                    AND u.departmentId = ${localStorage.getItem("departmentId")}
                    ORDER BY lastName, firstName
                    `} />
                <ReportItem 
                    title="Najbardziej aktywne osoby w projekcie" 
                    query={`
                    SELECT firstName AS "Imię", lastName AS "Nazwisko", COUNT(*) AS "Liczba zajęć"
                    FROM user u
                    INNER JOIN role r ON r.id = u.roleId
                    INNER JOIN activity a ON a.userId = u.id
                    WHERE r.key = 'common'
                    AND u.departmentId = ${localStorage.getItem("departmentId")}
                    GROUP BY a.userId, firstName, lastName
                    ORDER BY COUNT(*) DESC
                    `} />
                <ReportItem 
                    title="Najbardziej aktywne osoby z ostatniego miesiąca" 
                    query={`
                    SELECT firstName AS "Imię", lastName AS "Nazwisko", COUNT(*) AS "Liczba zajęć"
                    FROM user u
                    INNER JOIN role r ON r.id = u.roleId
                    INNER JOIN activity a ON a.userId = u.id
                    WHERE r.key = 'common'
                    AND strftime('%Y-%m', a.moment) = strftime('%Y-%m', CURRENT_DATE)
                    AND u.departmentId = ${localStorage.getItem("departmentId")}
                    GROUP BY a.userId, firstName, lastName
                    ORDER BY COUNT(*) DESC
                    `} />
                <ReportItem 
                    title="Najchętniej wybierani prowadzący" 
                    query={`
                    SELECT firstName AS "Imię", lastName AS "Nazwisko", COUNT(a.userId) AS "Liczba osób"
                    FROM user u
                    INNER JOIN role r ON r.id = u.roleId
                    INNER JOIN schedule s ON s.leaderUserId = u.id
                    LEFT OUTER JOIN activity a ON a.scheduleId = s.id
                    WHERE r.key = 'leader'
                    AND u.departmentId = ${localStorage.getItem("departmentId")}
                    GROUP BY a.userId, firstName, lastName
                    ORDER BY COUNT(a.userId) DESC
                    `} />
                <ReportItem 
                    title="Najchętniej wybierane obiekty" 
                    query={`
                    SELECT t.name AS "Nazwa", t.location AS "Obiekt", COUNT(*) AS "Liczba odwiedzin"
                    FROM target t
                    INNER JOIN schedule s ON s.targetId = t.id
                    INNER JOIN activity a ON a.scheduleId = s.id
                    INNER JOIN user u ON u.id = a.userId
                    WHERE u.departmentId = ${localStorage.getItem("departmentId")}
                    GROUP BY t.name, t.location
                    ORDER BY COUNT(*) DESC;
                    `} />
                
                <ReportItem 
                    title="Ilość kobiet i mężczyzn uczęszczających do prowadzących" 
                    query={`
                    SELECT "Imię", "Nazwisko", "Kiedy" || ':00' AS "Kiedy", SUM("Liczba mężczyzn") AS "Mężczyźni", SUM("Liczba kobiet") AS "Kobiety", SUM("Liczba innych") AS "Inni"
                    FROM
                    (
                        SELECT firstName AS "Imię", lastName AS "Nazwisko", strftime('%Y-%m-%d %H', a.moment) AS "Kiedy", 0 AS "Liczba mężczyzn", COUNT(a.userId) AS "Liczba kobiet", 0 AS "Liczba innych"
                        FROM user u
                        INNER JOIN role r ON r.id = u.roleId
                        INNER JOIN schedule s ON s.leaderUserId = u.id
                        INNER JOIN sex sx ON sx.id = u.sexId
                        LEFT OUTER JOIN activity a ON a.scheduleId = s.id
                        WHERE r.key = 'leader'
                        AND u.departmentId = ${localStorage.getItem("departmentId")}
                        AND sx.id = 1
                        GROUP BY a.userId, strftime('%Y-%m-%d %H', a.moment), firstName, lastName
                        UNION ALL
                        SELECT firstName AS "Imię", lastName AS "Nazwisko", strftime('%Y-%m-%d %H', a.moment) AS "Kiedy", COUNT(*) AS "Liczba mężczyzn", 0 AS "Liczba kobiet", 0 AS "Liczba innych"
                        FROM user u
                        INNER JOIN role r ON r.id = u.roleId
                        INNER JOIN schedule s ON s.leaderUserId = u.id
                        INNER JOIN sex sx ON sx.id = u.sexId
                        LEFT OUTER JOIN activity a ON a.scheduleId = s.id
                        WHERE r.key = 'leader'
                        AND u.departmentId = ${localStorage.getItem("departmentId")}
                        AND sx.id = 2
                        GROUP BY a.userId, strftime('%Y-%m-%d %H', a.moment), firstName, lastName
                        UNION ALL
                        SELECT firstName AS "Imię", lastName AS "Nazwisko", strftime('%Y-%m-%d %H', a.moment) AS "Kiedy", 0 AS "Liczba mężczyzn", 0 AS "Liczba kobiet", COUNT(*) AS "Liczba innych"
                        FROM user u
                        INNER JOIN role r ON r.id = u.roleId
                        INNER JOIN schedule s ON s.leaderUserId = u.id
                        INNER JOIN sex sx ON sx.id = u.sexId
                        LEFT OUTER JOIN activity a ON a.scheduleId = s.id
                        WHERE r.key = 'leader'
                        AND u.departmentId = ${localStorage.getItem("departmentId")}
                        AND sx.id = 3
                        GROUP BY a.userId, strftime('%Y-%m-%d %H', a.moment), firstName, lastName
                    )
                    WHERE "Kiedy" IS NOT NULL
                    GROUP BY "Imię", "Nazwisko", "Kiedy"
                    ORDER BY "Nazwisko", "Imię", "Kiedy"
                    `} />
                <ReportItem 
                    title="Osoby, które nie uczęszczały na zajęcia w ciągu 2 ostatnich tygodni" 
                    query={`
                    SELECT firstName AS "Imię", lastName AS "Nazwisko", email AS "E-Mail"
                    FROM user u
                    INNER JOIN role r ON r.id = u.roleId
                    WHERE r.key = 'common'
                    AND u.id NOT IN
                    (
                        SELECT u.id
                        FROM user u
                        INNER JOIN role r ON r.id = u.roleId
                        INNER JOIN activity a ON a.userId = u.id
                        WHERE r.key = 'common'
                        AND a.moment >= DATE(CURRENT_DATE, '-14 days')
                        AND a.moment <= CURRENT_DATE
                        AND u.departmentId = ${localStorage.getItem("departmentId")}
                    )
                    `} />
                <ReportItem 
                    title="Osoby, które trenują średnio częściej niż 2 razy w tygodniu" 
                    query={`
                    SELECT firstName AS "Imię", lastName AS "Nazwisko", (COUNT(*) / ABS((JULIANDAY(CURRENT_TIME) - JULIANDAY(u.createdAt)))) * 7 AS "Liczba zajęć na tydzień"
                    FROM user u
                    INNER JOIN role r ON r.id = u.roleId
                    INNER JOIN activity a ON a.userId = u.id
                    WHERE r.key = 'common'
                    AND u.departmentId = ${localStorage.getItem("departmentId")}
                    GROUP BY a.userId, firstName, lastName
                    HAVING  (COUNT(*) / ABS((JULIANDAY(CURRENT_TIME) - JULIANDAY(u.createdAt)))) * 7 >= 2
                    ORDER BY COUNT(*) DESC
                    `} />
            </Box>
            </center>
        </>
    );
}
