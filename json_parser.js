'use strict';
//file = 'data.json'; //default data
var loadButton = document.getElementById('load_button'),
    filename = 'data/alg_topics.json',
    editing = false,
    editButton = document.getElementById('edit_button');
    
sendAjax(filename);

editButton.onclick = function() {
  editing = !editing;
  
  //convert false to 0, true to 1, access appropriate button label
  var labels = ['Edit', 'Cancel Editing'];
  editButton.textContent = labels[Number(editing)];
  
  // need to reload DOM to append buttons at approaprate spots
  sendAjax(filename)
}

loadButton.onclick = function() {
  var file_input = document.getElementById('file_input'), //const
      status = document.getElementById('status');
  if (file_input.value !== '') {
    filename = file_input.value;
    status.textContent = 'Reading "' + filename + '".';
  }
  else {
    status.textContent =  'No value given, using default value: "' + 
      filename + '".';
  }
  sendAjax(filename);
}

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
  main.innerHTML = '';
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
  
  // enable / disable editing
  if (editing) {
    list.appendChild(createAdder(list));
  }
  return list;
}

function createPrimitive(primitive) {
  // massively simplified
  return document.createTextNode(primitive);
}

// New Stuff ///////////////////////////////////////////////////////////
function createAdder(node) {
  var button,
      listItem;
  button = document.createElement('span');
  button.textContent = '+';
  button.classList.add('button'); //TODO
  button.onclick = function(event) { 
    createAddField(node, event.target);
  };
  listItem = document.createElement('li');
  listItem.appendChild(button);
  return listItem;
}

function createAddField(node, button) {
  var entryField,
      addButton;
  button.style.display = 'none';
    
  entryField = document.createElement('input');
  entryField.type = 'text';
  node.insertBefore(entryField, node.lastChild);
  
  addButton = document.createElement('button');
  addButton.textContent = '+';
  addButton.onclick = function(){ 
    //window.alert('!');
    button.style.display = 'initial';
    entryField.style.display = 'none';
    addButton.style.display = 'none';
    
    var newElem,
        newLi;
    newElem = document.createElement('span')
    newElem.textContent = entryField.value;
    newLi = document.createElement('li');
    newLi.appendChild(newElem);
    node.insertBefore(newLi, node.lastChild);
    
  }; //TODO
  node.insertBefore(addButton, node.lastChild);
}

