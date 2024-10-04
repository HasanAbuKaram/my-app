// common/config.js
const msalConfig = {
    auth: {
        clientId: "1c412488-b824-49c3-aa63-af78a0743b26",
        authority: "https://login.microsoftonline.com/d33520e6-0dd4-4718-b1df-356beb84e0c5",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    }
};

export default msalConfig;
