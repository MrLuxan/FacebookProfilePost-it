var username;
var url;
var timeoutHandle;


function getCheckValue(name)
{
    var radios = document.getElementsByName(name);
    for (var i = 0; i < radios.length; i++) 
    {
        if (radios[i].checked)
        {
            return radios[i].value;
            break;
        }
    }
}


function unlock()
{
	document.getElementById('ProfilePostit').removeAttribute("readonly");
	document.getElementById('EditSaveButton').textContent = "Save";

	document.getElementById("EditSaveButton").removeEventListener("click", unlock);
	document.getElementById('EditSaveButton').addEventListener("click", save );
}

function save()
{
	var value = document.getElementById('ProfilePostit').value;
    EditRecord('ProfilePost-itDB','notes',username,value,function(results)
    {
		if(results)
		{

			GetRowData('ProfilePost-itDB','settings','scheduleSaveCount',function(SaveCount) {
				EditRecord('ProfilePost-itDB','settings','scheduleSaveCount',parseInt(SaveCount)+1,function(updateResult)
    			{
					//console.log(updateResult);
				});
			});


			document.getElementById('ProfilePostit').setAttribute('readonly', true);
			document.getElementById('EditSaveButton').textContent = "Edit";
		
			document.getElementById("EditSaveButton").removeEventListener("click", save);
			document.getElementById('EditSaveButton').addEventListener("click", unlock );
		
			var saveSpan = document.getElementById('SavedNotification');
			saveSpan.style.opacity = 1;
		
			var saveTimer = setInterval(function()
			{ 
				saveSpan.style.opacity -= 0.05;
				if (saveSpan.style.opacity == 0) 
					clearInterval(saveTimer);
			}, 150);
		}
	});
}

function addNoteElement()
{
	var element =  document.getElementById('ProfilePostit');
	if (typeof(element) == 'undefined' || element == null)
	{
		var urlBrakeDown = url.match(/https?\:\/\/(?:www\.)?facebook\.com\/(\d+|[A-Za-z0-9\.]+)\/?/);

		if(urlBrakeDown != null)
		{
			if(urlBrakeDown.length >= 2)
			{
				username = urlBrakeDown[1];
				GetRowData('ProfilePost-itDB','notes',username,function(results) {

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
										<textarea readonly="true" id="ProfilePostit" style="resize:vertical;height:78px;padding:5px;width:calc(100% - 12px);">'+results+'</textarea>\
										<span id="SavedNotification" style="float:left;color:#9197a3;font-size: 11px;opacity:0;">Saved</span>\
										<span id="EditSaveButton" style="float:right;margin-right:5px;color:#9197a3;font-size: 11px; cursor:pointer"> Edit </span><hr style="clear: both;visibility: hidden;margin-right: 5px;">\
									</div>\
									</li>';

					var list = document.querySelector('._2t4v.clearfix');
					list.insertBefore(cheatspan.firstChild, list.childNodes[0]);

					document.getElementById('ProfilePostit').addEventListener("dblclick", unlock );
					document.getElementById('EditSaveButton').addEventListener("click", unlock );
					document.getElementById('SettingsButton').addEventListener("click", ShowSettings);
			    });
			}
		}
	}

}

function AddSettings()
{
		document.body.insertAdjacentHTML('beforeend' ,'<div id="PostItSettings" style="display:none;position:fixed;top:50px;left:50%;margin-left:-400px;width:820px;z-index:100000;font-size: 16px;">\
									<div style="width:820px;background:#FFF;border:#e1e2e3 1px solid;font-size: 16px;box-shadow: 2px 2px 5px #aaaaaa;">\
									<div style="width:800px;height:42px;background-color:#3b5998;color:#FFF;line-height: 42px;padding:0 10px;">\
										Facebook Profile Post-it Settings<div id="CloseSettingsX" style="float:right;cursor:pointer;">X</div>\
									</div>\
									<div  style="margin:20px;position:relative;">\
										<h1>Schedule backup schedule</h1>\
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
										<br>\
										<h1>Upload backup</h1>\
										<div>\
											<input type=file id="files" />\
											<br><br><u>On duplicate</u>\
											<br><input type="radio" name="OnDuplicate" value="KeepCurrent" checked="checked"> Keep current\
											<br><input type="radio" name="OnDuplicate" value="UseBackup"> Use backup\
											<br><input type="radio" name="OnDuplicate" value="Merge"> Merge\
											<br><br><button id="upload">Upload</button>\
										</div>\
										<div style="position:absolute;bottom:0;right:0;font-size: 12px">\
											<a id="CloseSettings">Close</a>\
										</div>\
									</div>\
									</div>\
									<div style="margin-top:10px;width:800px;background:#FFF;border:#e1e2e3 1px solid;font-size: 16px;box-shadow: 2px 2px 5px #aaaaaa;padding:10px">\
										<div>\
											<img src="'+chrome.extension.getURL("images/MyLogo.png")+'" style="float:left;margin-right:10px;">\
											<div>\
												<h2>Help the dev</h2>\
												<table>\
												<tbody><tr>\
													<td>Website :</td>\
													<td>\
														<a href="http://Robert-Walker.com"><img src="'+chrome.extension.getURL("images/linkIcon.png")+'" style="float: left;margin-right:5px;"> Robert-Walker.com</a>\
													</td>\
												</tr>\
												<tr>\
													<td>Rate :   </td>\
														<td><a href="https://addons.mozilla.org/en-GB/firefox/addon/facebook-profile-post-it/"><img src="'+chrome.extension.getURL("images/linkIcon.png")+'" style="float: left;margin-right:5px;"> Firefox addons</a>\
													</td>\
												</tr>\
												</tbody></table>\
											</div>\
										</div>\
									</div>\
									</div>');

	document.getElementById('CloseSettings').addEventListener('click', function(ev){	document.getElementById("PostItSettings").style.display = 'none'; });
	document.getElementById('CloseSettingsX').addEventListener('click', function(ev){	document.getElementById("PostItSettings").style.display = 'none'; });

	document.getElementById('SaveSchedule').addEventListener("click", SaveSchedule );
	document.getElementById('upload').addEventListener("click", UploadBackup );

}

function SaveSchedule()
{
	var settings = {
		    "scheduleType" : getCheckValue("Schedule"),
		    "months" : parseInt(document.getElementById("ScheduleMonths").value),
		    "weeks" : parseInt(document.getElementById("ScheduleWeeks").value),
		    "days" : parseInt(document.getElementById("ScheduleDays").value),
		    "saves" : parseInt(document.getElementById("ScheduleSaves").value)
		};


	SaveJsonToDatabase('ProfilePost-itDB','settings',settings,function(saveResult) {
		if(saveResult)
		{
        	alert("saved");
        }
	});
}

function UploadBackup()
{
	if (!window.FileReader) {
        alert('Your browser is not supported')
    }

    var input = document.getElementById( "files" );

    var reader = new FileReader();
    if (input.files.length) {
        reader.readAsText(input.files[0]);
		reader.addEventListener("load", processFile); 

    } else {
        alert('Please upload a file before continuing')
    } 
}


function processFile(e) {
    var file = e.target.result;

    if (file && file.length) {
        results = file.split("\n");

        var backUpData = JSON.parse(results);
		var onDupe = getCheckValue("OnDuplicate");

        for (var key in backUpData) 
        {
            var username = key;

            if (!backUpData.hasOwnProperty(username)) continue;
            SaveBackupUser(username,backUpData[username],onDupe);
        }    
    }
}

function SaveBackupUser(username,backupNote,onDupe)
{
	GetRowData('ProfilePost-itDB','notes',username,function(currentNote) {

		if(currentNote != "")
		{
			if(currentNote != backupNote && onDupe != "KeepCurrent")
			{
				var val = "";
				switch(onDupe) 
		        {
		            case "UseBackup" :  val = backupNote; break;
		            case "Merge" : val = currentNote + "\n\n" + backupNote;
		            break;
		        }

		        EditRecord('ProfilePost-itDB','notes',username,backupNote,function(results)
			    {
				    //console.log("overwrite");
			    });
			}
		}
		else
		{
			EditRecord('ProfilePost-itDB','notes',username,backupNote,function(results)
			{
				//console.log("new");
			});
		}
	});

}


function ShowSettings()
{
    GetExportData('ProfilePost-itDB','notes',function(results) {
		var blob = new Blob([JSON.stringify(results)], {type: "application/json"});
		var a = document.getElementById('DownloadBackupLink');
		a.download    = "ProfilePostitBackup.json";
		a.href        = URL.createObjectURL(blob);

		GetExportData('ProfilePost-itDB','settings',function(settings) {

            document.getElementById("ScheduleMonths").value = settings.months;
            document.getElementById("ScheduleWeeks").value = settings.weeks;
            document.getElementById("ScheduleDays").value = settings.days;
            document.getElementById("ScheduleSaves").value = settings.saves;

            var radios = document.getElementsByName("Schedule");
            for (var i = 0; i < radios.length; i++) 
            {
                if (radios[i].value == settings.scheduleType)
                {
                    radios[i].checked = true;
                    break;
                }
            }

			document.getElementById("PostItSettings").style.display = '';
    	});
    });
}

function ReminderTrigger()
{
	GetExportData('ProfilePost-itDB','settings',function(settings) 
	{
		var trigger = CheckSchedule(settings);

		if(trigger)
		{
			document.body.insertAdjacentHTML('beforeend' , '<div id="BackupReminder" style="position:fixed;top:100px;left:50%;margin-left:-260px;width:520px;height:220px;z-index:100000;background:#FFF;border:#e1e2e3 1px solid;font-size: 16px;box-shadow: 2px 2px 5px #aaaaaa;">\
											<div style="width:500px;height:42px;background-color:#3b5998;color:#FFF;line-height: 42px;padding:0 10px;">\
												Facebook Profile Post-it Backup Reminder<div id="CloseBackupReminderX" style="float:right;cursor:pointer;">X</div>\
											</div>\
											<div  style="float:left;">\
												<img style="width:110px;margin:20px" src="'+chrome.extension.getURL("images/128.png")+'">\
											</div>\
											<div  style="float:left;width:310px;height:138px;margin:20px;position:relative;">\
												<div>\
												Your scheduled backup has come.<br><div id="DownloadBackup"style="margin-top:5px"></div>\
												</div>\
												<div style="position:absolute;bottom:0;right:0;font-size: 12px">\
													<a id="ChangeSettingsReminder" style="margin-right: 10px;">Change settings</a>\
													<a id="CloseBackupReminder">Close</a>\
												</div>\
											</div>\
										</div>');

				document.getElementById('CloseBackupReminder').addEventListener('click', function(ev){	document.getElementById("BackupReminder").style.display = 'none'; });
				document.getElementById('CloseBackupReminderX').addEventListener('click', function(ev){	document.getElementById("BackupReminder").style.display = 'none'; });
				document.getElementById('ChangeSettingsReminder').addEventListener('click', function(ev){ document.getElementById("BackupReminder").style.display = 'none'; ShowSettings();});


				var newSettings = {
					    "lastTriggerDate" : Date.now(),
					    "lastTriggerCount" : settings.scheduleSaveCount
					};


				SaveJsonToDatabase('ProfilePost-itDB','settings',newSettings,function(saveResult) {
					if(saveResult)
					{
			        	//console.log("New trigger saved");
			        }
				});
			}
	});
}


function CheckSchedule(settings)
{
	var trigger = false;

	switch(settings.scheduleType)
	{
		case "NumberDays" : 

			var triggerDays = (settings.months*30) + (settings.weeks*7) + (settings.days);
			var lastTrigger = new Date(settings.lastTriggerDate);

			var today = new Date();

			var dayPassed = Math.floor((today - lastTrigger)/86400000);
			//console.log(dayPassed);

			if(dayPassed >= triggerDays)
			{
				trigger = true;
			}


		break;
		case "NumberSaves" : 

			if((settings.scheduleSaveCount - settings.lastTriggerCount) > settings.saves)
			{
				trigger = true;
			}

		break;
	}

	return trigger;
}



function reset()
{
    window.clearTimeout(timeoutHandle);
    timeoutHandle = window.setTimeout(triggerCheck, 750);
}

function triggerCheck()
{
	var new_url = document.location.toString();

	if(url != undefined)
	{
		if (url == new_url)
			return; // already checked or processed
	}

	url = new_url;
	addNoteElement();
}


SetupDatabase();
AddSettings();
ReminderTrigger();

timeoutHandle = window.setTimeout(triggerCheck, 750);

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var list = document.querySelector('html');

var observer = new MutationObserver(function(mutations) {  
	reset();
});

observer.observe(list, {
	subtree: true, 
	childList: true, 
	characterData: true
});