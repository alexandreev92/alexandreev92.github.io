const places = [
    {
        id: 1,
        latitude: 51.100286,
        longitude: 41.631461,
        imgSrc: "1.jpg",
        title: "Колонка с водой",
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
    }
]



document.addEventListener('DOMContentLoaded', ()=>{
    const buttons = document.querySelectorAll('.list-item__btn');
    const counterEl = document.querySelector('.counter__data');
    
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

    //Определяем дистанцию от геолокации до МЕСТА
    const checkDistanse = function(){
        // let distance = getDistanceToPlace(52.584701, 39.516152, currentPosition[0], currentPosition[1])
        let distance = getDistanceToPlace(places[0].latitude, places[0].longitude, currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi2[0], poi2[1], currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi3[0], poi3[1], currentPosition[0], currentPosition[1])
    
        // Проверяем попадаем ли в радиус МЕСТА и если да, то "МЕСТО ИССЛЕДОВАНО"!
        if (distance <= 30) {
            counterEl.innerHTML = `${checkResult} ${distance} м`
            console.log("Проверка прошла успешно. Место исследовано!");
            console.log(distance);
            places[0].done = true;
            console.log(places[0].done);
        } else {
            counterEl.innerHTML = `Вы далеко от объекта! ${distance} м`
            console.log("Вы слишком далеко! Подойдите поближе!");
            console.log(distance);
            places[0].done = false;
            console.log(places[0].done);
        }
        if(distance>1000) {
            counterEl.innerHTML = `Вы далеко от объектa! ${distance = (distance / 1000).toFixed(1)} км`
        }

        if(places[0].done == true){
            toggleSelect()
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

    //Определяем дистанцию от геолокации до МЕСТА
    const checkDistanse2 = function(){
        // buttons.forEach(el =>{
        //     console.log(el);
        // })
        // places.forEach((el) =>{
        //     el.latitude
        //     console.log(el.latitude)
        // })
        // let distance = getDistanceToPlace(52.584701, 39.516152, currentPosition[0], currentPosition[1])
        let distance = getDistanceToPlace(places[1].latitude, places[1].longitude, currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi2[0], poi2[1], currentPosition[0], currentPosition[1])
        // let distance = getDistanceToPlace(poi3[0], poi3[1], currentPosition[0], currentPosition[1])
        currentDistance = distance;
        
        // Проверяем попадаем ли в радиус МЕСТА и если да, то "МЕСТО ИССЛЕДОВАНО"!
        if (distance <= 30) {
            counterEl.innerHTML = `${checkResult} ${distance} м`
            console.log("Проверка прошла успешно. Место исследовано!");
            console.log(distance);
            places[0].done = true;
            console.log(places[0].done);


        } else {
            counterEl.innerHTML = `Вы далеко от объекта! ${distance} м`
            console.log("Вы слишком далеко! Подойдите поближе!");
            console.log(distance);
            console.log(currentDistance);
            places[0].done = false;
        }
        if(distance>1000) {
            counterEl.innerHTML = `Вы далеко от объектa! ${distance = (distance / 1000).toFixed(1)} км`
        }
    }


    // Логика изменений кликов по кнопкам 
    buttons.forEach(el => {
        el.addEventListener('click', (e) =>{
            let currentBnt = e.currentTarget;
            let item = currentBnt.closest('.list-item');
            let itemBg =  item.querySelector('.list-item__name');
            function toggleSelect(){
                itemBg.classList.toggle('active');
                item.classList.toggle('active');
                currentBnt.classList.toggle('active');
        }

            // Меняем текст в кнопке
            currentBnt.innerHTML=='Посетить' ? currentBnt.textContent = 'Исследовано' : currentBnt.textContent = 'Посетить'
        
            // Увеличиваем или уменьшаем счётчик
            currentBnt.textContent == 'Исследовано' ? ++counter : --counter ;

            // Текст который будет выведен            
            counterText = `Посещено мест: ${counter}/${allItems.length} `;

            // Выводим текст готового результата
            counter == allItems.length ? counterEl.innerHTML = 'Вы исследовали все места!' : counterEl.innerHTML = counterText ;
            ;

        })
    })
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

        
    checkBtn.addEventListener('click', findMyPositionAndCheck)
    const button1 = document.querySelector('#button1')
    const button2 = document.querySelector('#button2')
    button1.addEventListener('click', findMyPositionAndCheck)
    button2.addEventListener('click', findMyPositionAndCheck2)
    

})
