/**
 * some usefule fromts for fiddler
 * this  needs spreadsheet scopes,whereas fiddler is dependency free
 */
function PreFiddler() {

  const trackingOptions = {
    name: 'bmPreFiddler',
    version: '5',
    userStore: PropertiesService.getUserProperties(),
    scriptStore: PropertiesService.getScriptProperties()
  }
  bmLibraryTracking.Track.stamp(trackingOptions)

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
    getss
  }

}

const trackreport = () => {
  const track = bmLibraryTracking.Track
  const trackingOptions = {
    name: 'bmPreFiddler',
    version: '5',
    userStore: PropertiesService.getUserProperties(),
    scriptStore: PropertiesService.getScriptProperties()
  }
  console.log(track.userReport(trackingOptions))
  console.log(track.scriptReport(trackingOptions))
}