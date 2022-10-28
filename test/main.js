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
    let counter = 0;

    let allItems = document.querySelectorAll('.list-item');
    let counterText = `Посещено мест: 0/${allItems.length}`;
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
})
