'use strict';

var file = 'data.json';
document.getElementById('status').textContent = 'Reading "' + file + '".';
sendAjax(file);

//------------

function sendAjax(jsonFile) {
  var req = new XMLHttpRequest();
  req.open('GET', jsonFile, true);
  req.setRequestHeader('Content-type', 'application/json');
  req.onload = function() {
    var text = req.responseText;
    return parseAjax(text);
  };
  req.send();
}

//TODO maybe move to module later
function parseAjax(jsonText) {
  console.log('parsing json');
  var jsonObj,
      domObj,
      main;
  jsonObj = JSON.parse(jsonText);
  domObj = parseValue(jsonObj);
  
  // add everything to the document
  main = document.getElementById('generated-content');
  main.appendChild(domObj);
}

function parseValue(jsonValue) {
  var node;
  switch (typeof jsonValue) {
    case 'object':
      node = parseObj(jsonValue);
      break;
    //TODO: are there others ???
    case 'string': 
    case 'number':
    case 'boolean':
      console.log('default case');
      node = createPrimitive(jsonValue);
      break;
    default:
      //TODO: handle undefined, etc.
  }
  return node;
}

// TODO (mb.) integrate into parseValue
function parseObj(jsonValue) {
  var node;
  if (Array.isArray(jsonValue)) {
    //console.log('is array');
    node = createList(jsonValue);
  }
  // in JS, null is an object
  else if (jsonValue === null) {
    node = createPrimitive(null); //or use 'null'
  }
  else {
    console.log('not array');
    node = createPropertyList(jsonValue);
  }
  return node;
}

// trying a marked up list
function createPropertyList(jsonObj) {
  var prop,
      list,
      pair,
      keyField,
      valueField,
      value;
  list = document.createElement('ul');
  for (prop in jsonObj) {
    pair = document.createElement('li');
    pair.classList.add('key-value_pair')
    
    keyField = document.createElement('span');
    keyField.classList.add('key');
    keyField.textContent = prop;
    pair.appendChild(keyField);
    
    valueField = document.createElement('span');
    valueField.classList.add('value');
    value = parseValue(jsonObj[prop]);
    valueField.appendChild(value);
    pair.appendChild(valueField);
    
    list.appendChild(pair);
  }
  return list;
}

function createList(jsonArray) {
  var list,
      i,
      value,
      node,
      valueSpan;
  list = document.createElement('ol');
  for (i = 0; i < jsonArray.length; i++) {
    node = parseValue(jsonArray[i]);
    
    valueSpan = document.createElement('span');
    valueSpan.classList.add('list_item');
    valueSpan.appendChild(node)
    
    value = document.createElement('li');
    value.appendChild(valueSpan);
    list.appendChild(value);
  }
  return list;
}

function createPrimitive(primitive) {
  // massively simplified
  return document.createTextNode(primitive);
}
