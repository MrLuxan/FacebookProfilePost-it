var indexedDB = window.indexedDB || window.webkitIndexedDB || window.msIndexedDB;
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

// FF, IE10 and Chrome21+ use strings while older Chrome used constants
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

if (IDBTransaction)
{
	IDBTransaction.READ_WRITE = IDBTransaction.READ_WRITE || 'readwrite';
	IDBTransaction.READ_ONLY = IDBTransaction.READ_ONLY || 'readonly';
}

SetupDatabase();

function SetupDatabase() {

	var openRequest = indexedDB.open("ProfilePost-itDB",1);

	openRequest.onupgradeneeded = function(e) {

		//console.log("Creating tables");

		var idb =  e.target.result;

		if (idb.objectStoreNames.contains('notes'))
			idb.deleteObjectStore('notes');

		var notestore = idb.createObjectStore('notes', {keyPath: 'key', autoIncrement: true});
		notestore.createIndex('key', 'notes', {unique: false, multiEntry: false});


		if (idb.objectStoreNames.contains('settings'))
			idb.deleteObjectStore('settings');

		var settingsstore = idb.createObjectStore('settings', {keyPath: 'key', autoIncrement: true});
		settingsstore.createIndex('key', 'settings', {unique: false, multiEntry: false});
		settingsstore.put({key: "scheduleType",	value: "DontUse"});
		settingsstore.put({key: "months",	value: 0});
		settingsstore.put({key: "weeks",	value: 1});
		settingsstore.put({key: "days",	value: 0});
		settingsstore.put({key: "saves",	value: "1"});
		settingsstore.put({key: "lastTriggerDate",	value: "-1"});
		settingsstore.put({key: "lastTriggerCount",	value: -1});
		settingsstore.put({key: "scheduleSaveCount",	value: 0});		

	};

	openRequest.onsuccess = function(e) { /*console.log("Creating DB");*/ }	
	openRequest.onerror = function(e) {/*console.log("failing at DB");*/}


}

function GetExportData(database,table,callback) {
	
	associativeArray = {};
	var request = indexedDB.open(database);
	request.onsuccess = function(e)
	{
	    idb = e.target.result;
	    var transaction = idb.transaction(table, IDBTransaction.READ_ONLY);
	    var objectStore = transaction.objectStore(table);

	    objectStore.openCursor().onsuccess = function(event)
	    {
	        var cursor = event.target.result;
	        if (cursor)
	        {
	            associativeArray[cursor.value.key] = cursor.value.value; 
	            cursor.continue();
	        }
	        else
	        {
			    callback(associativeArray);
			}
	    };

	};
}

function GetRowData(database,table,value,callback) {
	
	var request = indexedDB.open(database);

	request.onsuccess = function(e)
	{
		var idb = e.target.result;
		var transaction = idb.transaction(table, IDBTransaction.READ_ONLY);
		var objectStore = transaction.objectStore(table);
		var userRequest = objectStore.openCursor(value);

		note = "";

		userRequest.onsuccess = function(event)
		{
			var cursor = event.target.result;
			if (cursor)
			{
				note = cursor.value.value;
				cursor.continue();
			}
			else
			{
				callback(note);
			}
		};
	};
}


function SaveJsonToDatabase(database,table,jsonObject,callback) 
{
	var savedOK = false;
	var saveCount = 0;

    for(var key in jsonObject)
    {
        var attrName = key;
        var attrValue = jsonObject[key];

	    EditRecord(database,table,attrName,attrValue,function(results)
	    {
	    	savedOK = savedOK || results;

	    	saveCount++;

	    	if(saveCount == Object.keys(jsonObject).length)
	    	{
	    		callback(savedOK);
	    	}

	    });
    }
}

function EditRecord(database,table,savekey,savevalue,callback) 
{
	var request = indexedDB.open(database);
	request.onsuccess = function (e)
	{
		var idb = e.target.result;
		var objectStore = idb.transaction(table, IDBTransaction.READ_WRITE).objectStore(table);
		var request = objectStore.get(savekey);

		request.onsuccess = function (ev)
		{
				var data = ev.target.result;
				var result;
				var newPerson = (data === undefined);

				if (newPerson)
				{
					result = objectStore.put({ key: savekey, value: savevalue });
				}
				else
				{
					data.value = savevalue;
					result = objectStore.put(data);
				}

				result.onsuccess = function (ev)
				{
					callback(true);
				};

				result.onerror = function (ev)
				{
					callback(false);
				};
		};

		request.onerror = function (ev)
		{
			//console.log('ProfilePostit - Error occured', ev.srcElement.error.message);
		};
	};
}