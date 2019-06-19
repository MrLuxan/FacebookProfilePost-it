declare var chrome: any;
export module DataStore {
    export class DataStoreClass {

    Settings = "";

    LoadUserNote(username : string, callBack: (note: string) => void): void
    {   
        let usernote :string = "TESTTEST";
        callBack(usernote);
    }

    SaveUserNote(user : string , note : string, callBack: (saveOk : boolean) => void): void
    {
        console.log("C SaveUserNode");
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


    // Save(){

    //     chrome.storage.sync.set({TallyItems: items}, function() {
    //      // console.log('Value is set to ' + items);
    //     });
    // }
    
    // Load(callBack){
    //     chrome.storage.sync.get(['TallyItems'], function(result) 
    //     {
    //         if(result.TallyItems == null)
    //         {
    //             items = [];
    //         }
    //         else
    //         {
    //             items = result.TallyItems;
    //         }
    
    //           callBack();
    //     });
    // }


}

export let DS : DataStoreClass = new DataStoreClass();
}