const names = ["david", "paul", "richard", "blake", "jason", "chris"];

const lister = (names) => {
	//const list = document.getElementsByTagName('ul');
	//console.log(list);
	const list = document.getElementById('list');
	console.log(list);

	names.forEach((name, index) => {
		var newItem = document.createElement('button');
		newItem.innerHTML= name;
		//newItem.appendChild(document.createTextNode(name));
		//newItem.appendChild(document.createElement('button'));
		list.appendChild(newItem);
	});
}


const del = () => {
	console.log("Just deleting...");
}

const create = () => {
	console.log("Just creating...");
}

lister(names);

