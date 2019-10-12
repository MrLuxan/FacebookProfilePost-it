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

    SaveSettings() 
    {
        console.log("C SaveSettings");
    }
}

export let DS : DataStoreClass = new DataStoreClass();
}