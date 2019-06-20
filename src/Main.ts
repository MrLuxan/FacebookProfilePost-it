import { Note } from "./Note";

let LastURL : string = "";
let LastName : string = "";

let observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		var new_url = document.location.toString();
		if(LastURL != new_url)
		{
			let urlBrakeDown = new_url.match(/https?\:\/\/(?:www\.)?facebook\.com\/(\d+|[A-Za-z0-9\.]+)\/?/);
		
			if(urlBrakeDown.length >= 2)
			{
				let username = urlBrakeDown[1];

				let list = document.querySelector('#timeline_small_column');
				if(username != LastName && list != null)
				{
					LastName = username;
					LastURL = new_url;

					let newNote = new Note(username);
				}
			}
		}

	});    
});

// Notify me of everything!
let observerConfig = {
	attributes: true, 
	childList: true, 
	characterData: true 
};
 
let targetNode = document.body;
observer.observe(targetNode, observerConfig);



// DataStore.LoadSettings();
// DataStore.SaveSettings();
// DataStore.LoadUserNote("User");
// DataStore.SaveUserNote("USer","note")
