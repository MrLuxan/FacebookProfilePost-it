class DataStoreClass {

    LoadUserNote(user : string) : string
    {
        console.log("C LoadUserNote");
        return "";
    }

    SaveUserNote(user : string , note : string)
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
}
export let DataStore : DataStoreClass = new DataStoreClass();