declare var chrome: any;
export module DataStore {

    export enum OnDupOption { KeepCurrent, UseBackup, Merge}

    export class DataStoreClass {
    
    LoadUserNote(username : string, callBack: (note: string) => void): void
    {   
        let usernote :string = "BaseBase";
    
        callBack(usernote);
    }

    SaveUserNote(user : string , note : string, callBack: (saveOk : boolean) => void): void
    {
        console.log("B SaveUserNode");
    }

    LoadSettings() : object
    {
        console.log("B LoadSettings");
        return null;
    }

    SaveSettings() 
    {
        console.log("B SaveSettings");
    }

    ExportNotes(downloadButton : HTMLAnchorElement): void
    {
        console.log("B ExportNotes");
        return null;        
    }

    ImportNotes(data : any, option : OnDupOption) : void
    {
        console.log("B ImportNotes");
    }

    GetTimeStamp() : string
    {
        return "Now as string";
    }
}

export let DS : DataStoreClass = new DataStoreClass();
}