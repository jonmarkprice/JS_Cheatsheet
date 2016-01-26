'use strict';

function sendAjax(root) {
  var req = new XMLHttpRequest();
  req.open('GET', 'test_data.json', true);
  req.setRequestHeader('Content-type', 'application/json');
  req.onload = function() {
    var text = req.responseText;
    return parseAjax(text, root);
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
    node = createDL(jsonValue);
    //node = document.createElement('pre');
    //node.textContent = 'TODO';
  }
  return node;
}

function createDL(jsonObj) {
  var prop,
      dl,
      dt,
      dd,
      value;
  // create description list
  dl = document.createElement('dl');
  
  for (prop in jsonObj) {
    dt = document.createElement('dt');
    dd = document.createElement('dd');
    
    // dt can only be a string
    dt.textContent = prop;
    
    // value could be anything
    value = parseValue(jsonObj[prop]);
    dd.appendChild(value);
    
    dl.appendChild(dt);
    dl.appendChild(dd);
  }
  return dl;
}

function createList(jsonArray) {
  var list,
      i,
      value,
      node;
  list = document.createElement('ul');
  for (i = 0; i < jsonArray.length; i++) {
    node = parseValue(jsonArray[i]);
    value = document.createElement('li');
    value.appendChild(node)
    list.appendChild(value);
  }
  return list;
}

function createPrimitive(primitive) {
  // massively simplified
  return document.createTextNode(primitive);
}

sendAjax();




