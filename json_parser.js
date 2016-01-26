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
  domObj = parseItem(jsonObj);
  
  // add everything to the document
  main = document.getElementById('generated-content');
  main.appendChild(domObj);
}

function parseItem(jsonItem) {
  var node;
  switch (typeof jsonItem) {
    case 'object':
      node = parseObj(jsonItem);
      break;
    //TODO: are there others ???
    case 'string': 
    case 'number':
    case 'boolean':
    default:
      //TODO: handle undefined, etc.
      console.log('default case');
      node = createPrimitive(jsonItem);
  }
  return node;
}

// TODO refactor and rename to createObj
function parseObj(jsonObj) {
  var node;
  if (Array.isArray(jsonObj)) {
    console.log('is array');
    node = createList(jsonObj);
  }
  else {
    console.log('not array');
    node = document.createElement('pre');
    node.textContent = 'TODO';
  }
  return node;
}

// merge with createList, rename to that
function createList(jsonArray) {
  var list,
      i,
      item,
      node;
  list = document.createElement('ul');
  for (i = 0; i < jsonArray.length; i++) {
    node = parseItem(jsonArray[i]);
    item = document.createElement('li');
    item.appendChild(node)
    list.appendChild(item);
  }
  return list;
}

function createPrimitive(primitive) {
  var elem;
  
  // We don't really need this to be an element, at present. However,
  // it will help later with styling, and simplies the parseAjax 
  // function, since we don't have to worry about whether each "item"
  // is a DOM Element, or just a Node.
  // I don't think you can call appendChild on just a string...
  elem = document.createElement('span');
  elem.textContent = primitive; 
  return elem;
}

sendAjax();




