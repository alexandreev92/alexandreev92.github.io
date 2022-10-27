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
    const counterEl = document.querySelector('.counter__data')
    let counter = 0;
    
    buttons.forEach(el => {
        el.addEventListener('click', (e) =>{
            let currentBnt = e.currentTarget;
            let item = currentBnt.closest('.list-item');
            let itemBg =  item.querySelector('.list-item__name');
            itemBg.classList.toggle('active');
            item.classList.toggle('active');
            currentBnt.classList.toggle('active');
            
            if (currentBnt.innerHTML =='Посетить'){
                currentBnt.textContent = 'Исследовано'
            } else {
                currentBnt.textContent = 'Посетить'
            }
            if (currentBnt.textContent == 'Исследовано'){
                counter++;
            } else{
                counter--;
            }
            counterEl.innerHTML = counter;
        })
    })

})
