/*
* ----------------------------------------------------------------------
* notes.js / notes.js.txt
* ----------------------------------------------------------------------
* 
* ----------------------------------------------------------------------
* Description: This file is a place to keep personal notes.
*   Added the original files to make the Note Code Work. 
*   Since I have not properly used a VCS with this app, this file
*   sorta acts like it. 
*
* TODO: Break this version of the app into a git branch called 'Old'
* TODO: In the master branch remove this file completely. 
* TODO: Properly use a VCS to manage versions and branches to keep
*   track of the progress of the app.
* TODO: Consider moving code and explanations from here to the Git Wiki. 
*   Counter Point to Wiki: Having the Notes.js file allows me to quickly
*   reference old code and my own documentation without switching apps. 
*   Conclusion: Still use BitBucket or GitHub either way. 
* ----------------------------------------------------------------------
*/
    
    // Init App
    var app = {
        name: 'JS Factory Playground',
        version: '0.4.3',
        author: 'Dustin Rea',
        description: 'A sandbox for playing with JS functionality.'
    };
    
    // Gets the <body id="app" name="app"></body> of the document
    app.html = document.getElementById('app');
    
    /*
    * ----------------------------------------------------------------------
    * Vanilla Poll for new data.
    * Mimics client-side data-binding
    * ----------------------------------------------------------------------
    * TODO: Add Polling State Switch 
    *   PSEUDO: app.startPoll{ on: || off: = function(currentCode); }
    */
    
    // Polling
    app.commentPollSpeed = 30;
    // Element Target to show client Poll Speed
    app.commentPollSpeedElement = document.getElementById('comment-poll-speed');
    // Convert the Speed.toString() and insert the text into the element. 
    app.commentPollSpeedElement.innerText = app.commentPollSpeed.toString() + 'ms';
    
    // Comment Element Targets
    app.newComments = document.getElementById('new-comments-id');
    app.outputTarget = document.getElementById('new-commments-text-id');

    app.startPoll = function() {
        setInterval(function() {
            app.inputText = document.getElementById('comment-id');
            // Store the input text (value) in an output var
            app.outputText = app.inputText.value; // For input value ~ innerText()
            
            // Don't do anything until the input changes
            if(app.outputText != '') {
                // Display the Text in input as a preview
                app.outputTarget.innerText = (app.outputText);
                
                // Create the new element to contain the comment
                var el = app.factory.section();
                // Add ouputText to outputElement
                el.innerText = app.outputText + '\n'; 
                // Append the new element to the comments
                app.newComments.appendChild(el); 
            }
        }, app.commentPollSpeed);
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
    
    // Generate the new elements
    var newHeader = app.factory.header();
    var newSection = app.factory.section();
    var newFooter = app.factory.footer();
    
    // Append the new elements to the document
    app.html.insertBefore(newHeader, app.html.childNodes[0]);
    // app.html.appendChild(newHeader);
    app.html.insertBefore(newSection, app.html.childNodes[1]);
    app.html.appendChild(newFooter);

    /*
    * ----------------------------------------------------------------------
    *   Below is some Wiki type documentation
    *   I kept the code in with explnations below
    *   for self reference.  
    * ----------------------------------------------------------------------
    */
    // Init the new header and append immediately.
    // This method has no internal reference to the dom el
    // ?? Think the only way to retrieve is to DOM lookup.
    //app.html.appendChild(app.factory.header());
    
    // Init newSection then Append.
    // By First Init the factory into a var we have access to it
    //var newSection = app.factory.section(); 
    //app.html.appendChild(newSection);
    
    /*
    * ----------------------------------------------------------------------
    *   END WIKI DOC FOR SELF REFERENCE
    * ----------------------------------------------------------------------
    */
    
    /**
    
       navigator.getUserMedia = 
        navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
  
    var video = document.querySelector('video');
    var constraints = {audio: true, video: true};
    var videocamErrorElement = document.querySelector('#videocamError');
    
     function successCallback(stream) {
      window.stream = stream; // stream available to console
      if (window.URL) {
        video.src = window.URL.createObjectURL(stream);
      } else {
        video.src = stream;
      }
    }
    
    function errorCallback(error){
      console.log('navigator.getUserMedia error: ', error);
    }
    
    navigator.getUserMedia(constraints, successCallback, errorCallback);
    
    */
    
    
    
    /**
     * 
     *  Alternative older impplementation of WebRTC
     *  From Source: http://www.html5rocks.com/en/tutorials/webrtc/basics/#toc-tools
     *  Possible Source: https://webrtc.github.io/samples/src/content/getusermedia/gum/js/main.js
     * 
     */
     
         /*
    var video = document.querySelector('video');
    var constraints = window.constraints = {
      audio: false,
      video: true
    };
    var videocamErrorElement = document.querySelector('#videocamError');
    
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
           var videoTracks = stream.getVideoTracks();
           console.log('Got stream with constraints:', constraints);
           console.log('Using video device: ' + videoTracks[0].label);
           stream.onended = function() {
               console.log('Stream-ended');
           };
           window.stream = stream; // Make variable available to browser console.
           video.srcObject = stream;
        })
        .catch(function(error) {
           if(error.name === 'ContraintNotSatisfiedError') {
               videocamError('The resolution ' + constraints.video.video.width.exact + 'x' + constraints.video.width.exact + ' px is not supported by your device.');
           } else if (error.name === 'PermissionDeniedError') {
               videocamError('Permissions have not been granted to use your camera and ' +
               'microphone.  You need to allow the page access to your devices in ' +
               'order for the demo to work.');
           }
           videocamError('getUserMedia.error: ' + error.name, error);
        });
    
    function videocamError(msg, error) {
        videocamErrorElement.innerHTML += '<p>' + msg + '</p>';
        if(typeof error !== 'undefined') {
            console.error(error);
        }
    }
    */