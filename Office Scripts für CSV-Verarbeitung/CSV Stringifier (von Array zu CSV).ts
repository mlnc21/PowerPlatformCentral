function main(workbook: ExcelScript.Workbook, jsonString: string) {
    // Überprüfen ob der JSON-String definiert ist
    if (jsonString === undefined) {
        throw new Error("Der JSON-String ist nicht definiert.");
    }
    // Konvertiere JSON-String in ein JavaScript-Objekt
    let data: { [key: string]: string }[] = JSON.parse(jsonString);
    // Variable für den CSV-String
    let csv = '';
    // Fügen die Kopfzeile zum CSV-String hinzu
    for (let key in data[0]) {
        csv += key + ',';
    }
    // Entferne das letzte Komma und füge eine neue Zeile hinzu
    csv = csv.slice(0, -1) + '\n';
    // Füge die Datenzeilen zum CSV-String hinzu
    for (let i = 0; i < data.length; i++) {
        for (let key in data[i]) {
            csv += data[i][key] + ',';
        }
        // Entferne as letzte Komma und füge eine neue Zeile hinzu
        csv = csv.slice(0, -1) + '\n';
    }
    return csv;
}
