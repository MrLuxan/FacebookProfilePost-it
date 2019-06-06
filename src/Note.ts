import { UiElement } from "./UiElement";
declare var chrome: any;

export class Note extends UiElement {

	ProfilePostit : HTMLElement = null;
	EditSaveButton : HTMLElement = null;
	SettingsButton : HTMLElement = null;

	unlock()
	{
		this.ProfilePostit.removeAttribute("readonly");
		this.EditSaveButton.textContent = "Save";

		//this.EditSaveButton.removeEventListener("click", unlock);
		//this.EditSaveButton.addEventListener("click", save );
	}

	ShowSettings()
	{
	}

    constructor(usernote : string)
    {
		super();
	
		let html : string =
		`<div id="profile_timeline_intro_card" data-referrer="profile_timeline_intro_card">
   <li class="fbTimelineTwoColumn fbTimelineUnit clearfix" data-type="r">
      <div class="_4-u2 _4-u8" id="u_0_1t">
         <div class="clearfix _3-8t _2pi4 _46yc">
				 <div title="Settings" id="SettingsButton" style="float:right;cursor:pointer;margin-right:10px;"><img src="` +chrome.runtime.getURL("images/settings.png")+`"></div>
				 <div style="width: 24px;height: 24px;border-radius: 12px;background-color:#3b5998;color:#FFF;text-align: center;float:left;transform: rotate(45deg);font-size: 18px;">&#9999;</div>
            <div class="clearfix _8u _42ef">
               <span class="_65tx rfloat _ohf"></span>
               <div class="_6a _3-99">
                  <div class="_6a _6b" style="height:24px"></div>
                  <div class="_6a _6b"><span role="heading" aria-level="3" class="_2iel _5kx5">Intro</span></div>
               </div>
            </div>
         </div>
         <div id="intro_container_id">
            <div class="_3-8t">
               <div class="_3c-4 _2x70 __2p _2ph- _52jv">
							 	<textarea readonly="true" id="ProfilePostit" style="resize:vertical;height:78px;padding:5px;width:calc(100% - 12px);">${usernote}</textarea>
							 	<span id="SavedNotification" style="float:left;color:#9197a3;font-size: 11px;opacity:0;">Saved</span>
							 	<span id="EditSaveButton" style="float:right;margin-right:5px;color:#9197a3;font-size: 11px; cursor:pointer"> Edit </span><hr style="clear: both;visibility: hidden;margin-right: 5px;">
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
		this.EditSaveButton = this.DomElement.querySelector('#EditSaveButton');
		this.SettingsButton = this.DomElement.querySelector('#SettingsButton');

		//this.ProfilePostit.addEventListener("dblclick", this.unlock );
		//this.EditSaveButton.addEventListener("click", this.unlock );
		//this.SettingsButton.addEventListener("click", this.ShowSettings);
	}
}