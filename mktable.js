'use strict';
let tables = test.objects;
for (let table of tables) {
	create_table(table);
}

function create_table(obj) {
	let table = document.createElement('table');

	create_table_heading(table);
	
	let rows = table.methods;
	
	for (......)
}

/*
rather than iterating thru every level
e.g. body -> table -> tbody -> tr -> td/th -> ??
we could just create a general HTML parser, and use style sheets for styling

alternatively, I could make each field interactive (how?) 
and then just use the DOM tree, writing the entire thing
out when down with outerHTML()

OK, how would we make elements editable in the DOM?
a general purpose "edit" pane... for textConent
for tables a "new row" and "new column"
*/