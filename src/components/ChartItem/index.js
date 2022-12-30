import { Close as CloseIcon, PictureAsPdf, PlayCircleFilled } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Divider, Typography} from "@mui/material";
import { Chart } from "react-google-charts";
import React from "react";
import PdfConvert from "../../common/pdf-convert";
import { api } from "../../index";

export default function ChartItem({ title, description, query }) {
    const [headers, setHeaders] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const chartId = `chart-${Math.random().toString(36).substr(2, 9)}`;

    async function generate(isUiMode = true) {
        const rows = await api.executeQuery(query);
        if (!rows) {
            rows = [
                { "": 0 }
            ]
        }
        const headers = Object.keys(rows[0]);
        if (isUiMode) {
            setHeaders(headers);
            setRows(rows);
        } else {
            return {
                headers,
                rows
            }
        }
    }

    async function onClick() {
        await generate();
    }

    async function onExportToPdf() {
        const pdf = new PdfConvert();
        pdf.saveComponent("chart.pdf", chartId);
    }

    async function onHide() {
        setHeaders(["", ""]);
        setRows([]);
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}  >
                <CardContent>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <PlayCircleFilled /><Button onClick={onClick} size="small">Wykonaj</Button>
                    <PictureAsPdf /><Button onClick={onExportToPdf} size="small">Eksportuj do PDF</Button>
                </CardActions>
                <Divider />
            </Card>
            <Typography sx={{ marginTop: "3px" }}></Typography>
            {rows.length > 0 ? <CloseIcon sx={{ color: "black", float: "right", cursor: "pointer" }} onClick={onHide} /> : null}
            
            <div id={chartId} style={{
                width: "40%",
                height: "400px"
            }}>
            <Chart 
                chartType="PieChart"
                data={[ [headers[0], headers[1]], ...rows.map(row => Object.values(row)) ]}
                width="100%"
                height="400px"
            />
            </div>
        </>
    );
}
