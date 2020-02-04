import { UiElement } from "./UiElement";
import { DataStore } from "./DataStore"
import { SettingsEl } from "./SettingsEl"

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
		new SettingsEl();

		//todo
	}

    constructor(userName : string)
    {
		super();
	
		this.UserName = userName;

		DataStore.DS.LoadUserNote(userName, (note : string)=>{
		let html : string =
		`<div>
			<li class="fbTimelineTwoColumn fbTimelineUnit clearfix">
				<div class="_4-u2 _4-u8">
					<div class="clearfix _3-8t _2pi4 _46yc">
							<div title="Settings" id="SettingsButton" style="float:right;cursor:pointer;margin-right:10px;"><img style="width:16px;height:16px;" src="` +chrome.runtime.getURL("images/cog.svg")+`"></div>
							<div style="width: 24px;height: 24px;border-radius: 12px;background-color:#3b5998;color:#FFF;text-align: center;float:left;font-size: 18px;">&#9998;</div>
						<div class="clearfix _8u _42ef">
						<span class="_65tx rfloat _ohf"></span>
						<div class="_6a _3-99">
							<div class="_6a _6b" style="height:24px"></div>
							<div class="_6a _6b"><span role="heading" aria-level="3" class="_2iel _5kx5">Note</span></div>
						</div>
						</div>
					</div>
					<div id="intro_container_id">
						<div class="_3-8t">
						<div class="_3c-4 _2x70 __2p _2ph- _52jv">
											<textarea readonly="true" id="ProfilePostit" style="resize:vertical;height:78px;padding:5px;width:calc(100% - 12px);">${note}</textarea>
											<span id="SavedNotification" style="float:left;color:#9197a3;font-size: 11px;opacity:0;">Saved</span>
											<span id="EditButton" style="float:right;margin-right:5px;color:#9197a3;font-size: 11px; cursor:pointer"> Edit </span>
											<span id="SaveButton" style="float:right;margin-right:5px;color:#9197a3;font-size: 11px; cursor:pointer;display:none"> Save </span>
											<hr style="clear: both;visibility: hidden;margin-right: 5px;">
						</div>
						</div>
						<div class="_3-8t">
						<div id="owned_pages_container_id"></div>
						</div>
					</div>
				</div>
			</li>
		</div>`;

		this.DomElement = this.htmlToElement(html);

		this.ProfilePostit = this.DomElement.querySelector('#ProfilePostit');
		this.EditButton = this.DomElement.querySelector('#EditButton');
		this.SaveButton = this.DomElement.querySelector('#SaveButton');
		this.SettingsButton = this.DomElement.querySelector('#SettingsButton');
		
		this.ProfilePostit.addEventListener('dblclick', (e:Event) => this.Unlock());
		this.EditButton.addEventListener("click", (e:Event) => this.Unlock());
		this.SaveButton.addEventListener("click", (e:Event) => this.Save());
		this.SettingsButton.addEventListener("click", (e:Event) => this.ShowSettings());


		let list = document.querySelector('#timeline_small_column');
		list.insertBefore(this.DomElement, list.childNodes[0]);

		});
	}
}