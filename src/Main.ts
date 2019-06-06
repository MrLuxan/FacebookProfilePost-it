import { Note } from "./Note";

let lastName = "";

let observer = new MutationObserver(function(mutations) {
	// For the sake of...observation...let's output the mutation to console to see how this all works
	mutations.forEach(function(mutation) {
		console.log(mutation.type);


		var new_url = document.location.toString();
		let url = new_url;
		let urlBrakeDown = url.match(/https?\:\/\/(?:www\.)?facebook\.com\/(\d+|[A-Za-z0-9\.]+)\/?/);
		let username = urlBrakeDown[1];

		let note : string = "";

		let newNote = new Note(note);

		var list = document.querySelector('#timeline_small_column');
		list.insertBefore(newNote.DomElement, list.childNodes[0]);


	});    
});
 
// Notify me of everything!
let observerConfig = {
	attributes: true, 
	childList: true, 
	characterData: true 
};
 
// Node, config
// In this case we'll listen to all changes to body and child nodes
let targetNode = document.body;
observer.observe(targetNode, observerConfig);
