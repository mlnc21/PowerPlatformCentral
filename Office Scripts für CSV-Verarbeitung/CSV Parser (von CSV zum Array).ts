function main(workbook: ExcelScript.Workbook, csv: string) {
  if (csv === undefined) {
    throw new Error("Die CSV-Daten sind nicht definiert.");
  }
  let arr: { [key: string]: string }[] = [];
  let headers: string[] = [];
  let insideQuote = false;
  let r = 0;
  let c = 0;
  for (let i = 0; i < csv.length; i++) {
    let cChr = csv[i];
    let nChr = csv[i + 1];
    if (arr[r] === undefined) {
      arr[r] = {};
    }
    if (headers[c] === undefined) {
      headers[c] = '';
    }
    if (r === 0) {
      headers[c] += cChr;
    } else {
      if (arr[r][headers[c]] === undefined) {
        arr[r][headers[c]] = '';
      }
      arr[r][headers[c]] += cChr;
    }
    if (cChr === '\"') {
      insideQuote = !insideQuote;
    }
    if (cChr === ',' && !insideQuote) {
      c++;
    }
    if (cChr === '\n' && !insideQuote) {
      r++;
      c = 0;
    }
  }
  // Entferne die Kopfzeile aus dem Array
  arr.shift();
  // Entferne Leerzeichen, Zeilenumbrüche und Kommas am Anfang und Ende jedes Wertes
  for (let i = 0; i < arr.length; i++) {
    for (let key in arr[i]) {
      let newKey = key.trim().replace(/^,|,$|\n$/g, '');
      arr[i][newKey] = arr[i][key].trim().replace(/^,|,$|\n$/g, '');
      if (newKey !== key) {
        delete arr[i][key];
      }
    }
  }
  return JSON.stringify(arr);
}
