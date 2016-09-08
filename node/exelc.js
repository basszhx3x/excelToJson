var xlsx = require("node-xlsx");
var list = xlsx.parse("./stages_cr.xlsx");
var outPutPath= "/tmp/my.json"
var fs = require('fs');
var path = require('path');
//console.log(list);
function fetchListContent(argument) {
	// body...
	for (var j = 0; j < list.length; j++) {
		var object = argument[j];
		var objectName = "cr_test";
		if (j == 1) {
			objectName = "cr_release"
		}
		var datatestTmp = object['data'];
		parseObjectToJson(datatestTmp,j,objectName);
	}
}
fetchListContent(list);

function parseObjectToJson(datatest,index,fileName) {

	var stylename = datatest[1][0];
	var stylecode = datatest[1][1];
	var nextstylename = datatest[1][2];
	var nextstylecode = datatest[1][3];

	var array = new Array();
	var objectKey;
	var objectResult = new Object();
	for (var i = 2; i < datatest.length; i++) {
		var objectTmp = new Object();
		objectTmp[stylename] = datatest[i][0];
		if (objectTmp[stylename] == null || objectTmp[stylename] == undefined || objectTmp[stylename] == '') {
			continue;
		}
		objectTmp[stylecode] = datatest[i][1];
		objectTmp[nextstylename] = datatest[i][2];
		objectTmp[nextstylecode] = datatest[i][3].toString();

		if (objectKey == null || objectKey == undefined || objectKey == '') {
			objectKey = "a" + objectTmp[stylecode];
		}
		if (objectKey == "a" + objectTmp[stylecode]) {
			array.push(objectTmp);
		}
		else {
			objectResult[objectKey] = array;
			objectKey = "a" + objectTmp[stylecode];
			array = new Array();
			array.push(objectTmp);
		}
	}
	objectResult[objectKey] = array;

	var stringJson = JSON.stringify(objectResult, null, 4);
	var filePath = path.join(__dirname, "./json");
	if (fs.existsSync(filePath)) {
		console.log("目录一存在");
	} else {
		fs.mkdirSync(filePath);
	}
	var dest_file = path.resolve(filePath, fileName + ".json");
	//console.log(stringJson);
	fs.writeFile(dest_file, stringJson, function (err) {
        if (err) {
          console.log("error：", err);
          throw err;
        }
        console.log('exported successfully  -->  ', path.basename(dest_file));
      });
}
