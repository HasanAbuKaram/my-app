// common/common.js
import msalConfig from './config.js';  // Adjust the path as needed

function initializeMSAL() {
    const myMSALObj = new msal.PublicClientApplication(msalConfig);

    // Check login status on page load
    const accounts = myMSALObj.getAllAccounts();
    if (accounts.length > 0) {
        // User is logged in
        document.querySelector("#message").innerHTML = "Hello, " + accounts[0].name + "!";
        document.querySelector("#logoutButton").style.display = "block"; // Show logout button
    }

    // Handle logout button click
    document.querySelector("#logoutButton").addEventListener("click", function() {
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
                    
                    sessionStorage.removeItem("msal.interaction.status");
                    window.location.replace("/");
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
export { initializeMSAL };
