import { UiElement } from "./UiElement";
import { DataStore } from "./DataStore"

declare var chrome: any;

export class SettingsEl extends UiElement {

	CloseButton : HTMLElement = null;
	DownloadBackupButton : HTMLAnchorElement = null;
	UploadBackupInput : HTMLInputElement = null;
	BackupMessage : HTMLSpanElement = null;

	Close()
	{
		this.DomElement.parentNode.removeChild(this.DomElement);
	}

	UploadBackup()
	{
		if (!window.FileReader) {
			alert('Your browser is not supported')
		}
		else {
			let reader = new FileReader();
			if (this.UploadBackupInput.files.length) {
				reader.readAsText(this.UploadBackupInput.files[0]);
				//reader.addEventListener("load", this.processFile);
				reader.addEventListener("load", (e:Event) => this.processFile(e));
			} else {
				alert('Please upload a file before continuing')
			}
		} 
	}

	processFile(e : any) {
		var file = e.target.result;

		if (file && file.length) {	
			let backUpData : JSON = JSON.parse(file);
			let onDupOp : DataStore.OnDupOption;

			let checked : HTMLInputElement = <HTMLInputElement>this.DomElement.querySelector('#OnDuplicateGroup')
										                                      .querySelector('input:checked');

			switch(checked.value){
				case "KeepCurrent" : onDupOp = DataStore.OnDupOption.KeepCurrent; break;
				case "UseBackup" : onDupOp = DataStore.OnDupOption.UseBackup; break;
				case "Merge" : onDupOp = DataStore.OnDupOption.Merge; break;
			}

			DataStore.DS.ImportNotes(backUpData,onDupOp,(message : string) => {
				this.BackupMessage.innerText = message;
			});
		}
	}

    constructor()
    {
		super();

		let html : string = '<div id="PostItSettings" style="position:fixed;top:50px;left:50%;margin-left:-400px;width:820px;z-index:100000;font-size: 16px;background:#FFF;border:#e1e2e3 1px solid;box-shadow: 2px 2px 5px #aaaaaa;">\
									<div style="width:800px;height:42px;background-color:#3b5998;color:#FFF;line-height: 42px;padding:0 10px;">\
										Profile Post-it Settings<div id="CloseSettingsX" style="float:right;cursor:pointer;">X</div>\
									</div>\
									<div  style="margin:10px 20px;height: Calc(100% - 61px);">\
										<h1>Schedule backup reminder</h1>\
										<div>\
										      <input type="radio" name="Schedule" value="DontUse" checked="checked"> Don\'t use\
										  <br><input type="radio" name="Schedule" value="NumberDays"> Prompt after number of day\
										  <br><span style="margin-left: 30px;"><input id="ScheduleDays" type="number" name="quantity" min="1" value="1" style="margin:5px"></span>\
										  <br><input type="radio" name="Schedule" value="NumberSaves"> Prompt after number of saves\
										  <br><span style="margin-left: 30px;"><input id="ScheduleSaves" type="number" name="quantity" value="1" min="1"></span>\
										  <br><button id="SaveSchedule" style="margin-top:10px;">Save</button>\
										</div>\
										<hr><h1>Download backup</h1>\
										<div>\
											<span style="margin-right: 5px;"><a id="DownloadBackupLink">Download backup file</a></span>\
										</div>\
										<hr><h1>Upload backup</h1>\
										<div>\
											<input type="file" accept=".json" id="BackupUploadFiles" />\
											<br><br><u>On duplicate</u>\
											<div id="OnDuplicateGroup" style="margin: 5px 0;">\
											<input type="radio" name="OnDuplicate" value="KeepCurrent" checked="checked"> Keep current\
											<input type="radio" name="OnDuplicate" value="UseBackup"> Use backup\
											<input type="radio" name="OnDuplicate" value="Merge"> Merge\
											</div>\
											<button id="BackupUploadButton" style="margin-right: 15px;">Upload</button><span id="BackupMessage"></span>\
										</div>\
									</div>\
							</div>';

        this.DomElement = this.htmlToElement(html);
        document.body.insertAdjacentElement('beforeend' ,this.DomElement);
		
		this.CloseButton = this.DomElement.querySelector('#CloseSettingsX');
		this.CloseButton.addEventListener("click", (e:Event) => this.Close());
		
		this.DownloadBackupButton = this.DomElement.querySelector('#DownloadBackupLink');
		this.UploadBackupInput = this.DomElement.querySelector('#BackupUploadFiles');
        let BackupUploadButton : HTMLButtonElement = this.DomElement.querySelector("#BackupUploadButton");
		BackupUploadButton.addEventListener("click", (e:Event) => this.UploadBackup());

		this.BackupMessage = this.DomElement.querySelector('#BackupMessage');


		DataStore.DS.ExportNotes(this.DownloadBackupButton);
	}
}