// This array contains the coordinates for all bus stops between MIT and Harvard
const markers = [];
const busColor = [
  "DarkTurquoise",
	"LightPink",
	"LightGrey",
	"MistyRose",
	"Coral",
	"Lavender",
	"PaleVioletRed",
	"LightSalmon",
	"LightSeaGreen",
	"PeachPuff",
	"Plum",
	"RosyBrown",
	"SteelBlue",
	"Teal",
	"Tomato",
	"MediumTurquoise",
];



// TODO: add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoidGhlc291bGZpdCIsImEiOiJja212MW8xMHkwMHVxMndtejNmczFlYmxuIn0.AOXhGAWBCopOhICApd6Eig';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
centre : [-71.051268,42.364120],
});
  




// TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"


async function run(){
  const location = await GetBusLocations();
  console.log(new Date());
 // console.log(location)
  
  let i=0
  location.forEach((stop)=> {
    
      i++;
      //console.log(stop);
      if (!markers[stop.id]) {
        
        markers[stop.id] = new mapboxgl.Marker({
          color: busColor[i],
          })

//console.log(markers[stop.id]);
        
        
       } else {
         if(markers[stop.id]._lngLat.lng === stop.attributes.longitude){
           console.log('Bus ' + stop.id + ' of color' + busColor[i] + ' is static')
       }  
        }
        
        markers[stop.id].setLngLat([stop.attributes.longitude, stop.attributes.latitude])
            .addTo(map);
       
           
          
  }); 
  //timer
  setTimeout(run, 15000)

}

async function GetBusLocations(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip'
  const response = await fetch(url);
  const json = await response.json();
  return json.data
}


console.log(markers);

run();
