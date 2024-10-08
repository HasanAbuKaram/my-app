// Copyright (c) Phoenix Leap
// Licensed under the MIT License.
// ui.js

const Views = { error: 1, home: 2 };
const mainContainer = document.querySelector('#main-container');

function createElement(type, className, text) {
        var element = document.createElement(type);
        element.className = className;
      
        if (text) {
          var textNode = document.createTextNode(text);
          element.appendChild(textNode);
        }
      
        return element;
      }

      async function showWelcomeMessage(user) {
        // Create jumbotron
        let jumbotron = createElement('div', 'p-5 mb-4 bg-light rounded-3');
      
        let container = createElement('div', 'container-fluid py-5');
        jumbotron.appendChild(container);
      
        if (user) {
          // Get the user's profile from Graph
          const Manager = await getManager(); 
          console.log(Manager)
          // Welcome the user by name

          window.location.href = "/time";
        //  let welcomeMessage = createElement('h4', null, `Welcome ${user.displayName}, your PR will be approved by ${Manager.displayName}!`);
        //  container.appendChild(welcomeMessage);
      
        } else {
          // Show a sign in button in the jumbotron
          let signInButton = createElement('button', 'btn btn-primary btn-large',
            'Click here to sign in');
          signInButton.setAttribute('onclick', 'signIn();')
          container.appendChild(signInButton);
        }
      
        mainContainer.innerHTML = '';
        mainContainer.appendChild(jumbotron);
      }
      

      function showError(error) {
        var alert = createElement('div', 'alert alert-danger');
      
        var message = createElement('p', 'mb-3', error.message);
        alert.appendChild(message);
      
        if (error.debug)
        {
          var pre = createElement('pre', 'alert-pre border bg-light p-2');
          alert.appendChild(pre);
      
          var code = createElement('code', 'text-break text-wrap',
            JSON.stringify(error.debug, null, 2));
          pre.appendChild(code);
        }
      
        mainContainer.innerHTML = '';
        mainContainer.appendChild(alert);
      }

function updatePage(view, data) {
        if (!view) {
          view = Views.home;
        }
      
        const user = JSON.parse(sessionStorage.getItem('graphUser'));
      
        switch (view) {
          case Views.error:
            showError(data);
            break;
          case Views.home:
            showWelcomeMessage(user);
            break;
        }
      }