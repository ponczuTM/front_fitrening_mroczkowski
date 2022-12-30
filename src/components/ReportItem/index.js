import { Close as CloseIcon, GridOn, PictureAsPdf, PlayCircleFilled } from "@mui/icons-material";
import {
    Button, Card, CardActions, CardContent, Divider, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from "@mui/material";
import React from "react";
import PdfConvert from "../../common/pdf-convert";
import XlsxConvert from "../../common/xlsx-convert";
import { api } from "../../index";

export default function ReportItem({ title, description, query }) {
    const [headers, setHeaders] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    async function generate(isUiMode = true) {
        const rows = await api.executeQuery(query);
        if (!rows) {
            rows = [
                { "": "Brak danych" }
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
        const result = await generate(false);
        const pdf = new PdfConvert();
        pdf.saveReport("report.pdf", result.headers, result.rows);
    }

    async function onExportToXlsx() {
        const result = await generate(false);
        const xlsx = new XlsxConvert();
        xlsx.save("report.xlsx", result.headers, result.rows);
    }

    async function onHide() {
        setHeaders([]);
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
                    <GridOn /><Button onClick={onExportToXlsx} size="small">Eksportuj do XLSX</Button>
                    <PictureAsPdf /><Button onClick={onExportToPdf} size="small">Eksportuj do PDF</Button>
                </CardActions>
                <Divider />
            </Card>
            {rows.length > 0 ? <CloseIcon sx={{ color: "white", float: "right", cursor: "pointer" }} onClick={onHide} /> : null}
            <TableContainer sx={{ marginBottom: "2em" }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (<TableCell sx={{ fontWeight: "bold" }}>{header}</TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {Object.keys(row).map((key) => (
                                    <TableCell component="th" scope="row">{row[key]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
