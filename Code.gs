/**
 * some usefule fromts for fiddler
 * this  needs spreadsheet scopes,whereas fiddler is dependency free
 */
function PreFiddler() {

  // track library usage
  Trackmyself.stamp()
  
  const getss = ({ id }) => {
    return id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet()
  }

  // open a sheet
  const getSheet = ({ id, sheetName, createIfMissing = false }) => {

    const ss = getss({ id })
    let sheet = ss.getSheetByName(sheetName)
    if (!sheet && createIfMissing) {
      sheet = ss.insertSheet(sheetName)
    }
    return sheet
  }

  // open a fiddler and assign a sheet
  const getFiddler = ({ id, sheetName, createIfMissing }) => {
    return new bmFiddler.Fiddler(getSheet({ id, sheetName, createIfMissing }))
  }

  return {
    getFiddler,
    getSheet,
    getss,
    Fiddler: bmFiddler.Fiddler
  }

}
