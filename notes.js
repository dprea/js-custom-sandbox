/*
* ----------------------------------------------------------------------
* notes.js / notes.js.txt
* ----------------------------------------------------------------------
* 
* ----------------------------------------------------------------------
* Description: This file is a place to keep personal notes.
* ----------------------------------------------------------------------
*/

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