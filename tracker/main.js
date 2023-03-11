let accuracyView = document.querySelector('.accuracy')

// Инициализация карты
let map = L.map('map').setView([0, 0], 1);

// Инициализация Location
L.control.locate().addTo(map);

// OSM Слой
let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //attribution: "Andreev's Development, 2023"
});
osm.addTo(map);

// Лесная карта
let voyagerMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});
// voyagerMap.addTo(map)


//google map
let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
// googleStreets.addTo(map)

let OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

let CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var EsriSatelite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
// let other = L.layerGroup([lg_units, tr_places, cs_places]).addTo(map)

var OSM_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

let Basemaps = {
        "OSM": osm,
        "OSM-HOT": OSM_HOT,
        "Велокарта": CyclOSM,
        "Voyager": voyagerMap,
        "Топокарта": OpenTopoMap,
        "Google": googleStreets,
        "ERSI(Спутник)": EsriSatelite,
    }
L.control.layers(Basemaps).addTo(map);

if (!navigator.geolocation) {
    console.log('Ваш браузер не поддерживает геолокацию')
} else {

    var options = {
        enableHighAccuracy: true,
        
      };

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 500)
}

let marker, circle;

function getPosition(position){
    // console.log(position);
    // Получили и записали в переменные Широту, Долготу, Точность
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let accuracy = position.coords.accuracy
    
    if (marker) {
        map.removeLayer(marker)
    }

    if (circle) {
        map.removeLayer(circle)
    }

   // Создаём маркер геопозиции и добавляем круг с радиусом точности
    marker = L.marker([lat, long])
    circle = L.circle([lat, long], {radius: accuracy})
    
    // Объединяем их в одну группу и добавляем на карту 
    let featureGroup = L.featureGroup([marker, circle]).addTo(map)

    // Центрируем карту на выбранной группе маркера с кругом
    marker.on('click', ()=>{
        map.fitBounds(featureGroup.getBounds());

    })
	
accuracyView.innerHTML = "Точность: " + accuracy.toFixed(2) +"м";
    console.log("Ваши координаты: Широта: "+ lat +" Долгота: "+ long +" Точность: " + accuracy.toFixed(2));

}
