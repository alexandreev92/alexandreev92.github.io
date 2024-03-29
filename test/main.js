const places = [
    {
        id: 1,
        latitude: 52.595408,
        longitude: 39.527997,
        imgSrc: "1.jpg",
        title: "Мост через лог (Парк победы)",
        descr: "Здесь будет развёрнутое описание места которое нужно посетить пользователю для выполнения задания",
        done: false
    },
    {
        id: 2,
        latitude: 52.584701,
        longitude: 39.516152,
        imgSrc: "27mkr.png",
        title: "База на 27мкрн",
        descr: "Здесь будет развёрнутое описание места которое нужно посетить пользователю для выполнения задания",
        done: false
    },
    {
        id: 3,
        latitude: 52.518844,
        longitude: 39.490063,
        imgSrc: "lenino.png",
        title: "База на Рябиновой",
        descr: "Здесь будет развёрнутое описание места которое нужно посетить пользователю для выполнения задания",
        done: false
    },
    {
        id: 4,
        latitude: 51.090363,
        longitude: 41.641986,
        imgSrc: "4.jpg",
        title: "Тарзанка на озере",
        descr: "Здесь будет развёрнутое описание места которое нужно посетить пользователю для выполнения задания",
        done: false
    },
    {
        id: 5,
        latitude: 51.096533, 
        longitude: 41.658402,
        imgSrc: "5.jpg",
        title: "Бунгало",
        descr: "Здесь будет развёрнутое описание места которое нужно посетить пользователю для выполнения задания",
        done: false
    },
    {
        id: 6,
        latitude: 51.098900,
        longitude: 41.634459,
        imgSrc: "church.png",
        title: "Старая церковь",
        descr: "Здесь будет развёрнутое описание места которое нужно посетить пользователю для выполнения задания",
        done: false
    },
    {
        id: 7,
        latitude: 51.098946, 
        longitude: 41.637324,
        imgSrc: "hoper.png",
        title: "База на К.Маркса",
        descr: "Здесь будет развёрнутое описание места которое нужно посетить пользователю для выполнения задания",
        done: false
    },
    {
        id: 8,
        latitude: 51.104079, 
        longitude: 41.647387,
        imgSrc: "8.jpg",
        title: "Призрачный остров",
        descr: "Здесь будет развёрнутое описание места которое нужно посетить пользователю для выполнения задания",
        done: false
    },
    {
        id: 9,
        latitude: 51.103648,  
        longitude: 41.650442,
        imgSrc: "7.jpg",
        title: "Старый деревянный мост",
        descr: "Здесь будет развёрнутое описание места которое нужно посетить пользователю для выполнения задания",
        done: false
    }
]



document.addEventListener('DOMContentLoaded', ()=>{
    const buttons = document.querySelectorAll('.list-item__btn');
    const counterEl = document.querySelector('.counter__data');
    const body = document.querySelector('body');


    if (localStorage.getItem('body')){
        body.innerHTML = localStorage.getItem('body')
    }
    let allItems = document.querySelectorAll('.list-item');
    const resetBtn = document.querySelector('#resetBtn');
    const checkBtn = document.querySelector('#checkBtn');
    //Текст счётчика перезаписываемый и копия для сброса
    let counterText = `Посещено мест: 0/${allItems.length}`;
    let resetCounterText = `Посещено мест: 0/${allItems.length}`;
    const checkResult = `Место исследовано`;
    
    let counter = 0;
    // Рендер текста строки прогреса
    counterEl.innerHTML = counterText ;


    //------------------- < РАСЧЁТ РАССТОЯНИЯ ДО МЕСТА ----------------------------
    // Определение расстояния между двумя координатами (в будущем между МЕСТОМ и ГЕОПОЗИЦИЕЙ)
    function getDistanceToPlace(lat1,lon1,lat2,lon2) {
        const R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        var d = Math.round(d * 1000); //Distance in metres
        return d;
    }
    
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }
    //------------------- РАСЧЁТ РАССТОЯНИЯ ДО МЕСТА > ----------------------------
    //Получаем координаты текущего местоположения и проверяем реальность посещения места
    //Хопер
    const poi = [51.100286, 41.631461]

    //Сокол.Липецк
    const poi2 = [52.639801, 39.656198]

    //Около 500м
    const poi3 = [52.588639, 39.524081]

    let currentPosition = [];
    let currentDistance ='';

    const findMyPositionAndCheck = () =>{
        const success = (position)=>{
            // console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
            
             fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                
                currentPosition[0] = data.latitude;
                currentPosition[1] = data.longitude;
                checkDistanse()
                
            })
        }
        
        const error = ()=>{
            console.log('Включите геолокацию на устройстве!')
        }
        navigator.geolocation.getCurrentPosition(success, error)
        

    }

    //Определяем дистанцию от геолокации до МЕСТА 1
    const checkDistanse = function(){
        // let distance = getDistanceToPlace(52.584701, 39.516152, currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(places[0].latitude, places[0].longitude, currentPosition[0], currentPosition[1])
        let distance = getDistanceToPlace(places[0].latitude, places[0].longitude, currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi2[0], poi2[1], currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi3[0], poi3[1], currentPosition[0], currentPosition[1])
    
        // Проверяем попадаем ли в радиус МЕСТА и если да, то "МЕСТО ИССЛЕДОВАНО"!
        if (distance <= 60) {
            counterPopup = `${checkResult} ${distance} м`;
            counterEl.innerHTML = counterPopup;
            const currentBnt = document.querySelector('#button1');
            let item = currentBnt.closest('.list-item');
            let itemBg =  item.querySelector('.list-item__name');
            itemBg.classList.add('active');
            item.classList.add('active');
            currentBnt.classList.add('active');
            saveHTMLtoLS()
            console.log("Проверка прошла успешно. Место исследовано!");
            console.log(distance);
            places[0].done = true;
            console.log(places[0].done);
            // Меняем текст в кнопке
            currentBnt.innerHTML=='Посетить' ? currentBnt.textContent = 'Исследовано' : currentBnt.textContent = 'Посетить'

            // Увеличиваем или уменьшаем счётчик
            currentBnt.textContent == 'Исследовано' ? ++counter : --counter ;


            setTimeout(()=>{    
                // Выводим текст МЕСТО ИССЛЕДОВАНО: 24м
                
                if (counter == allItems.length){
                    counterEl.innerHTML = counterPopup ;
                    console.log(counter);
                    counterText = 'Вы исследовали все места!'
                    counterEl.innerHTML = counterText;
                    console.log(counterText);
                } else {
                    counterEl.innerHTML = counterPopup
                    console.log(counter);
                    counterText = `Посещено мест: ${counter}/${allItems.length} `;
                    counterEl.innerHTML = counterText ;
                    console.log(counterText);
                }
            }, 3000)

        } else {
            counterEl.innerHTML = `Вы далеко от объекта! ${distance} м`
            console.log("Вы слишком далеко! Подойдите поближе!");
            places[0].done = false;
            console.log(distance);
            setTimeout(()=>{
                counterEl.innerHTML = counterText;
            },3000)
        }
        if(distance>1000) {
            counterEl.innerHTML = `Вы далеко от объектa! ${distance = (distance / 1000).toFixed(2)} км`
        }

    }





    const findMyPositionAndCheck2 = () =>{
        const success = (position)=>{
            // console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
            
            fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                
                currentPosition[0] = data.latitude;
                currentPosition[1] = data.longitude;
                checkDistanse2()
  
            })
        }
        
        const error = ()=>{
            console.log('Включите геолокацию на устройстве!')
        }
        navigator.geolocation.getCurrentPosition(success, error)
        

    }

    //Определяем дистанцию от геолокации до МЕСТА 2
    const checkDistanse2 = function(){
        // let distance = getDistanceToPlace(52.584701, 39.516152, currentPosition[0], currentPosition[1])
        let distance = getDistanceToPlace(places[1].latitude, places[1].longitude, currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi2[0], poi2[1], currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi3[0], poi3[1], currentPosition[0], currentPosition[1])
        currentDistance = distance;
        
        // Проверяем попадаем ли в радиус МЕСТА и если да, то "МЕСТО ИССЛЕДОВАНО"!
        if (distance <= 60) {
            counterPopup = `${checkResult} ${distance} м`;
            counterEl.innerHTML = counterPopup;
            const currentBnt = document.querySelector('#button2');
            let item = currentBnt.closest('.list-item');
            let itemBg =  item.querySelector('.list-item__name');
            itemBg.classList.add('active');
            item.classList.add('active');
            currentBnt.classList.add('active');
            saveHTMLtoLS()
            console.log("Проверка прошла успешно. Место исследовано!");
            console.log(distance);
            places[0].done = true;
            console.log(places[0].done);
            // Меняем текст в кнопке
            currentBnt.innerHTML=='Посетить' ? currentBnt.textContent = 'Исследовано' : currentBnt.textContent = 'Посетить'

            // Увеличиваем или уменьшаем счётчик
            currentBnt.textContent == 'Исследовано' ? ++counter : --counter ;

            setTimeout(()=>{    
                // Выводим текст МЕСТО ИССЛЕДОВАНО: 24м
                
                if (counter == allItems.length){
                    counterEl.innerHTML = counterPopup ;
                    console.log(counter);
                    counterText = 'Вы исследовали все места!'
                    counterEl.innerHTML = counterText;
                    console.log(counterText);
                } else {
                    counterEl.innerHTML = counterPopup
                    console.log(counterPopup);
                    counterText = `Посещено мест: ${counter}/${allItems.length} `;
                    counterEl.innerHTML = counterText ;
                    console.log(counterText);
                }
            }, 3000)

        } else {
            counterEl.innerHTML = `Вы далеко от объекта! ${distance} м`
            console.log("Вы слишком далеко! Подойдите поближе!");
            places[0].done = false;
            console.log(distance);
            setTimeout(()=>{
                counterEl.innerHTML = counterText;
            },3000)
        }

        if(distance>1000) {
            counterEl.innerHTML = `Вы далеко от объектa! ${distance = (distance / 1000).toFixed(2)} км`
        }
    }

    const findMyPositionAndCheck3 = () =>{
        const success = (position)=>{
            // console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
            
            fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                
                currentPosition[0] = data.latitude;
                currentPosition[1] = data.longitude;
                checkDistanse3()
  
            })
        }
        
        const error = ()=>{
            console.log('Включите геолокацию на устройстве!')
        }
        navigator.geolocation.getCurrentPosition(success, error)
        

    }

    //Определяем дистанцию от геолокации до МЕСТА 2
    const checkDistanse3 = function(){
        // let distance = getDistanceToPlace(52.584701, 39.516152, currentPosition[0], currentPosition[1])
        let distance = getDistanceToPlace(places[2].latitude, places[2].longitude, currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi2[0], poi2[1], currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi3[0], poi3[1], currentPosition[0], currentPosition[1])
        currentDistance = distance;
        
        // Проверяем попадаем ли в радиус МЕСТА и если да, то "МЕСТО ИССЛЕДОВАНО"!
        if (distance <= 60) {
            counterPopup = `${checkResult} ${distance} м`;
            counterEl.innerHTML = counterPopup;
            const currentBnt = document.querySelector('#button3');
            let item = currentBnt.closest('.list-item');
            let itemBg = item.querySelector('.list-item__name');
            itemBg.classList.add('active');
            item.classList.add('active');
            currentBnt.classList.add('active');
            saveHTMLtoLS()
            console.log("Проверка прошла успешно. Место исследовано!");
            console.log(distance);
            places[0].done = true;
            console.log(places[0].done);
            // Меняем текст в кнопке
            currentBnt.innerHTML=='Посетить' ? currentBnt.textContent = 'Исследовано' : currentBnt.textContent = 'Посетить'

            // Увеличиваем или уменьшаем счётчик
            currentBnt.textContent == 'Исследовано' ? ++counter : --counter ;

            setTimeout(()=>{    
                // Выводим текст МЕСТО ИССЛЕДОВАНО: 24м
                
                if (counter == allItems.length){
                    counterEl.innerHTML = counterPopup ;
                    console.log(counter);
                    counterText = 'Вы исследовали все места!'
                    counterEl.innerHTML = counterText;
                    console.log(counterText);
                } else {
                    counterEl.innerHTML = counterPopup
                    console.log(counterPopup);
                    counterText = `Посещено мест: ${counter}/${allItems.length} `;
                    counterEl.innerHTML = counterText ;
                    console.log(counterText);
                }
            }, 3000)

        } else {
            counterEl.innerHTML = `Вы далеко от объекта! ${distance} м`
            console.log("Вы слишком далеко! Подойдите поближе!");
            places[0].done = false;
            console.log(distance);
            setTimeout(()=>{
                counterEl.innerHTML = counterText;
            },3000)
        }

        if(distance>1000) {
            counterEl.innerHTML = `Вы далеко от объектa! ${distance = (distance / 1000).toFixed(2)} км`
        }
    }


    const findMyPositionAndCheck4 = () =>{
        const success = (position)=>{
            // console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
            
            fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                
                currentPosition[0] = data.latitude;
                currentPosition[1] = data.longitude;
                checkDistanse4()
  
            })
        }
        
        const error = ()=>{
            console.log('Включите геолокацию на устройстве!')
        }
        navigator.geolocation.getCurrentPosition(success, error)
        

    }

    //Определяем дистанцию от геолокации до МЕСТА 2
    const checkDistanse4 = function(){
        // let distance = getDistanceToPlace(52.584701, 39.516152, currentPosition[0], currentPosition[1])
        let distance = getDistanceToPlace(places[3].latitude, places[3].longitude, currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi2[0], poi2[1], currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi3[0], poi3[1], currentPosition[0], currentPosition[1])
        currentDistance = distance;
        
        // Проверяем попадаем ли в радиус МЕСТА и если да, то "МЕСТО ИССЛЕДОВАНО"!
        if (distance <= 60) {
            counterPopup = `${checkResult} ${distance} м`;
            counterEl.innerHTML = counterPopup;
            const currentBnt = document.querySelector('#button4');
            let item = currentBnt.closest('.list-item');
            let itemBg = item.querySelector('.list-item__name');
            itemBg.classList.add('active');
            item.classList.add('active');
            currentBnt.classList.add('active');
            saveHTMLtoLS()
            console.log("Проверка прошла успешно. Место исследовано!");
            console.log(distance);
            places[0].done = true;
            console.log(places[0].done);
            // Меняем текст в кнопке
            currentBnt.innerHTML=='Посетить' ? currentBnt.textContent = 'Исследовано' : currentBnt.textContent = 'Посетить'

            // Увеличиваем или уменьшаем счётчик
            currentBnt.textContent == 'Исследовано' ? ++counter : --counter ;

            setTimeout(()=>{    
                // Выводим текст МЕСТО ИССЛЕДОВАНО: 24м
                
                if (counter == allItems.length){
                    counterEl.innerHTML = counterPopup ;
                    console.log(counter);
                    counterText = 'Вы исследовали все места!'
                    counterEl.innerHTML = counterText;
                    console.log(counterText);
                } else {
                    counterEl.innerHTML = counterPopup
                    console.log(counterPopup);
                    counterText = `Посещено мест: ${counter}/${allItems.length} `;
                    counterEl.innerHTML = counterText ;
                    console.log(counterText);
                }
            }, 3000)

        } else {
            counterEl.innerHTML = `Вы далеко от объекта! ${distance} м`
            console.log("Вы слишком далеко! Подойдите поближе!");
            places[0].done = false;
            console.log(distance);
            setTimeout(()=>{
                counterEl.innerHTML = counterText;
            },3000)
        }

        if(distance>1000) {
            counterEl.innerHTML = `Вы далеко от объектa! ${distance = (distance / 1000).toFixed(2)} км`
        }
    }

    const findMyPositionAndCheck5 = () =>{
        const success = (position)=>{
            // console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
            
            fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                
                currentPosition[0] = data.latitude;
                currentPosition[1] = data.longitude;
                checkDistanse5()
  
            })
        }
        
        const error = ()=>{
            console.log('Включите геолокацию на устройстве!')
        }
        navigator.geolocation.getCurrentPosition(success, error)
        

    }

    //Определяем дистанцию от геолокации до МЕСТА 2
    const checkDistanse5 = function(){
        // let distance = getDistanceToPlace(52.584701, 39.516152, currentPosition[0], currentPosition[1])
        let distance = getDistanceToPlace(places[4].latitude, places[4].longitude, currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi2[0], poi2[1], currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi3[0], poi3[1], currentPosition[0], currentPosition[1])
        currentDistance = distance;
        
        // Проверяем попадаем ли в радиус МЕСТА и если да, то "МЕСТО ИССЛЕДОВАНО"!
        if (distance <= 60) {
            counterPopup = `${checkResult} ${distance} м`;
            counterEl.innerHTML = counterPopup;
            const currentBnt = document.querySelector('#button5');
            let item = currentBnt.closest('.list-item');
            let itemBg = item.querySelector('.list-item__name');
            itemBg.classList.add('active');
            item.classList.add('active');
            currentBnt.classList.add('active');
            saveHTMLtoLS()
            console.log("Проверка прошла успешно. Место исследовано!");
            console.log(distance);
            places[0].done = true;
            console.log(places[0].done);
            // Меняем текст в кнопке
            currentBnt.innerHTML=='Посетить' ? currentBnt.textContent = 'Исследовано' : currentBnt.textContent = 'Посетить'

            // Увеличиваем или уменьшаем счётчик
            currentBnt.textContent == 'Исследовано' ? ++counter : --counter ;

            setTimeout(()=>{    
                // Выводим текст МЕСТО ИССЛЕДОВАНО: 24м
                
                if (counter == allItems.length){
                    counterEl.innerHTML = counterPopup ;
                    console.log(counter);
                    counterText = 'Вы исследовали все места!'
                    counterEl.innerHTML = counterText;
                    console.log(counterText);
                } else {
                    counterEl.innerHTML = counterPopup
                    console.log(counterPopup);
                    counterText = `Посещено мест: ${counter}/${allItems.length} `;
                    counterEl.innerHTML = counterText ;
                    console.log(counterText);
                }
            }, 3000)

        } else {
            counterEl.innerHTML = `Вы далеко от объекта! ${distance} м`
            console.log("Вы слишком далеко! Подойдите поближе!");
            places[0].done = false;
            console.log(distance);
            setTimeout(()=>{
                counterEl.innerHTML = counterText;
            },3000)
        }

        if(distance>1000) {
            counterEl.innerHTML = `Вы далеко от объектa! ${distance = (distance / 1000).toFixed(2)} км`
        }
    }

    const findMyPositionAndCheck6 = () =>{
        const success = (position)=>{
            // console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
            
            fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                
                currentPosition[0] = data.latitude;
                currentPosition[1] = data.longitude;
                checkDistanse6()
  
            })
        }
        
        const error = ()=>{
            console.log('Включите геолокацию на устройстве!')
        }
        navigator.geolocation.getCurrentPosition(success, error)
        

    }

    //Определяем дистанцию от геолокации до МЕСТА 2
    const checkDistanse6 = function(){
        // let distance = getDistanceToPlace(52.584701, 39.516152, currentPosition[0], currentPosition[1])
        let distance = getDistanceToPlace(places[5].latitude, places[5].longitude, currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi2[0], poi2[1], currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi3[0], poi3[1], currentPosition[0], currentPosition[1])
        currentDistance = distance;
        
        // Проверяем попадаем ли в радиус МЕСТА и если да, то "МЕСТО ИССЛЕДОВАНО"!
        if (distance <= 60) {
            counterPopup = `${checkResult} ${distance} м`;
            counterEl.innerHTML = counterPopup;
            const currentBnt = document.querySelector('#button6');
            let item = currentBnt.closest('.list-item');
            let itemBg = item.querySelector('.list-item__name');
            itemBg.classList.add('active');
            item.classList.add('active');
            currentBnt.classList.add('active');
            saveHTMLtoLS()
            console.log("Проверка прошла успешно. Место исследовано!");
            console.log(distance);
            places[0].done = true;
            console.log(places[0].done);
            // Меняем текст в кнопке
            currentBnt.innerHTML=='Посетить' ? currentBnt.textContent = 'Исследовано' : currentBnt.textContent = 'Посетить'

            // Увеличиваем или уменьшаем счётчик
            currentBnt.textContent == 'Исследовано' ? ++counter : --counter ;

            setTimeout(()=>{    
                // Выводим текст МЕСТО ИССЛЕДОВАНО: 24м
                
                if (counter == allItems.length){
                    counterEl.innerHTML = counterPopup ;
                    console.log(counter);
                    counterText = 'Вы исследовали все места!'
                    counterEl.innerHTML = counterText;
                    console.log(counterText);
                } else {
                    counterEl.innerHTML = counterPopup
                    console.log(counterPopup);
                    counterText = `Посещено мест: ${counter}/${allItems.length} `;
                    counterEl.innerHTML = counterText ;
                    console.log(counterText);
                }
            }, 3000)

        } else {
            counterEl.innerHTML = `Вы далеко от объекта! ${distance} м`
            console.log("Вы слишком далеко! Подойдите поближе!");
            places[0].done = false;
            console.log(distance);
            setTimeout(()=>{
                counterEl.innerHTML = counterText;
            },3000)
        }

        if(distance>1000) {
            counterEl.innerHTML = `Вы далеко от объектa! ${distance = (distance / 1000).toFixed(2)} км`
        }
    }


    const findMyPositionAndCheck7 = () =>{
        const success = (position)=>{
            // console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
            
            fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                
                currentPosition[0] = data.latitude;
                currentPosition[1] = data.longitude;
                checkDistanse7()
  
            })
        }
        
        const error = ()=>{
            console.log('Включите геолокацию на устройстве!')
        }
        navigator.geolocation.getCurrentPosition(success, error)
        

    }

    //Определяем дистанцию от геолокации до МЕСТА 2
    const checkDistanse7 = function(){
        // let distance = getDistanceToPlace(52.584701, 39.516152, currentPosition[0], currentPosition[1])
        let distance = getDistanceToPlace(places[6].latitude, places[6].longitude, currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi2[0], poi2[1], currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi3[0], poi3[1], currentPosition[0], currentPosition[1])
        currentDistance = distance;
        
        // Проверяем попадаем ли в радиус МЕСТА и если да, то "МЕСТО ИССЛЕДОВАНО"!
        if (distance <= 60) {
            counterPopup = `${checkResult} ${distance} м`;
            counterEl.innerHTML = counterPopup;
            const currentBnt = document.querySelector('#button7');
            let item = currentBnt.closest('.list-item');
            let itemBg = item.querySelector('.list-item__name');
            itemBg.classList.add('active');
            item.classList.add('active');
            currentBnt.classList.add('active');
            saveHTMLtoLS()
            console.log("Проверка прошла успешно. Место исследовано!");
            console.log(distance);
            places[0].done = true;
            console.log(places[0].done);
            // Меняем текст в кнопке
            currentBnt.innerHTML=='Посетить' ? currentBnt.textContent = 'Исследовано' : currentBnt.textContent = 'Посетить'

            // Увеличиваем или уменьшаем счётчик
            currentBnt.textContent == 'Исследовано' ? ++counter : --counter ;

            setTimeout(()=>{    
                // Выводим текст МЕСТО ИССЛЕДОВАНО: 24м
                
                if (counter == allItems.length){
                    counterEl.innerHTML = counterPopup ;
                    console.log(counter);
                    counterText = 'Вы исследовали все места!'
                    counterEl.innerHTML = counterText;
                    console.log(counterText);
                } else {
                    counterEl.innerHTML = counterPopup
                    console.log(counterPopup);
                    counterText = `Посещено мест: ${counter}/${allItems.length} `;
                    counterEl.innerHTML = counterText ;
                    console.log(counterText);
                }
            }, 3000)

        } else {
            counterEl.innerHTML = `Вы далеко от объекта! ${distance} м`
            console.log("Вы слишком далеко! Подойдите поближе!");
            places[0].done = false;
            console.log(distance);
            setTimeout(()=>{
                counterEl.innerHTML = counterText;
            },3000)
        }

        if(distance>1000) {
            counterEl.innerHTML = `Вы далеко от объектa! ${distance = (distance / 1000).toFixed(2)} км`
        }
    }

    const findMyPositionAndCheck8 = () =>{
        const success = (position)=>{
            // console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
            
            fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                
                currentPosition[0] = data.latitude;
                currentPosition[1] = data.longitude;
                checkDistanse8()
  
            })
        }
        
        const error = ()=>{
            console.log('Включите геолокацию на устройстве!')
        }
        navigator.geolocation.getCurrentPosition(success, error)
        

    }

    //Определяем дистанцию от геолокации до МЕСТА 2
    const checkDistanse8 = function(){
        // let distance = getDistanceToPlace(52.584701, 39.516152, currentPosition[0], currentPosition[1])
        let distance = getDistanceToPlace(places[7].latitude, places[7].longitude, currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi2[0], poi2[1], currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi3[0], poi3[1], currentPosition[0], currentPosition[1])
        currentDistance = distance;
        
        // Проверяем попадаем ли в радиус МЕСТА и если да, то "МЕСТО ИССЛЕДОВАНО"!
        if (distance <= 60) {
            counterPopup = `${checkResult} ${distance} м`;
            counterEl.innerHTML = counterPopup;
            const currentBnt = document.querySelector('#button8');
            let item = currentBnt.closest('.list-item');
            let itemBg = item.querySelector('.list-item__name');
            itemBg.classList.add('active');
            item.classList.add('active');
            currentBnt.classList.add('active');
            saveHTMLtoLS()
            console.log("Проверка прошла успешно. Место исследовано!");
            console.log(distance);
            places[0].done = true;
            console.log(places[0].done);
            // Меняем текст в кнопке
            currentBnt.innerHTML=='Посетить' ? currentBnt.textContent = 'Исследовано' : currentBnt.textContent = 'Посетить'

            // Увеличиваем или уменьшаем счётчик
            currentBnt.textContent == 'Исследовано' ? ++counter : --counter ;

            setTimeout(()=>{    
                // Выводим текст МЕСТО ИССЛЕДОВАНО: 24м
                
                if (counter == allItems.length){
                    counterEl.innerHTML = counterPopup ;
                    console.log(counter);
                    counterText = 'Вы исследовали все места!'
                    counterEl.innerHTML = counterText;
                    console.log(counterText);
                } else {
                    counterEl.innerHTML = counterPopup
                    console.log(counterPopup);
                    counterText = `Посещено мест: ${counter}/${allItems.length} `;
                    counterEl.innerHTML = counterText ;
                    console.log(counterText);
                }
            }, 3000)

        } else {
            counterEl.innerHTML = `Вы далеко от объекта! ${distance} м`
            console.log("Вы слишком далеко! Подойдите поближе!");
            places[0].done = false;
            console.log(distance);
            setTimeout(()=>{
                counterEl.innerHTML = counterText;
            },3000)
        }

        if(distance>1000) {
            counterEl.innerHTML = `Вы далеко от объектa! ${distance = (distance / 1000).toFixed(2)} км`
        }
    }

    const findMyPositionAndCheck9 = () =>{
        const success = (position)=>{
            // console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
            
            fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                
                currentPosition[0] = data.latitude;
                currentPosition[1] = data.longitude;
                checkDistanse9()
  
            })
        }
        
        const error = ()=>{
            console.log('Включите геолокацию на устройстве!')
        }
        navigator.geolocation.getCurrentPosition(success, error)
        

    }

    //Определяем дистанцию от геолокации до МЕСТА 2
    const checkDistanse9 = function(){
        // let distance = getDistanceToPlace(52.584701, 39.516152, currentPosition[0], currentPosition[1])
        let distance = getDistanceToPlace(places[8].latitude, places[8].longitude, currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi2[0], poi2[1], currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi3[0], poi3[1], currentPosition[0], currentPosition[1])
        currentDistance = distance;
        
        // Проверяем попадаем ли в радиус МЕСТА и если да, то "МЕСТО ИССЛЕДОВАНО"!
        if (distance <= 60) {
            counterPopup = `${checkResult} ${distance} м`;
            counterEl.innerHTML = counterPopup;
            const currentBnt = document.querySelector('#button9');
            let item = currentBnt.closest('.list-item');
            let itemBg = item.querySelector('.list-item__name');
            itemBg.classList.add('active');
            item.classList.add('active');
            currentBnt.classList.add('active');
            saveHTMLtoLS()
            console.log("Проверка прошла успешно. Место исследовано!");
            console.log(distance);
            places[0].done = true;
            console.log(places[0].done);
            // Меняем текст в кнопке
            currentBnt.innerHTML=='Посетить' ? currentBnt.textContent = 'Исследовано' : currentBnt.textContent = 'Посетить'

            // Увеличиваем или уменьшаем счётчик
            currentBnt.textContent == 'Исследовано' ? ++counter : --counter ;

            setTimeout(()=>{    
                // Выводим текст МЕСТО ИССЛЕДОВАНО: 24м
                
                if (counter == allItems.length){
                    counterEl.innerHTML = counterPopup ;
                    console.log(counter);
                    counterText = 'Вы исследовали все места!'
                    counterEl.innerHTML = counterText;
                    console.log(counterText);
                } else {
                    counterEl.innerHTML = counterPopup
                    console.log(counterPopup);
                    counterText = `Посещено мест: ${counter}/${allItems.length} `;
                    counterEl.innerHTML = counterText ;
                    console.log(counterText);
                }
            }, 3000)

        } else {
            counterEl.innerHTML = `Вы далеко от объекта! ${distance} м`
            console.log("Вы слишком далеко! Подойдите поближе!");
            places[0].done = false;
            console.log(distance);

            setTimeout(()=>{
                counterEl.innerHTML = counterText;
            },3000)
        }

        if(distance>1000) {
            counterEl.innerHTML = `Вы далеко от объектa! ${distance = (distance / 1000).toFixed(2)} км`
        }
    }



    // // Логика изменений кликов по кнопкам 
    // buttons.forEach(el => {
    //     el.addEventListener('click', (e) =>{
    //         let currentBnt = e.currentTarget;
    //         let item = currentBnt.closest('.list-item');
    //         let itemBg =  item.querySelector('.list-item__name');
    //         itemBg.classList.toggle('active');
    //         item.classList.toggle('active');
    //         currentBnt.classList.toggle('active');

    //         // // Меняем текст в кнопке
    //         // currentBnt.innerHTML=='Посетить' ? currentBnt.textContent = 'Исследовано' : currentBnt.textContent = 'Посетить'
        
    //         // // Увеличиваем или уменьшаем счётчик
    //         // currentBnt.textContent == 'Исследовано' ? ++counter : --counter ;

    //         // // Текст который будет выведен            
    //         // counterText = `Посещено мест: ${counter}/${allItems.length} `;

    //         // // Выводим текст готового результата
    //         // counter == allItems.length ? counterEl.innerHTML = 'Вы исследовали все места!' : counterEl.innerHTML = counterText ;
    //         ;

    //     })
    // })
    resetBtn.addEventListener('click', ()=>{
        buttons.forEach((el) => {
            let item = el.closest('.list-item');
            let itemBg = item.querySelector('.list-item__name');
            counter = 0;
            // console.log(counter);
            // Перезаписываем обнулённое значение счётчика
            counterEl.innerHTML = resetCounterText;
            // Удаляем классы активности с выбранных элементов
            el.classList.remove('active');
            item.classList.remove('active');
            itemBg.classList.remove('active');
            // Обнуляем текст кнопки
            if (el.innerText == 'Посетить'){
            } else{
                el.innerText = 'Посетить'
            }
        })
    })


    function saveHTMLtoLS(){
        localStorage.setItem('placesHTML', body.innerHTML)
    }
    
    // checkBtn.addEventListener('click', findMyPositionAndCheck)
    
    const button1 = document.querySelector('#button1');
    button1.addEventListener('click', findMyPositionAndCheck)
    const button2 = document.querySelector('#button2');
    button2.addEventListener('click', findMyPositionAndCheck2)
    const button3 = document.querySelector('#button3');
    button3.addEventListener('click', findMyPositionAndCheck3)
    const button4 = document.querySelector('#button4');
    button4.addEventListener('click', findMyPositionAndCheck4)
    const button5 = document.querySelector('#button5');
    button5.addEventListener('click', findMyPositionAndCheck5)
    const button6 = document.querySelector('#button6');
    button6.addEventListener('click', findMyPositionAndCheck6)
    const button7 = document.querySelector('#button7');
    button7.addEventListener('click', findMyPositionAndCheck7)
    const button8 = document.querySelector('#button8');
    button8.addEventListener('click', findMyPositionAndCheck8)
    const button9 = document.querySelector('#button9');
    button9.addEventListener('click', findMyPositionAndCheck9)
})
