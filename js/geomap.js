function lookupController () {
  let lookupElem = document.querySelector('.lookup');
  let lookupInput = lookupElem.querySelector('.location-search');
  if (lookupElem.hasAttribute('show') && lookupInput.value != '') {
    lookupLocation(lookupInput.value);
  }
}

function lookupLocation (location) {
  // TODO: Only request geolocation information in response to a user gesture.
  // 1a. check if current location is turned on
  // 1b. if current location is disabled have google lookup what was input into the search
  // 2. if the location is valid update the current location
  // 3. if the location is invalid tell the user to try again
}

let geoMarkers = [];
var contentMap,
  infoWindow,
  GeoMarker,
  contentOpen = false,
  mePosition = {
    coords: {
      lat: 43.02527,
      lng: -87.912873
    }
  };
var contentElem,
  lockedElem,
  statusElem;

// initialize google map
let initMap = function () {
  console.log({
    initMap: true
  });

  // DOM Cache
  contentElem = $('.unlocked-content');
  lockedElem = $('.locked-content');
  statusElem = $('.location-status');
  // map options
  var mapOptions = {
    zoom: 14,
    center: {lat: 43.02527, lng: -87.912873}, // 43.02527,-87.912873
    disableDefaultUI: true,
    gestureHandling: 'greedy',
    zoomControl: true,
    styles: [
      {
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#f5f5f5'
          }
        ]
      },
      {
        'elementType': 'labels.icon',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#616161'
          }
        ]
      },
      {
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#f5f5f5'
          }
        ]
      },
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#bdbdbd'
          }
        ]
      },
      {
        'featureType': 'administrative.neighborhood',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#eeeeee'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#757575'
          }
        ]
      },
      {
        'featureType': 'poi.business',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#e5e5e5'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'labels.text',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#9e9e9e'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#ffffff'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#757575'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#dadada'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#616161'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#9e9e9e'
          }
        ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#e5e5e5'
          }
        ]
      },
      {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#eeeeee'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#c9c9c9'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels.text',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#9e9e9e'
          }
        ]
      }
    ]
  };

  // create map
  contentMap = new google.maps.Map(document.getElementById('content_map'), mapOptions);
  function getLocation () {
    GeoMarker = new GeolocationMarker();
    let markerCenter;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        markerCenter = pos;
        contentMap.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, contentMap.getCenter());
      });
    }
    GeoMarker.setCircleOptions({
      fillColor: '#808080', 
      center: markerCenter
    });
    google.maps.event.addListener(GeoMarker, 'position_changed', function () {
      mePosition.coords = {
        latitude: GeoMarker.getPosition().lat(),
        longitude: GeoMarker.getPosition().lng()
      };
      // me_position.lng = GeoMarker.lng();
      console.log({
        position_changed: 'new position',
        me_position: mePosition.coords
      });

      // content_map.setCenter(this.getPosition());
      // content_map.fitBounds(this.getBounds());

      // check distance of content
      var last_url;
      var contentHtml = '';

      for (var i in contentLocations) {
        var distance = Geolocation.distance_from(contentLocations[i], mePosition);
        console.log({
          markerClose: Math.floor(randomLocation.distance(contentLocations[i], mePosition)) <= 1
        });
        // console.log({
        //   contentLocations: contentLocations[i],
        //   current_position: mePosition,
        //   distance: distance
        // });
        contentLocations[i].status = Geolocation.check_lockout_status(distance);
        if (contentLocations[i].status) {
          contentOpen = true;
          last_url = contentLocations[i].url;
          contentHtml += "<a class='content-link' href='" + contentLocations[i].url + "' target='_blank'>" + contentLocations[i].url + '</a><br>';
          // geoMarkers[contentLocations[i].video_id].infoWindow.setContent("<p class='location-status'>Content Unlocked!</p><a class='content-link' href='"+contentLocations[i].url+"' target='_blank'>"+contentLocations[i].url+"</a>");
          geoMarkers[contentLocations[i].video_id].setIcon('/wildnotes/img/marker_unlocked.svg');
        } else {
          // geoMarkers[contentLocations[i].video_id].infoWindow.setContent("<p class='location-status'>Content locked</p>");
          geoMarkers[contentLocations[i].video_id].setIcon('/wildnotes/img/marker_locked.svg');
        }
      }

      if (contentOpen) {
        console.log({
          lat: mePosition.coords.latitude,
          lng: mePosition.coords.longitude
        });

        statusElem.html("you're close, you've unlocked some content: <br>" + contentHtml + ' <span>DEBUG :: new position:' + mePosition.coords.latitude + ',' + mePosition.coords.longitude + '</span>');
      } else {
        statusElem.html("you're far, you've locked content <span>DEBUG :: new position:" + mePosition.coords.latitude + ',' + mePosition.coords.longitude + '</span>');
      }
    });

    google.maps.event.addListener(GeoMarker, 'geolocation_error', function (e) {
      alert('There was an error obtaining your position. Message: ' + e.message);
    });
    GeoMarker.setMap(contentMap);
  }
  // autoUpdate();
  // add markers from content location
  // console.log({
  //   contentLocations: contentLocations,
  //   contentLocations_length: contentLocations.length
  // });
  for (var i = 0; i < contentLocations.length; i++) {
    // console.log({
    //   add_markers: true
    // });
    addMarkers(contentLocations[i]);
  }
  function addMarkers (props) {
    // console.log({
    //   props: props
    // });
    var availableIcon = '/wildnotes/img/marker_unlocked.svg';
    var lockedIcon = '/wildnotes/img/marker_locked.svg';
    var markerIcon = lockedIcon;
    // change marker if unlocked
    if (props.status) {
      markerIcon = availableIcon;
    }
    geoMarkers[props.video_id] = new google.maps.Marker({
      position: randomCoords(mePosition),
      icon: markerIcon,
      map: contentMap,
      showContent: props.status
    });

    geoMarkers[props.video_id].status = props.video_id.status;
    geoMarkers[props.video_id].marker_id = props.video_id;

    // click marker
    geoMarkers[props.video_id].addListener('click', function (event) {
      // console.log({
      //   this: this,
      //   status: contentLocations[this.marker_id].status
      // });
      if (contentLocations[this.marker_id].status) {
        var content = '';
        if (contentLocations[this.marker_id].content_type == 'video') {
          content = "<a class='content-link' href='" + contentLocations[this.marker_id].url + "' target='_blank'>" + contentLocations[this.marker_id].url + '</a>';
        } else if (contentLocations[this.marker_id].content_type == 'photo') {
          content = "<img src='" + contentLocations[this.marker_id].url + "' alt=''>";
        }
        contentElem.html("<p class='message'>Content unlocked!</p><br><p>Artist: " + contentLocations[this.marker_id].artist_name + '</p><br>' + content).toggleClass('show');
      } else {
        lockedElem.toggleClass('show');
      }
    });
  }
  console.log({geoMarkers: geoMarkers});
  getLocation();
  return {
    getLocation: getLocation()
  }
};

function toggleMessage (elem) {
  console.log({
    elem: elem
  });
  $(elem).removeClass('show');
}

function handleErrors (error) {
  console.log({
    'handleErrors': error
  });
  switch (error.code) {
    case error.PERMISSION_DENIED: console.log('user did not share geolocation data');
      break;

    case error.POSITION_UNAVAILABLE: console.log('could not detect current position');
      break;

    case error.TIMEOUT: console.log('retrieving position timed out');
      break;

    default: console.log('unknown error');
      break;
  }
}
// Tool to handle checking distances
var Geolocation = {
  rad: function (x) { return x * Math.PI / 180; },

  // Distance in kilometers between two points using the Haversine algo.
  haversine: function (p1, p2) {
    var R = 6371;
    var dLat = this.rad(p2.latitude - p1.lat);
    var dLong = this.rad(p2.longitude - p1.lng);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.latitude)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return Math.round(d);
  },

  // Distance between hotspot and the current position.
  distance_from: function (videoPosition, currentLocation) {
    // console.log({
    //   video_position: video_position,
    //   current_location: current_location,
    // });
    var distance = Geolocation.haversine(videoPosition.coords, currentLocation.coords);
    return distance;
    // Geolocation.check_lockout_status(distance);
  },

  check_lockout_status: function (distance) {
    // Sugar: If distance is less than 1km, don't bump into me.
    if (distance && distance >= 1) {
      console.log({
        "you're far away": true,
        distance: distance
      });
      return false;
      // $("#distance").text(distance + " km");
    } else {
      console.log({
        "you're close": true,
        distance: distance
      });
      return true;
      // $("#user_distance").html("<strong>You're close!</strong> Watch my toes!");
    }
  }
};

/**
 * generate random coordinates based on current location
 */
function randomCoords (mePosition) {
  const P = {
    latitude: mePosition.coords.lat,
    longitude: mePosition.coords.lng
  };
  const R = 1000; // meters
  const randomPoint = randomLocation.randomCirclePoint(P, R);
  console.log({
    mePosition_coords: mePosition.coords,
    randomPoint: randomPoint
  });
  return {
    lat: randomPoint.latitude,
    lng: randomPoint.longitude
  };
}
