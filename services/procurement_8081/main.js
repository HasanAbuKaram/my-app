    // Initialize MSAL.js
    const msalConfig = {
        auth: {
            clientId: "1c412488-b824-49c3-aa63-af78a0743b26", // replace with your app client id
            authority: "https://login.microsoftonline.com/d33520e6-0dd4-4718-b1df-356beb84e0c5", // replace with your tenant id
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: false,
        }
    };

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
            }).then(response => {
                if (response.ok) {
                    
                    console.log("Cookie cleared successfully on the server.");
                        // Proceed with MSAL logout
                    myMSALObj.logout();

                    // Delay the removal of the session storage item
                    setTimeout(() => {
                        sessionStorage.removeItem("msal.interaction.status");
                        location.reload(); // Reload the page to reflect changes
                    }, 1000); // Adjust the delay as needed

                    // // Then, perform the MSAL logout
                    // myMSALObj.logout({
                    //     postLogoutRedirectUri: window.location.origin // Redirect after logout
                    // });
                    // sessionStorage.clear();
                    // console.log("Session cleared successfully on the server.");
                } else {
                    console.error("Failed to clear session on the server.");
                }
            }).catch(error => {
                console.error("Error logging out:", error);
            });
        } else {
            console.warn("An interaction is already in progress. Please wait.");
        }
    });

