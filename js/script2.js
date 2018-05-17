var stops;

/**********-https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition-**********/

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

/**********-https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition-**********/

/**********-https://www.papaparse.com/-**********/

//Papa.parse("../stops/gps_przystanki_zdzit_20180501.csv", {
//	download: true,
//	complete: function(results) {
//		getStops(results.data);
//	}
//});

/**********-https://www.papaparse.com/-**********/

/**********-get-stops-**********/

function getStops() {
   Papa.parse("../stops/gps_przystanki_zdzit_20180501.csv", {
       download: true,
       complete: function (results) {
           let points = results.data[1][3].split(",");
//           var min = Math.sqrt();
           for(let i = 1; i < results.data.length; i++) {
               console.log(results.data[i][3]);
           }
           
       }
   });
    navigator.geolocation.getCurrentPosition(success, error, options);
}

/**********-get-stops-**********/

getStops();
