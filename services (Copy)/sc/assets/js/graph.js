// Copyright (c) Phoenix Leap
// Licensed under the MIT License.
// graph.js

// <graphInitSnippet>
let graphClient = undefined;

function initializeGraphClient(msalClient, account, scopes)
{
  // Create an authentication provider
  const authProvider = new MSGraphAuthCodeMSALBrowserAuthProvider
  .AuthCodeMSALBrowserAuthenticationProvider(msalClient, {
    account: account,
    scopes: scopes,
    interactionType: msal.InteractionType.PopUp
  });

  // Initialize the Graph client
  graphClient = MicrosoftGraph.Client.initWithMiddleware({authProvider});
}
// </graphInitSnippet>

// <getUserSnippet>
async function getUser() {
    return graphClient
      .api('/me')
      // Only get the fields used by the app
      .select('id,displayName,mail,userPrincipalName')
      .get();
  }
  // </getUserSnippet>

  // <getEventsSnippet>
  async function getManager() {
    const user = JSON.parse(sessionStorage.getItem('graphUser'));
  
    // Validate user
    if (!user) {
      console.error('User not found in session storage');
      return;
    }
  
    try {
      // GET /me/manager
      let response = await graphClient
        .api('/me/manager')
        .get();
  
      // Validate response
      if (response) {
      //  updatePage(Views.calendar, response);
        return response; // Return the manager data
      } else {
        console.error('Manager data not found in response');
      }
    } catch (error) {
      console.error('Error getting manager data');
      // updatePage(Views.error, {
      //   message: 'Error getting manager data',
      //   debug: error
      // });
    }
  }
  
  
  
// </getEventsSnippet>