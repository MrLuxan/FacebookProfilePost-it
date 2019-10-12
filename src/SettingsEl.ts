import { UiElement } from "./UiElement";
import { DataStore } from "./DataStore"

declare var chrome: any;

export class SettingsEl extends UiElement {

    constructor()
    {
		super();

		let html : string = '<div id="PostItSettings" style="position:fixed;top:50px;left:50%;margin-left:-400px;width:820px;z-index:100000;font-size: 16px;">\
							    <div style="width:820px;background:#FFF;border:#e1e2e3 1px solid;font-size: 16px;box-shadow: 2px 2px 5px #aaaaaa;">\
									<div style="width:800px;height:42px;background-color:#3b5998;color:#FFF;line-height: 42px;padding:0 10px;">\
										Profile Post-it Settings<div id="CloseSettingsX" style="float:right;cursor:pointer;">X</div>\
									</div>\
									<div  style="margin:20px;position:relative;">\
										<h1>Schedule backup reminder</h1>\
										<div>\
										      <input type="radio" name="Schedule" value="DontUse" checked="checked"> Don\'t use\
										  <br><input type="radio" name="Schedule" value="NumberDays"> Prompt number of time passed\
										  <br><span style="margin-left: 30px;"><input id="ScheduleMonths" type="number" name="quantity" min="0" value="0" style="margin:5px">Months\
										                              <input id="ScheduleWeeks" type="number" name="quantity" min="0" value="1" style="margin:5px">Weeks\
										                              <input id="ScheduleDays" type="number" name="quantity" min="0" value="0" style="margin:5px">Days</span>\
										  <br><input type="radio" name="Schedule" value="NumberSaves"> Prompt after number of saves\
										  <br><span style="margin-left: 30px;"><input id="ScheduleSaves" type="number" name="quantity" value="1" min="1"></span>\
										  <br><button id="SaveSchedule" style="margin-top:10px;">Save</button>\
										</div>\
										<br><h1>Download backup</h1>\
										<div>\
											<img src="'+chrome.extension.getURL("images/downloadIcon.png")+'" style="margin-right: 5px;"><span><a id="DownloadBackupLink">Download backup file</a></span>\
										</div>\
										<br><h1>Upload backup</h1>\
										<div>\
											<input type=file id="files" />\
											<br><br><u>On duplicate</u>\
											<br><input type="radio" name="OnDuplicate" value="KeepCurrent" checked="checked"> Keep current\
											<br><input type="radio" name="OnDuplicate" value="UseBackup"> Use backup\
											<br><input type="radio" name="OnDuplicate" value="Merge"> Merge\
											<br><br><button id="upload">Upload</button>\
										</div>\
									</div>\
								</div>\
							</div>';

        this.DomElement = this.htmlToElement(html);
        document.body.insertAdjacentElement('beforeend' ,this.DomElement);

        console.log(this.DomElement);
        
	}
}