import { Note } from "./Note";

let LastURL : string = "";
let LastName : string = "";

let observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		var new_url = document.location.toString();
		if(LastURL != new_url)
		{
			let urlBrakeDown = new_url.match(/https?\:\/\/(?:www\.)?facebook\.com\/(\d+|[A-Za-z0-9\.]+)\/?/);

			if(urlBrakeDown != null)
			{

				if(urlBrakeDown.length >= 2)
				{
					let username = urlBrakeDown[1];

					let newLayoutEl : HTMLElement = document.querySelector('.o387gat7');
					let oldLayoutEl : HTMLElement = document.querySelector('#timeline_small_column');
					
					if(oldLayoutEl != null || newLayoutEl != null)
					{
						let isNewLayout : boolean = newLayoutEl != null;

						if(username != LastName)
						{
							LastName = username;
							LastURL = new_url;

							let newNote = new Note(username,isNewLayout);

							if(isNewLayout)
							{
								let insetInto = newLayoutEl.querySelector('.lpgh02oy') .childNodes[0];
								insetInto.insertBefore(newNote.DomElement, insetInto.childNodes[0]);
							}
							else
							{
								oldLayoutEl.insertBefore(newNote.DomElement, oldLayoutEl.childNodes[0]);
							}
						}
					}

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
