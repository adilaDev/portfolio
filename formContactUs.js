function doGet(e) {
  // return HtmlService.createTemplateFromFile('index').evaluate();
  // var action = e.parameter.action;
  // if (action == 'getData') {
  //   return getData();
  // } else if(action == 'doPost'){
  //   return doPost();
  // } else {
  //   return ContentService.createTextOutput(JSON.stringify({ result: "Aplikasi web untuk handle form contact us", action: action, get_data: getData(), post_data: doPost(), log: e }))
  //   .setMimeType(ContentService.MimeType.JSON);
  // }

  try {
    var action = e.parameter.action;

    // Jika tidak ada action yang diberikan, tampilkan pesan default
    if (!action) {
      return ContentService.createTextOutput(JSON.stringify({
          result: "Aplikasi web untuk handle form contact us",
          availableActions: Object.keys(this).filter(key => typeof this[key] === 'function' && key !== 'doGet' && key !== 'doPost')
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Cek apakah fungsi dengan nama 'action' ada di dalam objek 'this'
    if (typeof this[action] === 'function') {
      // Panggil fungsi berdasarkan action
      return this[action](e);
    } else {
      // Jika action tidak valid, berikan pesan error
      return ContentService.createTextOutput(JSON.stringify({ 
        error: "Action tidak valid!", 
        availableActions: Object.keys(this).filter(key => typeof this[key] === 'function' && key !== 'doGet' && key !== 'doPost') })
      ).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
        status: "Terjadi error yang tidak terduga", 
        error: error.message 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
function getData(){
  var spreadSheetId = "1DJP6YSVGBx77IDF5zzVuR8jq4XOUOtnMoCbxP3jNpkA";
  var sheetName     = "Sheet1";

  var sheet = SpreadsheetApp.openById(spreadSheetId).getSheetByName(sheetName);
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  
  // var jsonData = [];
  // for (var i = 0; i < data.length; i++) {
  //   jsonData.push({
  //     name: data[i][0],
  //     phone: data[i][1],
  //     email: data[i][2],
  //     message: data[i][3],
  //     created_date: data[i][4]
  //   });
  // }
  var jsonData = data.map(function(row) {
    return {
      name: row[0],
      phone: row[1],
      email: row[2],
      message: row[3],
      created_date: row[4]
    };
  });

  // console.log("data: ", data.length, data);
  console.log("jsonData: ", jsonData.length, jsonData);

  const output =  ContentService.createTextOutput(JSON.stringify({ data: jsonData })).setMimeType(ContentService.MimeType.JSON);
  return output;
  // return jsonData;
  // return HtmlService.createTemplateFromFile('index').evaluate();
}

function doPost(e) {
  var sheet = SpreadsheetApp.openById('1DJP6YSVGBx77IDF5zzVuR8jq4XOUOtnMoCbxP3jNpkA').getActiveSheet();
  if(e != undefined){
    var name = e.parameter.name;
    var phone = e.parameter.phone;
    var email = e.parameter.email;
    var message = e.parameter.message;

    // Masukkan data ke dalam spreadsheet
    // sheet.appendRow([name, phone, email, message, new Date()]);
    sheet.appendRow([name, phone, email, message, new Date(), JSON.stringify(e.parameter)]);

    // Response untuk mengkonfirmasi pengiriman sukses
    // return ContentService.createTextOutput(JSON.stringify({ result: "Data submitted successfully", data: [name, phone, email, message, new Date()] })).setMimeType(ContentService.MimeType.JSON);
    var output = {};
    output.data = [name, phone, email, message, new Date()];
    output.parameter = e.parameter;
    output.exec = e;

    // return ContentService.createTextOutput(JSON.stringify({ 
    //   result: true,
    //   ok: true,
    //   status: 200,
    //   statusText: "Data submitted successfully" // Set statusText menjadi string kosong
    // })).setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

function writeMultipleRows() {
  var data = getMultipleRowsData();
  console.log("data: ", data)
  for(var i = 0; i < data.length; i++) {
    SpreadsheetApp.getActiveSheet().appendRow(data[i]);
  }
}

function getMultipleRowsData() {
 var data = [];
 for(var i =0; i < 10; i++) {
   data.push([Math.random(), Math.random(), Math.random(), Math.random()]);
 }
 return data;
}
