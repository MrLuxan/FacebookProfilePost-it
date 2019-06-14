class DataStoreClass {

    LoadUserNote(user : string) : string
    {
        console.log("B LoadUserNote");
        return "";
    }

    SaveUserNote(user : string , note : string)
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
export let DataStore : DataStoreClass = new DataStoreClass();