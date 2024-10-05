// common/common.js
import msalConfig from './config.js';  // Adjust the path as needed

// Declare the variable outside the function to make it accessible globally in the module
let myMSALObj = new msal.PublicClientApplication(msalConfig);
let accounts, name;

function initializeMSAL() {
    // Check login status on page load
    accounts = myMSALObj.getAllAccounts();
    if (accounts.length > 0) {
        // User is logged in
        name = accounts[0].name;
    }
}

function logout() {
    const logoutButton = document.querySelector("#logoutButton");
    // Handle logout button click
    logoutButton.addEventListener("click", function() {
        // Manually check for ongoing interactions using session storage
        const isInteractionInProgress = sessionStorage.getItem('msal.interaction.status') === 'interaction_in_progress';

        if (!isInteractionInProgress) {
            // First, send a request to the backend to clear the session and cookies
            fetch('/logout', {
                method: 'POST',
                credentials: 'include',  // Send cookies with the request
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log("Cookie cleared successfully on the server.");
                    // Proceed with MSAL logout
                    myMSALObj.logout();
                    
                //    window.location.replace("/");
                    //location.reload();
                } else {
                    console.error("Failed to clear session on the server.");
                }
            })
            .catch(error => {
                console.error("Error logging out:", error);
            });
        } else {
            console.warn("An interaction is already in progress. Please wait.");
        }
    });
}

// Export the function for use in other modules
export { initializeMSAL, logout, myMSALObj, accounts, name };
