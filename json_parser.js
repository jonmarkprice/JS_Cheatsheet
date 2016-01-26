

// Some example JSON 
/*
{"objects": [
	{
		"name": "",
		"properties": "[...]",
	  	"methods": "[...]"
	}
]}
//*/


function sendAjax() {
  var req = new XMLHttpRequest();
  req.open('GET', 'test_data.json', true);
  req.setRequestHeader('Content-type', 'application/json')
  req.onload = function() {
    var text = req.responseText;
    return parseAjax(text);
  };
  req.send();
}

//TODO maybe move to module later
function parseAjax(jsonText) {
  console.log('parsing json');
  var jsonObj = JSON.parse(jsonText);
  if (Array.isArray(jsonObj)) {
    window.alert('is array');
  }
  else {
    window.alert('not array');
  }
}

sendAjax();
