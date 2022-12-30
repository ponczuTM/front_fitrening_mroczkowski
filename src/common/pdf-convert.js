import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { amiriFont } from "./amiri-font";

export default class PdfConvert {
    constructor() {
        this.doc = new jsPDF();
        this.doc.addFileToVFS("Amiri-Regular.ttf", amiriFont);
        this.doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
        this.doc.setFont("Amiri");
        }

    saveReport(filename, headers, rows) {
        this.doc.autoTable({
            head: [headers],
            body: rows.map(row => Object.values(row)),
            styles: {
                font: 'Amiri',
                fontStyle: 'normal',
            }
        });
        this.doc.save(filename);
    }

    saveComponent(filename, componentId) {
        const input = document.getElementById(componentId);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save(filename);
            });
    }
}
