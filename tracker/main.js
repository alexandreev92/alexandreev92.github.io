// Инициализация карты
let map = L.map('map').setView([52.584857, 39.519043], 10);

// OSM Слой
let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 1,
    maxZoom: 18,
    attribution: "Andreev's Development, 2023"
});
osm.addTo(map);

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
    map.fitBounds(featureGroup.getBounds())


    console.log("Ваши координаты: Широта: "+ lat +" Долгота: "+ long +" Точность: " + accuracy);

}
