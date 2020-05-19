
$(".map").height($(window).height() - $(".navigation").height());
$(window).resize(function() {
  $(".map").height($(window).height() - $(".navigation").height());
});
var mymap = L.map('map').setView([16.4163895, 120.5930634], 14);

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', minZoom: 0, maxZoom: 18});

var mapLink =
  '<a href="http://www.esri.com/">Esri</a>';
var wholink =
  'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
var sat = L.tileLayer(
  'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; ' + mapLink + ', ' + wholink, minZoom: 10
    // maxZoom: 18,
  });

var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
  	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  	subdomains: 'abcd',
  	minZoom: 0,
  	maxZoom: 18,
  	ext: 'png'
  });

var lyr = L.tileLayer('/webtiles/{z}/{x}/{y}.png', {tms: true, opacity: 0.5, attribution: "", minZoom: 0, maxZoom: 18});

mymap.addLayer(sat);
var baseLayers = {
  // "Grayscale": grayscale,
  "Streets": osm,
  "Satellite": sat,
  "Terrain": Stamen_Terrain
};

var img_baguiio_4326_0 = 'images/baguiio_4326_0.png';
var img_new_baguio = 'images/nowcast.jpeg'
var img_nowcast_png = 'images/nowcast.png'
var img_bound_nowcast = [[16.3638125,120.5463125], [16.4424867,120.6321868]]
var img_bounds_baguiio_4326_0 = [[12.720049108418305,119.89173882986715],[19.144292032151174,125.14853383075729]];
var layer_baguiio_4326_0 = new L.imageOverlay(img_baguiio_4326_0, img_bounds_baguiio_4326_0, {opacity:0.3});
var layer_new_baguio = new L.imageOverlay(img_nowcast_png, img_bound_nowcast, {opacity: 0.7})
var overlaymaps = {
    "Susceptibility map" : layer_baguiio_4326_0,
    "PLA_exampke" : layer_new_baguio,
    "webtiles": lyr
};

// legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["#ff0000", "#ff9933"],
        labels = ["Very High", "High"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            `<i style="background:${grades[i]};"></i> ` +
            labels[i] + '<br>';
    }

    return div;
};

mymap.on('add', function(ev) {
  alert(ev.name);
});

L.control.layers(baseLayers, overlaymaps).addTo(mymap);
legend.addTo(mymap);
