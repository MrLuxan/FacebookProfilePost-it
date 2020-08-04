import { UiElement } from "./UiElement";
import { DataStore } from "./DataStore"
import { SettingsEl } from "./Settings"

declare var chrome: any;

export class Note extends UiElement {

	UserName : string;

	ProfilePostit : HTMLTextAreaElement = null;
	EditButton : HTMLElement = null;
	SaveButton : HTMLElement = null;
	SettingsButton : HTMLElement = null;

	Unlock()
	{
		this.ProfilePostit.removeAttribute("readonly");
		this.EditButton.style.display = "none";
		this.SaveButton.style.display = "inline";
	}

	Save()
	{
		let note = this.ProfilePostit.value;
		DataStore.DS.SaveUserNote(this.UserName,note,(saveOK : boolean) => {
			this.ProfilePostit.setAttribute("readonly","true");
			this.EditButton.style.display = "inline";
			this.SaveButton.style.display = "none";
		});
	}

	ShowSettings()
	{
		DataStore.DS.LoadSettings((settings :{ [Settings: string]: any; }) =>{
			new SettingsEl(settings)
		});
	}

    constructor(userName : string, isNewLayout : boolean)
    {
		super();
	
		this.UserName = userName;

		DataStore.DS.LoadUserNote(userName, (note : string)=>{

			let noteHtml : string = "";

			if(isNewLayout)
			{
				noteHtml = `[NewNote.html]`;
			}
			else
			{
				noteHtml = `[OldNote.html]`;	
			}

			this.DomElement = this.htmlToElement(noteHtml);
			
			this.ProfilePostit = this.DomElement.querySelector('#ProfilePostit');
			this.EditButton = this.DomElement.querySelector('#EditButton');
			this.SaveButton = this.DomElement.querySelector('#SaveButton');
			this.SettingsButton = this.DomElement.querySelector('#SettingsButton');

			this.ProfilePostit.addEventListener('dblclick', (e:Event) => this.Unlock());
			this.EditButton.addEventListener("click", (e:Event) => this.Unlock());
			this.SaveButton.addEventListener("click", (e:Event) => this.Save());
			this.SettingsButton.addEventListener("click", (e:Event) => this.ShowSettings());
		
		});
	}
}