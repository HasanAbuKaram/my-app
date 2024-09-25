// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
      .select('id,displayName,mail,userPrincipalName,mailboxSettings')
      .get();
  }
  // </getUserSnippet>

  // <getEventsSnippet>
async function getManager() {
  const user = JSON.parse(sessionStorage.getItem('graphUser'));

  try {
    // GET /me/manager
    let response = await graphClient
      .api('/me/manager')
       .get();

    updatePage(Views.calendar, response.value);
  } catch (error) {
    updatePage(Views.error, {
      message: 'Error getting events',
      debug: error
    });
  }
}
// </getEventsSnippet>