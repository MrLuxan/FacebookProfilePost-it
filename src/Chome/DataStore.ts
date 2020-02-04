declare var chrome: any;
export module DataStore {
    export class DataStoreClass {

    LoadUserNote(username : string, callBack: (note: string) => void): void
    {   
        chrome.storage.sync.get("profileNotes", (items : any) => {
            let profileNotes : { [Username: string]: string; } = items.profileNotes; 
            if(profileNotes === undefined)
                profileNotes = {};

            let note = (profileNotes[username] === undefined ? "" : profileNotes[username]);
            callBack(note);
        });        
    }

    SaveUserNote(username : string , note : string, callBack: (saveOk : boolean) => void): void
    {
        chrome.storage.sync.get("profileNotes", (items : any) => {
            let profileNotes : { [Username: string]: string; } = items.profileNotes; 
            if(profileNotes === undefined)
                profileNotes = {};
            	
            profileNotes[username] = note;
            chrome.storage.sync.set({"profileNotes": profileNotes}, () => {
                callBack(true);
            });
        });
    }

    LoadSettings() : object
    {
        console.log("C LoadSettings");
        return null;
    }

    ExportNotes(downloadButton : HTMLAnchorElement): void
    {
        chrome.storage.sync.get("profileNotes", (items : any) => {
            let profileNotes : { [Username: string]: string; } = items.profileNotes; 
            if(profileNotes === undefined)
                profileNotes = {};
     
            
            
            let fileName = "FacebookNote Backup (" + this.GetTimeStamp() + ").json";
            let blob = new Blob([JSON.stringify(profileNotes)], {type: "octet/stream"});
            
            downloadButton.href = window.URL.createObjectURL(blob);
            downloadButton.download = fileName;
        });

        return null;
    }

    GetTimeStamp() : string
    {
        var currentdate = new Date(); 
        var datetime =  currentdate.getFullYear() + "-"
                        + (currentdate.getMonth()+1)  + "-" 
                        + currentdate.getDate() + " "  
                        + currentdate.getHours() + ";"  
                        + currentdate.getMinutes() + ";" 
                        + currentdate.getSeconds();

        return datetime;
    }

    SaveSettings() 
    {
        console.log("C SaveSettings");
    }
}

export let DS : DataStoreClass = new DataStoreClass();
}