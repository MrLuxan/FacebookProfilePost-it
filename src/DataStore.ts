declare var chrome: any;
export module DataStore {

    export enum ReminderOption { Never, Days, Saves }
    export enum OnDupOption { KeepCurrent, UseBackup, Merge }

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

    LoadSettings(callBack :(settings : { [Settings: string]: any; }) => void) : void 
    {
        console.log("B LoadSettings");
        return null;
    }

    SaveSettings(reminderOp : DataStore.ReminderOption, days : number, saves : number, callBack :(message : string) => void ) : void  
    {
        console.log("B SaveSettings");
    }

    ExportNotes(downloadButton : HTMLAnchorElement): void
    {
        console.log("B ExportNotes");
        return null;        
    }

    ImportNotes(backUpData : any, dupOption : OnDupOption, callBack: (message : string) => void) : void
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