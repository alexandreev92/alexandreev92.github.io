const database = [
    cardPlace = {
        id: 1,
        img: "img/1.jpg",
        name: "Колонка с водой",
        descr: "Здесь будет развёрнутое описание места которое нужно посетить пользователю для выполнения задания",
        done: false
    }

]
let catalog = [];



document.addEventListener('DOMContentLoaded', ()=>{
    const buttons = document.querySelectorAll('.list-item__btn');
    const counterEl = document.querySelector('.counter__data');
    
    let allItems = document.querySelectorAll('.list-item');
    const resetBtn = document.querySelector('#resetBtn');
    //Текст счётчика перезаписываемый и копия для сброса
    let counterText = `Посещено мест: 0/${allItems.length}`;
    let resetCounterText = `Посещено мест: 0/${allItems.length}`;
    
    let counter = 0;
    // Рендер текста строки прогреса
    counterEl.innerHTML = counterText ;
    // Логика изменений кликов по кнопкам 
    buttons.forEach(el => {
        el.addEventListener('click', (e) =>{
            let currentBnt = e.currentTarget;
            let item = currentBnt.closest('.list-item');
            let itemBg =  item.querySelector('.list-item__name');
            itemBg.classList.toggle('active');
            item.classList.toggle('active');
            currentBnt.classList.toggle('active');
            
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
})
