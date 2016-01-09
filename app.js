'use strict'
/*
* ----------------------------------------------------------------------
* Name: app.js
* Author: Dustin Rea
* AuthorURL: http://www.dustinrea.com
* License: Free as in Free Beer. 
* ----------------------------------------------------------------------
* 
* ----------------------------------------------------------------------
* Description: Main application file. 
* ----------------------------------------------------------------------
*/
document.addEventListener("DOMContentLoaded", function() {
  // ----------------------------------------------------------------------
  // MASTER TODO LIST: 
  // ----------------------------------------------------------------------
  // TODO: Refactor with functional programming. EX:
  //      Turn the functions into vars to be added to the app init.
  //      The app variable can load DOM loads and the DOMContentLoaded
  //      function can handle the function calls once the DOM is ready.
  //      Possible solution to removing defer or adding async to <script>
  // TODO: SOC Polling and Comments Functionality
  // TODO: Add app.factory.webRTCElement = function(params) {};
  //
  // TODO: Bottom of file is P2P example between two elements.
  //      Found a script that connects WebRTC using Node and Socket.io 
  //      Socket.io P2P : http://socket.io/blog/socket-io-p2p/
  // 
  // ----------------------------------------------------------------------
  // PERFORMANCE TEST TODO LIST:
  // ----------------------------------------------------------------------
  // TODO: Run Network Tests with app.js as async instead of defer
  //   - Hypothesis: 40ms wasted waiting on style.css to load slows JS
  //      that doesn't rely on the actual styling since no animations run.
  // TODO: Run Timeline Tests with app.js as async instead of defer
  // TODO: Test the performance hit for using setInterval vs Event Listeners
  // ----------------------------------------------------------------------

  // Init App
  var app = {
      name: 'JS Factory Playground',
      version: '0.5.4',
      author: 'Dustin Rea',
      description: 'A sandbox for playing with JS functionality.',
      html: document.getElementById('app'), // Gets <body id="app"> Element,
      polling: true,
      comments: {
          pollSpeed: 50,
          // Element Target to show client Poll Speed
          pollSpeedElement: document.getElementById('comment-poll-speed'),
          inputText: document.getElementById('comment-id'),
          // Comment Element Targets
          newCommentsElement: document.getElementById('new-comments-id'),
          outputTarget: document.getElementById('new-commments-text-id'),
          outputPreviewText: 'A Preview of Your Comment Appears Here.'
      },
      videocam: {
          version: 'v0.4.1',
          versionElement: document.getElementById('videocam-header-version')
      }
  };
  
  // Generic Error Handler for Debugging    
  app.appError = function(errorString) {
      // Log Error to User Console.
      console.log('app.appError = ' + errorString);
  };

  /*
  * ----------------------------------------------------------------------
  * Vanilla Poll for new data.
  * Mimics client-side data-binding
  * ----------------------------------------------------------------------
  */
  
  app.startPoll = function() {
      // Check if polling is enabled
      if(app.polling) { 
          // Convert the Speed.toString() and insert the text into the element. 
          app.comments.pollSpeedElement.innerText = app.comments.pollSpeed.toString() + 'ms';
          
          // Return the polling (interval) loop
          return setInterval(function() {
              // Don't do anything until the input changes
              if(app.comments.inputText.value != '') {
                  // Display the Text in input as a preview
                  app.comments.outputTarget.innerText = (app.comments.inputText.value);
                  
                  // Create the new element to contain the comment
                  var el = app.factory.section();
                  // Add ouputText to outputElement
                  el.innerText = app.comments.inputText.value + '\n'; 
                  // Append the new element to the comments
                  app.comments.newCommentsElement.appendChild(el);
                  
                  // Clear Output Variable After its apppended. 
                  app.comments.outputText = '';
              } else {
                  app.comments.outputTarget.innerText = app.comments.outputPreviewText;
              }
          }, app.comments.pollSpeed);
      } else {
          // Convert the Speed.toString() and insert the text into the element. 
          app.comments.pollSpeedElement.innerText = 'Off';
      }
  };
  
  // Factory for generating HTML Elements
  app.factory = {
      header  : function () {
          // Create Elements
          var el = document.createElement('header');
          var elh1 = document.createElement('h1');
          var elh2 = document.createElement('h2');
          
          // Build elh1
          elh1.innerText = app.name + ' v.' + app.version; // Set name and version
          elh1.setAttribute('id', 'pageTitle'); // Set the ID Attr
          elh1.setAttribute('name', 'pageTitle'); // Set the Name Attr
          
          // Build elh2
          // This element gets used as a sub-header 
          elh2.innerText = app.description;
          
          // Merge the elements for output
          el.appendChild(elh1);
          el.appendChild(elh2);
          return el;
      },
      section : function() {
          // Create Elements
          var el = document.createElement('section');
          var elInnerWrap = document.createElement('div');
          var elInnerWrapPara = document.createElement('p');
          
          // Build Element
          elInnerWrapPara.innerText = 'Hey Section Factory!'
          
          // Merge the elements for output
          elInnerWrap.appendChild(elInnerWrapPara);
          el.appendChild(elInnerWrap);
          return el;
      },
      footer : function() {
          // Create Elements
          var el = document.createElement('footer');
          var elText = document.createElement('p');
          
          // Build Element
          elText.innerHTML = 'Factory Playground By: ' + app.author;
          
          // Merge the elements for output
          el.appendChild(elText);
          return el;
      }
  };  // End app.factory = {};
  
  /*
  * ----------------------------------------------------------------------
  * WebRTC Bulit into the App
  * myVersion: 0.4.0 
  * Description: Checks for getUserMedia Support and checks vendor-prefixes
  *       Gets Video stream and Audio stream if supported.
  * ----------------------------------------------------------------------
  * TODO: Add app.factory.webRTCElement = function(params) {};
  * ----------------------------------------------------------------------
  */
  
  app.getUserVideoandAudio = function() {
    // Front End Element for Error Display
    var videocamErrorElement = document.querySelector('#videocamError');
    
    // Checks User's browser for Navigator
    var hasGetUserMedia = function() {
        // Empty error means no error;
        if( ! ( navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia ) ) {
            // Bubble the Error to Global App Error
            app.appError('getUserMedia Not Supported');
            videocamErrorElement.innerText = 'getUserMediaNotSupported';
            return false;
        }
        else {
            return true;
        }
    };

    // If no error from getUserMedia, continue. 
    if (hasGetUserMedia()) {
      // Init Navigator Object with proper prefix. 
      navigator.getUserMedia  = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
      
      var video = document.querySelector('video');
      var constraints = {audio: false, video: true};
      
      // navigator.getUserMedia() Success Callback
      var successCallback = function(stream) {
          window.stream = stream; // stream available to console
          if (window.URL) {
              video.src = window.URL.createObjectURL(stream);
          } else {
              video.src = stream;
          }
      };
      
      // navigator.getUserMedia() Error Callback
      var errorCallback = function(error){
          console.log('navigator.getUserMedia error: ', error);
      };
  
      // Run the command. 
      navigator.getUserMedia(constraints, successCallback, errorCallback);
    }
  };
  
  /*
  * ----------------------------------------------------------------------
  * APP EXECUTION - RUN IT 
  * ----------------------------------------------------------------------
  */

  // Start Poll the Input Element for changes.
  app.startPoll();
  
  // Generate the new elements
  var newHeader = app.factory.header();
  var newSection = app.factory.section();
  var newFooter = app.factory.footer();
  
  // Append the new elements to the document
  app.html.insertBefore(newHeader, app.html.childNodes[0]);
  app.html.insertBefore(newSection, app.html.childNodes[1]);
  app.html.appendChild(newFooter);
  
  // Inserts the Version of the Application's Implementation of WebRTC
  app.videocam.versionElement.innerHTML = app.videocam.version;

  // Init WebRTC
  app.getUserVideoandAudio();
    
    
// Peer 2 Peer Connection.     
// Source: https://github.com/mdn/samples-server/blob/master/s/webrtc-simple-datachannel/main.js
(function() {    

  // Define "global" variables
  var connectButton = null;
  var disconnectButton = null;
  var sendButton = null;
  var messageInputBox = null;
  var receiveBox = null;
  
  var localConnection = null;   // RTCPeerConnection for our "local" connection
  var remoteConnection = null;  // RTCPeerConnection for the "remote"
  
  var sendChannel = null;       // RTCDataChannel for the local (sender)
  var receiveChannel = null;    // RTCDataChannel for the remote (receiver)
  
  // Functions
  
  // Set things up, connect event listeners, etc.
  function startup() {
    connectButton = document.getElementById('connectButton');
    disconnectButton = document.getElementById('disconnectButton');
    sendButton = document.getElementById('sendButton');
    messageInputBox = document.getElementById('message');
    receiveBox = document.getElementById('receivebox');

    // Set event listeners for user interface widgets
    connectButton.addEventListener('click', connectPeers, false);
    disconnectButton.addEventListener('click', disconnectPeers, false);
    sendButton.addEventListener('click', sendMessage, false);
  }
  
  // Connect the two peers. Normally you look for and connect to a remote
  // machine here, but we're just connecting two local objects, so we can
  // bypass that step.
  function connectPeers() {
    // Create the local connection and its event listeners
    localConnection = new RTCPeerConnection();
    
    // Create the data channel and establish its event listeners
    sendChannel = localConnection.createDataChannel("sendChannel");
    sendChannel.onopen = handleSendChannelStatusChange;
    sendChannel.onclose = handleSendChannelStatusChange;
    
    // Create the remote connection and its event listeners
    remoteConnection = new RTCPeerConnection();
    remoteConnection.ondatachannel = receiveChannelCallback;
    // Set up the ICE candidates for the two peers
    
    localConnection.onicecandidate = e => !e.candidate
        || remoteConnection.addIceCandidate(e.candidate)
        .catch(handleAddCandidateError);

    remoteConnection.onicecandidate = e => !e.candidate
        || localConnection.addIceCandidate(e.candidate)
        .catch(handleAddCandidateError);
    
    // Now create an offer to connect; this starts the process
    localConnection.createOffer()
    .then(offer => localConnection.setLocalDescription(offer))
    .then(() => remoteConnection.setRemoteDescription(localConnection.localDescription))
    .then(() => remoteConnection.createAnswer())
    .then(answer => remoteConnection.setLocalDescription(answer))
    .then(() => localConnection.setRemoteDescription(remoteConnection.localDescription))
    .catch(handleCreateDescriptionError);
  }
    
  // Callback executed when the createAnswer() request for
  // the remote connection finishes up.
  function gotRemoteDescription(theDescription) {
    remoteConnection.setLocalDescription(theDescription);
    localConnection.setRemoteDescription(theDescription);
  }
  
  // Handle ICE callback for the remote connection.
  function remoteICECallback(event) {
    if (event.candidate) {
      localConnection.addIceCandidate(event.candidate,
              handleLocalAddCandidateSuccess, handleRemoteAddCandidateError);
    }
  }
  
  // Handle errors attempting to create a description;
  // this can happen both when creating an offer and when
  // creating an answer. In this simple example, we handle
  // both the same way.
  function handleCreateDescriptionError(error) {
    console.log("Unable to create an offer: " + error.toString());
  }
  
  // Handle successful addition of the ICE candidate
  // on the "local" end of the connection.
  function handleLocalAddCandidateSuccess() {
    connectButton.disabled = true;
  }

  // Handle successful addition of the ICE candidate
  // on the "remote" end of the connection.
  function handleRemoteAddCandidateSuccess() {
    disconnectButton.disabled = false;
  }

  // Handle an error that occurs during addition of ICE candidate.
  function handleAddCandidateError() {
    console.log("Oh noes! addICECandidate failed!");
  }

  // Handles clicks on the "Send" button by transmitting
  // a message to the remote peer.
  function sendMessage() {
    var message = messageInputBox.value;
    sendChannel.send(message);
    
    // Clear the input box and re-focus it, so that we're
    // ready for the next message.
    messageInputBox.value = "";
    messageInputBox.focus();
  }
  
  // Handle status changes on the send channel.
  function handleSendChannelStatusChange() {
    if (sendChannel) {
      var state = sendChannel.readyState;
    
      if (sendChannel.readyState === "open") {
        messageInputBox.disabled = false;
        messageInputBox.focus();
        sendButton.disabled = false;
        disconnectButton.disabled = false;
        connectButton.disabled = true;
      } else {
        messageInputBox.disabled = true;
        sendButton.disabled = true;
        connectButton.disabled = false;
        disconnectButton.disabled = true;
      }
    }
  }
  
  // Handle events that occur on the receiver's channel.
  function receiveChannelCallback(event) {
    receiveChannel = event.channel;
    receiveChannel.onmessage = handleReceiveMessage;
    receiveChannel.onopen = handleReceiveChannelStatusChange;
    receiveChannel.onclose = handleReceiveChannelStatusChange;
  }
  
  // Handle onmessage events for the receiving channel.
  // These are the data messages sent by the sending channel.
  function handleReceiveMessage(event) {
    var el = document.createElement("p");
    var txtNode = document.createTextNode(event.data);
    
    el.appendChild(txtNode);
    receiveBox.appendChild(el);
  }
  
  // Handle status changes on the receiver's channel.
  function handleReceiveChannelStatusChange() {
    if (receiveChannel) {
      console.log("Receive channel's status has changed to " +
                  receiveChannel.readyState);
    }
    
    // Here you would do stuff that needs to be done
    // when the channel's status changes.
  }
  
  // Close the connection, including data channels if they're open.
  // Also update the UI to reflect the disconnected status.
  function disconnectPeers() {
  
    // Close the RTCDataChannels if they're open.
    sendChannel.close();
    receiveChannel.close();
    
    // Close the RTCPeerConnections
    localConnection.close();
    remoteConnection.close();

    sendChannel = null;
    receiveChannel = null;
    localConnection = null;
    remoteConnection = null;
    
    // Update user interface elements
    connectButton.disabled = false;
    disconnectButton.disabled = true;
    sendButton.disabled = true;
    
    messageInputBox.value = "";
    messageInputBox.disabled = true;
  }
  
  // Set up an event listener which will run the startup
  // function once the page is done loading.
  window.addEventListener('load', startup, false);
  
})();
    
// END FILE: NO MORE CODE BELOW THIS!
});