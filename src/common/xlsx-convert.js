import * as XLSX from 'xlsx/xlsx.mjs';

export default class XlsxConvert {
    constructor() {
        this.workbook = XLSX.utils.book_new();
    }

    save(filename, headers, rows) {
        const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
        XLSX.utils.book_append_sheet(this.workbook, worksheet, "Arkusz 1");
        XLSX.writeFile(this.workbook, filename);
    }
}
