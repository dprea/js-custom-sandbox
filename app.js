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
* Description: This file is a place to keep personal notes.
* ----------------------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", function() {
    // ----------------------------------------------------------------------
    // MASTER TODO LIST: 
    // ----------------------------------------------------------------------
    // TODO: Add Polling State Switch 
    // TODO: Add app.factory.webRTCElement = function(params) {};
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
    app.commentPollSpeed = 1000;
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
    
    /*
    * ----------------------------------------------------------------------
    * WebRTC Bulit into the App
    * myVersion: 0.2.0 - Below Code gets Video stream and Audio stream.
    * ----------------------------------------------------------------------
    * TODO: Add app.factory.webRTCElement = function(params) {};
    * ----------------------------------------------------------------------
    */
    
    app.getUserVideoandAudio = function() {
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
            videocamErrorElement.innerText = error; // New: Might break code?
        }
        
        navigator.getUserMedia(constraints, successCallback, errorCallback);
    }
    
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

    app.getUserVideoandAudio();
    
    
// END FILE: NO MORE CODE BELOW THIS!
});