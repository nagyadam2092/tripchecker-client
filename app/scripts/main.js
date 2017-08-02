/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here

  var phpPostLocation = 'php/postpos.php';
  var phpGetLocation = 'php/getpos.php';

  var weatherAPILocation = 'https://api.darksky.net/forecast/ee512ca7f5ff5f482663570af2cc1d6e/46.9128663,17.88800059999994';

  var pos = {
    lat: null,
    lng: null
  };

  var haller = {
    x: 47.4764785,
    y: 19.0811516
  };
  var vac = {
    x: 47.7841803,
    y: 19.135178099999962
  };
  var monor = {
    x: 47.3480638,
    y: 19.440129100000036
  };
  var siofok = {
    x: 46.9090603,
    y: 18.074623900000006
  };
  var szekesfehervar = {
    x: 18.074623900000006,
    y: 18.422135799999978
  };
  var veszprem = {
    x: 47.1028087,
    y: 17.909301899999946
  };
  var keszthely = {
    x: 46.7654716,
    y: 17.247955400000023
  };
  var hunor = {
    x: 47.520899,
    y: 18.920212
  };
  var annatanya = {
    x: 47.426359,
    y: 18.931243999999992
  };

  var z = {
    x: 0,
    y: 0
  };
  var x = {
    x: 2,
    y:0
  };
  var y = {
    x: 3,
    y: 3
  };

  var KarikaTour2017 = [
    {
      from: monor,
      to: vac,
      day: 28
    },
    {
      from: hunor,
      to: annatanya,
      day: 29
    },
    {
      from: hunor,
      to: haller,
      day: 30
    }
  ];

  function getRandomQuote() {
    var quotes = [
      'Get ripped, get laid.',
      'Pain is weakness leaving the body.',
      'Being defeated is often a temporary condition. Giving up is what makes it permanent.',
      'Failure is only a temporary change in direction to set you straight for your next success.',
      'If you fail to prepare, you prepare to fail.',
      'The worst thing you can be is average.',
      'Go hard or go home.',
      'When it starts to hurt, thats when the set starts.',
      'With great size comes great responsibility.',
      'Winners Train, Losers Complain.',
      'A winner never whines.',
      'You don’t demand respect, you earn it.',
      'Good is not enough if better is possible.',
      'If the bar ain’t bending you‘re just pretending.',
      'The only time Success comes before Work is in the dictionary',
      'No pain, no gain.',
      'Never say the skys the limit when there are footprints on the moon.',
      'Education is important. Bud big biceps are importanter.',
      'More pain, more pussy.',
      'Life´s too short to be small',
      'Some people want it to happen, some wish it would happen, others make it happen.',
      'If you dont live for something you’ll die for nothing',
      'Obsession is what lazy people call dedication.',
      'I got 99 problems but a BENCH ain’t one.',
      'If you’re not first, you’re last.',
      'Fall down seven times, get up eight.',
      'When my body ‘shouts’ STOP, my mind ‘screams’ NEVER.',
      'When you’re not training, someone else is.',
      'A pint of sweat will save a gallon of blood.',
      'Second place is just a spot for the first looser.',
      'Sweat is just fat crying.',
      'Making excuses burns ZERO calories per hour.',
      'Pain is temporary, pride is forever.',
      'Do something today that your future self will thank you for.',
      'You can only fail if you quit.',
      'Excuses don’t burn calories.',
      'Life is like exercise.  The harder it is, the stronger you become.',
      'To change your body, you must first change your mind.',
      'Why would you choose failure when success is an option?',
      'A mile a day keeps the pounds away.',
      'Just do it.  Then do it again.',
      'Do it for the after picture.',
      'It never gets easier, you just get stronger.',
      'If plan “A” didn’t work, the alphabet has 25 other letters.',
      'If it doesn’t challenge you, it doesn’t change you.',
      'If you are next to me the answer is yes. YES, we are racing.',
      'No alarm clock needed, my PASSION wakes me.'
    ];

    console.log(quotes.length);
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  function getRandomInt8020() {
    return Math.floor(Math.random() * (80 - 20 + 1)) + 20;
  }

  function animateUnic() {
    var pos1 = {
      top: getRandomInt8020() + '%',
      left: '-' + $('.unic').width() + 'px'
    };
    var pos2 = {
      top: getRandomInt8020() + '%',
      left: '100%'
    };
    $('.unic').css({top: pos1.top});
    $('.unic').css({left: pos1.left});
    $('.unic').stop().animate(pos2, 7000);
  }

  function sqr(x) { return x * x }
  function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
  function distToSegmentSquared(p, v, w) {
    var l2 = dist2(v, w);
    if (l2 == 0) return dist2(p, v);
    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return dist2(p, { x: v.x + t * (w.x - v.x),
      y: v.y + t * (w.y - v.y) });
  }
  // p: point where you are
  // v: from, w: to segment ending ponts
  function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }

 function distFromPTov(p, v) {
    return Math.sqrt(dist2(p, v));
 }

 function getClosestPointPercentage(p, v, w) {
    var pToV = distFromPTov(p, v);
    var pToSegment = distToSegment(p, v, w);
    var distFromVToClosest = Math.sqrt(sqr(pToV) - sqr(pToSegment));
    var segmentDist = Math.sqrt(dist2(v, w));

    return distFromVToClosest / segmentDist;
 }

  var getTourByDay = function(day) {
    var today = day || new Date().getDate();
    var filtered = KarikaTour2017.filter(function(d) {
      return today === d.day;
    });
    return filtered[0] || {from: vac, to: monor};
  };

  function getRandomColor() {
    var colors =[ 'black', 'brown', 'green', 'purple', 'yellow', 'blue', 'gray', 'orange', 'red', 'white' ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  function geoFindMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation){
      $('#console').text("Geolocation is not supported by your browser");
      return;
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      pos.lat = latitude;
      pos.lon = longitude;
      var tour = getTourByDay();

      var percentage = Math.round(
        getClosestPointPercentage({
        x: latitude,
        y: longitude
      }, tour.from, tour.to) * 100);
      percentage = percentage > 100 ? 100 : percentage;
      percentage = percentage < 0 ? 0 : percentage;

      if (percentage > 95) {
        animateUnic();
      }

      console.log(percentage, tour);

      $('#state').animate({width: percentage + '%'}, { queue: false, duration: 1500 });
      if (percentage < 34) {
        $('#state').css('background-color', 'tomato');
      } else if (percentage < 67) {
        $('#state').css('background-color', 'gold');
      } else {
        $('#state').css('background-color', 'limegreen');
      }

      $('#console').text(percentage + '%');

      $.post(phpPostLocation, {
        lat: latitude,
        lng: longitude
      });
    }

    function error() {
      $('#console').text("Unable to retrieve your location");
    }


    $('#console').text('Loading...');

    // $('#guestmap').attr('src', "https://maps.googleapis.com/maps/api/staticmap?center=" + hunor.x + "," + hunor.y + "&zoom=13&size=300x300&sensor=false");

    navigator.geolocation.getCurrentPosition(success, error);
  }

  $('footer').on('click', function() {
    geoFindMe();

    if (pos.lat && pos.lon) {
      // $('#img').attr('src', "https://maps.googleapis.com/maps/api/staticmap?center=" + pos.lat + "," + pos.lon + "&zoom=13&size=300x300&sensor=false");
    }

    animateUnic();
  });

  $('.mdl-layout__content').css('padding-bottom', ($('footer').height() + 10) + 'px');

  geoFindMe();

  $.get(phpGetLocation).done(function(data) {
    var last = data[0];
    var mapsUrl = "https://maps.googleapis.com/maps/api/staticmap?center="
      + last.lat + "," + last.lng + "&zoom=11&size=300x300&sensor=false&";
    var gMapsUrl = 'https://www.google.com/maps/dir//';
    for (var i=0; i<data.length; i++) {
      var pos = data[i];
      mapsUrl += "markers=color:" + getRandomColor() + "|" + pos.lat + "," + pos.lng + "&";
      gMapsUrl += pos.lat + ',' + pos.lng + '/';
    }
    $('#guestgooglemaplink').attr('href', gMapsUrl)
    $('#guestmap').attr('src', mapsUrl);
  });

  window.addEventListener("focus", geoFindMe, false);

  $('#quote').text(getRandomQuote());
  $('#hardrefresh').on('click', function() {
    location.reload(true);
  });

})();

// still TODO:
// weather
// guest map
