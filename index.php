<!DOCTYPE html>
<html lang="US-en">
	<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
            
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,300italic,400italic|Actor' rel='stylesheet' type='text/css'>
        <meta name='robots' content='noindex,follow' />
            
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,300italic,400italic' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="/wildnotes/css/main.css" type="text/css">
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                                                                            
        <title>Wild Notes</title>

        <meta name="description" content="Wild Notes | Location based art discovery platform"/>
        <meta name="robots" content="noodp"/>
        <link rel="canonical" href="https://dev.stevenjacobprice.com/wildnotes" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Wild Notes" />
        <meta property="og:description" content="Wild Notes | Location based art discovery platform" />
        <meta property="og:url" content="https://dev.stevenjacobprice.com/wildnotes" />
        <meta property="og:site_name" content="Wild Notes" />
            
        <script src="https://use.fontawesome.com/releases/v5.0.8/js/solid.js"></script>
        <script src="https://use.fontawesome.com/releases/v5.0.8/js/fontawesome.js"></script>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzMptg8M3BHvsSy2Rn75FlWqaanv8akOE"></script>
        <script type='text/javascript' src='/wildnotes/js/geolocation-marker.js'></script>
    </head>
    <body>
        <div id="wild_notes">
            <header>
                <img v-show="allow_geolocation" class="site-logo" src="/wildnotes/img/logo_small.svg" alt="wild notes logo">
                <p class="location-status">You haven't reached a marker yet.</p>
            </header>
            <div class="explore">
                <div id="content_map"></div>
                <div class="locked-content" onclick="toggleMessage(this);">
                    <p>Sorry, this content is locked! Move closer to the contents location and try again.</p>
                </div> 
                <div class="unlocked-content" onclick="toggleMessage(this);">
                    <p>Content unlocked!</p>
                    <!-- <div class="responsive-video" data-video-src="/wildnotes/content/overpass-clip.mp4"></div> -->
                    <!-- <div class="responsive-embed" id="video_container">
                        <iframe src="https://www.youtube.com/embed/Al5W-HfkJos?rel=0&controls=0&showinfo=0" frameborder="0" allowfullscreen></iframe>
                    </div> -->
                </div>
            </div>
            <div class="lookup">
                <label>
                    <input type="text" class="location-search" value="" placeholder="Milwaukee, WI">
                    <span class="fa-layers fa-fw">
                        <i class="fas fa-circle"></i>
                        <i class="fa-inverse fas fa-location-arrow" data-fa-transform="shrink-6" onclick="toggleLookup();"></i>
                    </span>
                </label>
            </div>
            <div class="landing" v-if="!allow_geolocation">
                <div class="landing-header">
                    <img src="/wildnotes/img/logo_full.svg" alt="Wild Notes Logo" class="full-logo">
                </div>
                <div class="landing-content">
                    <p>Get Current Location</p>
                    <img class="geolocation-icon" src="/wildnotes/img/geolocation_icon.svg" alt="geolocation button" @click="initGeolocation">
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script type='text/javascript' src='/wildnotes/js/content.js'></script>
        <script type='text/javascript' src='/wildnotes/js/random-location.js'></script>
        <script type='text/javascript' src='/wildnotes/js/geomap.js'></script>
        <script type='text/javascript' src='/wildnotes/js/main.js'></script>
    </body>
</html>