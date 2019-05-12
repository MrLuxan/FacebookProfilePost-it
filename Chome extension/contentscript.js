var username;
var associativeArray;
var url;
var timeoutHandle;

function unlock()
{
	document.getElementById('ProfilePostit').removeAttribute("readonly");
	document.getElementById('EditSaveButton').textContent = "Save";

	document.getElementById("EditSaveButton").removeEventListener("click", unlock);
	document.getElementById('EditSaveButton').addEventListener("click", save );
}

function save()
{
	document.getElementById('ProfilePostit').setAttribute('readonly', true);
	document.getElementById('EditSaveButton').textContent = "Edit";

	document.getElementById("EditSaveButton").removeEventListener("click", save);
	document.getElementById('EditSaveButton').addEventListener("click", unlock );

	associativeArray[username] = document.getElementById('ProfilePostit').value;

    chrome.storage.sync.set({"profileNotes": associativeArray}, function() {

    	var saveSpan = document.getElementById('SavedNotification');
    	saveSpan.style.opacity = 1;

		var tick = function() {
		    saveSpan.style.opacity -= 0.05;
		    if (saveSpan.style.opacity >= 0) { setTimeout(tick, 150); }
		};

		tick();

		chrome.storage.sync.get("settings", function(items) {
        	settings = items.settings;
        	settings.scheduleSaveCount = settings.scheduleSaveCount + 1;

		    chrome.storage.sync.set({"settings": settings}, function() {
		        console.log(settings.scheduleSaveCount);
		    });  
        });


    });
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
	addNote();
}


function addNote()
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

				chrome.storage.sync.get("profileNotes", function(items) {
		        
			        associativeArray = items.profileNotes;

			        if(associativeArray === undefined) {
						associativeArray = {};
					}	

					var note = (associativeArray[username] === undefined ? "" : associativeArray[username]);

					var list = document.querySelector('._2t4v.clearfix');
					list.innerHTML = '<li style="margin-bottom:17px;border: 1px solid #d3d6db;border-radius: 3px;background:#fff;">\
										<div class="clearfix _3-8t _2pi4">\
										    <div style="width: 24px;height: 24px;border-radius: 12px;background-color:#3b5998;color:#FFF;text-align: center;float:left;transform: rotate(45deg);font-size: 18px;">&#9999;</div>\
										    <div class="_8u _42ef">\
										        <div class="_6a _3-99">\
										            <div class="_6a _6b" style="height:24px"></div>\
										            <div class="_6a _6b">\
										                <span class="_50f5 _5kx5">Note</span>\
										            </div>\
										        </div>\
										    </div>\
										</div>\
									<div style="margin: 0px 3px">\
										<textarea readonly="true" id="ProfilePostit" style="resize:vertical;height:78px;padding:5px;width:calc(100% - 12px);">' + note + '</textarea>\
										<span id="SavedNotification" style="float:left;color:#9197a3;font-size: 11px;opacity:0;">Saved</span>\
										<span id="EditSaveButton" style="float:right;margin-right:5px;color:#9197a3;font-size: 11px; cursor:pointer"> Edit </span><hr style="clear: both;visibility: hidden;margin-right: 5px;">\
									</div>\
									</li>' + list.innerHTML;

					document.getElementById('ProfilePostit').addEventListener("dblclick", unlock );
					document.getElementById('EditSaveButton').addEventListener("click", unlock );
				});
			}
		}
	}
};

Date.dateDiff = function(fromdate) {	
  var todate= new Date();	
  var diff = todate - fromdate;	
  
  return Math.floor( diff/86400000);
}


function CheckSchedule()
{
    chrome.storage.sync.get("settings", function(items) {
        settings = items.settings;
        
        if(settings === undefined)
        {
        	var settings = { scheduleType: "DontUse", 
        					 months: 0,
        					 weeks: 1,
        					 days: 0,
        					 saves: 1,
        					 lastTriggerDate : "-1",
						     lastTriggerCount : "-1",//Date.now().toString(),
        					 scheduleSaveCount : 0
        					};
		    chrome.storage.sync.set({"settings": settings}, function() {});
		    console.log("new settings");
        }
        else
        {
        	switch(settings.scheduleType)
        	{
        		case "NumberDays" : 

        			var triggerDays = (settings.months*30) + (settings.weeks*7) + (settings.days);
        			var lastTrigger = new Date(settings.lastTriggerDate);

					var today = new Date();

					//today.setDate(today.getDate()+10);

					var dayPassed = Math.floor((today - lastTrigger)/86400000);
					console.log(dayPassed);

					if(dayPassed >= triggerDays)
					{
						reminderTrigger(settings);
					}


        		break;
        		case "NumberSaves" : 

        			if((settings.scheduleSaveCount - settings.lastTriggerCount) > settings.saves)
        			{
        				reminderTrigger(settings);
        			}

        		break;
        	}


        	
        }
    });
}

function reminderTrigger(settings)
{
	document.body.innerHTML += '<div id="BackupReminder" style="position:fixed;top:100px;left:50%;margin-left:-260px;width:520px;height:220px;z-index:100000;background:#FFF;border:#e1e2e3 1px solid;font-size: 16px;box-shadow: 2px 2px 5px #aaaaaa;">\
									<div style="width:500px;height:42px;background-color:#3b5998;color:#FFF;line-height: 42px;padding:0 10px;">\
										Facebook Profile Post-it Backup Reminder<div id="CloseBackupReminderX" style="float:right;cursor:pointer;">X</div>\
									</div>\
									<div  style="float:left;">\
										<img style="width:110px;margin:20px" src="'+chrome.extension.getURL("images/Icon.png")+'">\
									</div>\
									<div  style="float:left;width:310px;height:138px;margin:20px;position:relative;">\
										<div>\
										Your scheduled backup has come.<br><div id="DownloadBackup"style="margin-top:5px"></div>\
										</div>\
										<div style="position:absolute;bottom:0;right:0;font-size: 12px">\
											<a href="' + chrome.extension.getURL("/options/index.html") + '" target="_Blank" style="margin-right:5px">Change settings</a>\
											<a id="CloseBackupReminder">Close</a>\
										</div>\
									</div>\
								</div>';

	var json = JSON.stringify(associativeArray);
	var url  = URL.createObjectURL(new Blob([json], {type: "application/json"}));

	var a = document.createElement('a');
	a.download    = "ProfilePostitBackup.json";
	a.href        = url;
	a.textContent = "Download backup file";

	document.getElementById('DownloadBackup').appendChild(a);

	document.getElementById('CloseBackupReminder').addEventListener('click', function(ev){	document.getElementById("BackupReminder").style.display = 'none' });
	document.getElementById('CloseBackupReminderX').addEventListener('click', function(ev){	document.getElementById("BackupReminder").style.display = 'none'; });


	settings.lastTriggerDate = Date.now();
	settings.lastTriggerCount = settings.scheduleSaveCount;

    chrome.storage.sync.set({"settings": settings}, function() {
        console.log("saved");
    });  

}

window.onload = function() {
CheckSchedule();
}


timeoutHandle = window.setTimeout(triggerCheck, 750);

document.querySelector('html').addEventListener('DOMNodeInserted', function(ev){
  reset();
});
