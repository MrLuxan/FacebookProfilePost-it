var associativeArray;
var settings;

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

        for (var key in backUpData) 
        {
            if (!backUpData.hasOwnProperty(key)) continue;
            console.log(key + " = " + backUpData[key]);

            if(associativeArray[key] !== undefined)
            {
                if(associativeArray[key] != backUpData[key])
                {   
                    switch(getCheckValue("OnDuplicate")) 
                    {
                        case "KeepCurrent" : /* Do nothing */ break;
                        case "UseBackup" : associativeArray[key] = backUpData[key]; break;
                        case "Merge" : associativeArray[key] = associativeArray[key] + "\n\n" + backUpData[key];
                        break;
                    }
                }
            }
            else
            {
                associativeArray[key] = backUpData[key];
            }

        }    

        chrome.storage.sync.set({"profileNotes": associativeArray}, function() {
            alert("Updated");
        });    

    }
}

function SaveSettings()
{
    settings.scheduleType = getCheckValue("Schedule");
    settings.months = parseInt(document.getElementById("ScheduleMonths").value);
    settings.weeks = parseInt(document.getElementById("ScheduleWeeks").value);
    settings.days = parseInt(document.getElementById("ScheduleDays").value);
    settings.saves = parseInt(document.getElementById("ScheduleSaves").value);

    if(settings.lastTriggerDate == "-1")
        settings.lastTriggerDate = Date.now();
    if(settings.lastTriggerCount == "-1")
        settings.lastTriggerCount = 0

    console.log(settings);

    chrome.storage.sync.set({"settings": settings}, function() {
        alert("saved");
    });  
}

window.onload = function() {

    document.getElementById('upload').addEventListener("click", UploadBackup );
	document.getElementById('SaveSchedule').addEventListener("click", SaveSettings );

    chrome.storage.sync.get("settings", function(items) {
        settings = items.settings;
            
        if(settings !== undefined) {
            document.getElementById("ScheduleMonths").value = settings.months;
            document.getElementById("ScheduleWeeks").value = settings.weeks;
            document.getElementById("ScheduleDays").value = settings.days;
            document.getElementById("ScheduleSaves").value = settings.saves;
//
            var radios = document.getElementsByName("Schedule");
            for (var i = 0; i < radios.length; i++) 
            {
                if (radios[i].value == settings.scheduleType)
                {
                    radios[i].checked = true;
                    break;
                }
            }
        }
        else
        {
            settings = {scheduleType: "DontUse", 
                        months: 0,
                        weeks: 1,
                        days: 0,
                        saves: 1,
                        lastTriggerDate : "-1",
                        lastTriggerCount : "-1",
                        scheduleSaveCount : 0
                       };
            chrome.storage.sync.set({"settings": settings}, function() {}); 
        }
    });

	chrome.storage.sync.get("profileNotes", function(items) {
    
        associativeArray = items.profileNotes;

        if(associativeArray === undefined) {
			associativeArray = {};
		}	

		var json = JSON.stringify(associativeArray);
		var blob = new Blob([json], {type: "application/json"});
		var url  = URL.createObjectURL(blob);

		var a = document.getElementById('DownloadBackupLink');
		a.download    = "ProfilePostitBackup.json";
		a.href        = url;
	});

}