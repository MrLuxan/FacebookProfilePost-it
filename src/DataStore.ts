declare var chrome: any;
export module DataStore {
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
}

export let DS : DataStoreClass = new DataStoreClass();
}