import { UiElement } from "./UiElement";
declare var chrome: any;

export class Card extends UiElement {

	unlock()
	{
		document.getElementById('ProfilePostit').removeAttribute("readonly");
		document.getElementById('EditSaveButton').textContent = "Save";

		document.getElementById("EditSaveButton").removeEventListener("click", unlock);
		document.getElementById('EditSaveButton').addEventListener("click", save );
	}

	ShowSettings()
	{
	}

	GetNoteElement(usernote : string)
	{
		var cheatspan = document.createElement("span");
		cheatspan.innerHTML = '<li style="margin-bottom:17px;border: 1px solid #d3d6db;border-radius: 3px;background:#fff;">\
							<div class="clearfix _3-8t _2pi4">\
								<div style="width: 24px;height: 24px;border-radius: 12px;background-color:#3b5998;color:#FFF;text-align: center;float:left;transform: rotate(45deg);font-size: 18px;">&#9999;</div>\
								<div class="_8u _42ef">\
									<div class="_6a _3-99">\
										<div class="_6a _6b" style="height:24px"></div>\
										<div class="_6a _6b">\
											<span class="_50f5 _5kx5">Note</span>\
										</div>\
									</div>\
									<div title="Settings" id="SettingsButton" style="float:right;cursor:pointer;"><img src="'+chrome.extension.getURL("images/settings.png")+'"></div>\
								</div>\
							</div>\
						<div style="margin: 0px 3px">\
							<textarea readonly="true" id="ProfilePostit" style="resize:vertical;height:78px;padding:5px;width:calc(100% - 12px);">'+usernote+'</textarea>\
							<span id="SavedNotification" style="float:left;color:#9197a3;font-size: 11px;opacity:0;">Saved</span>\
							<span id="EditSaveButton" style="float:right;margin-right:5px;color:#9197a3;font-size: 11px; cursor:pointer"> Edit </span><hr style="clear: both;visibility: hidden;margin-right: 5px;">\
						</div>\
						</li>';

		var list = document.querySelector('._2t4v.clearfix');
		list.insertBefore(cheatspan.firstChild, list.childNodes[0]);

		document.getElementById('ProfilePostit').addEventListener("dblclick", this.unlock );
		document.getElementById('EditSaveButton').addEventListener("click", this.unlock );
		document.getElementById('SettingsButton').addEventListener("click", this.ShowSettings);
	}
}