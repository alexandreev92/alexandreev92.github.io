// Инициализация карты
let map = L.map('map').setView([0, 0], 1);

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
let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=s,s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
// googleStreets.addTo(map)

// let other = L.layerGroup([lg_units, tr_places, cs_places]).addTo(map)

let Basemaps = {
        "OSM": osm,
        "Voyager": voyagerMap,
        "Google": googleStreets
    }
L.control.layers(Basemaps).addTo(map);

if (!navigator.geolocation) {
    console.log('Ваш браузер не поддерживает геолокацию')
} else {


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
    //map.fitBounds(featureGroup.getBounds())


    console.log("Ваши координаты: Широта: "+ lat +" Долгота: "+ long +" Точность: " + accuracy);

}
