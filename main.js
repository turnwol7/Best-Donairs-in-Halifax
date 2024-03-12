/*
justin bishop
prog2056
march 12, 2024
assignment 3
*/

import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import MousePosition from 'ol/control/MousePosition.js';
import { createStringXY } from 'ol/coordinate';

//add style modules

import { Style, Icon, Stroke, Fill } from 'ol/style';

//add geojson modules
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector as VectorSource } from 'ol/source'

// Initialize the map after the DOM loads
document.addEventListener("DOMContentLoaded", init);

// Maps build
let basemap1 = new TileLayer({
  source: new OSM({
    url: "https://{a-c}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png"
  })
});
let basemap2 = new TileLayer({
  source: new OSM({
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
  })
});

//function to make the map data
function addLayers(map) {

  //define restaurant geojson layer
  let restFile = './donairs.geojson'
  let restLyr = new VectorLayer({
    source: new VectorSource({
      url: restFile,
      format: new GeoJSON()
    }),
    style: restStyle
  });

  //define restaurant geojson layer
  let munFile = './donarea.geojson'
  let munLyr = new VectorLayer({
    source: new VectorSource({
      url: munFile,
      format: new GeoJSON()
    }),
    style: munStyle
  });

  //add layer to map
  // Add layers to map
  map.addLayer(restLyr);
  map.addLayer(munLyr);


  //toggle the boxes for the maps
  document.getElementById('toggleRestaurants').addEventListener('change', function () {
    restLyr.setVisible(this.checked);
  });

  document.getElementById('toggleArea').addEventListener('change', function () {
    munLyr.setVisible(this.checked);
  });
}

//init function runs the map build
function init() {
  const map = new Map({
    target: 'mainMap',
    layers: [basemap1, basemap2],
    view: new View({
      center: fromLonLat([-63.5821, 44.6527]),
      zoom: 11
    })
  });

  //xy coords for the display
  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
  });

  map.addControl(mousePositionControl);

  // Basemap radio buttons to show map
  const basemapRadio1 = document.getElementById('basemap1');
  const basemapRadio2 = document.getElementById('basemap2');

  basemapRadio1.addEventListener('change', () => {
    if (basemapRadio1.checked) {
      basemap1.setVisible(true);
      basemap2.setVisible(false);
    }
  });

  basemapRadio2.addEventListener('change', () => {
    if (basemapRadio2.checked) {
      basemap1.setVisible(false);
      basemap2.setVisible(true);
    }
  });

  // Call addWindsorLayers function to add geojson symbolized files
  addLayers(map);
}

//declare styles 
let munStyle = new Style({
  stroke: new Stroke({
    color: 'orange',
    width: 2,
  }),
  fill: new Fill({
    color: 'rgba(255, 255, 0, 0.1)' // Yellow color with 50% opacity
  })
});
let restStyle = new Style({
  image: new Icon({
    src: 'download.png',
    scale: 0.1
  })
});

//sources
//chat.openai.com
//openlayers.org