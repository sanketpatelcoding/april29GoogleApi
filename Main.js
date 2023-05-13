//javascript.js
//set map options
var myLatLng = { lat:43.651890, lng: -79.381706 };
var mapOptions = {
    center: myLatLng,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

// sample code input Start 
function startMap() {
            
    const marker= new google.maps.Marker({
        position: new google.maps.LatLng(43.651890, -79.381706),
        map: map,
        animation:google.maps.Animation.Drop
     });
   
//      new google.maps.Circle({
//         strokeColor: "blue",
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: "#FFF",
//         fillOpacity: 0.5,
//         map,
//         center: myLatLng,
//         radius: 600,
// });

// new google.maps.Rectangle({
//     strokeColor: "#FF0000",
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: "#FF0000",
//     fillOpacity: 0.35,
//     map,
//     bounds: {
//       north: 43.64,
//       south: 43.66,
//       east: -79.35,
//       west: -79.39,
//     },
//   });

 

            // get cordinations with click event
 // Create the initial InfoWindow.
 let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: { lat:43.661890, lng: -79.384706 },
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });

        }
window.startMap = startMap;
// samplecode  output end

//create map
//var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);




//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);



//draw radious withinputin webform
function drawCircle()
   {
     

    new google.maps.Circle({
        strokeColor: "blue",
        strokeOpacity: 0.86,
        strokeWeight: 2,
        fillColor: "#FFF",
        fillOpacity: 0.5,
        map,
        center: myLatLng,
        radius: Number(document.getElementById('circle').value),
});

   }

   function  drawRectangle(){

    new google.maps.Rectangle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        bounds: {
          north: Number(document.getElementById('north').value),
          south: Number(document.getElementById('south').value),
          east: Number(document.getElementById('east').value),
          west: Number(document.getElementById('west').value),
        },
      });

   }




//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
