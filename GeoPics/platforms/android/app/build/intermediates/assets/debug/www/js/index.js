/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

let pictureSource;   // picture source
let destinationType; // sets the format of returned value 
let latitude = undefined; 
let longitude = undefined;



app = {
    // Application Constructor
    initialize: () =>{
        console.log("device started")
        document.addEventListener('deviceready', onDeviceReady.bind(this), true);
    },
    capturePhoto: () =>{
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL});
        navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, {
                enableHighAccuracy: true
        });
    },
    // Update DOM on a Received Event
    receivedEvent: (id) =>{
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

 // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
let onDeviceReady =  () =>{
    app.receivedEvent('deviceready');
}
let onPhotoDataSuccess = (imageData) =>{
    // Get image handle
    let largeImage = document.getElementById('largeImage');
     // Unhide image elements
     //
     largeImage.style.display = 'block';
     // Show the captured photo
     // The inline CSS rules are used to resize the image
     //
     document.getElementById("label").innerHTML = (latitude !== undefined && longitude !== undefined)?
         new Date() + " (latitude, longitude) is ("+ latitude +","+ longitude+")":
         "Latitude, longitude not read."
     largeImage.src = "data:image/jpeg;base64," + imageData;
}
let onMapSuccess = (position) =>{
    latitude = position.coords.latitude;
	longitude = position.coords.longitude;
}

// Error callbacks

let onMapError = (error) =>{
	console.log(
		'code: ' + error.code + '\n' + 'message: ' + error.message + '\n'
	);
}
let onFail= (message)=>{
    alert("ERROR: ",message);
}


app.initialize();

document.getElementById('capture').onclick = app.capturePhoto;