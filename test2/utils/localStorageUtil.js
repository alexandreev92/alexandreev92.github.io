class LocalStorageUtil {
    constructor(){
        this.keyName = 'places';

    }
//Получение значений из LocalStorage
    getPlaces(){
        //Получаем содержимое локального хранилища по ключу
        const placesLocalStorage = localStorage.getItem(this.keyName)
        //Если в полученном содержимом что то есть,
        if (placesLocalStorage !== null){
        //тогда возвращаем эти данные преобразовав из строки в массив(которым можно оперировать в JS)
            return JSON.parse(placesLocalStorage);
        }
        //Если в полученном содержимом ничего нет тогда возвращаем пустой массив
        return [];
    }
//Запись значений в LocalStorage
    putPlaces(id){
        //Получаем содержимое LocalStorage и записываем в переменную
        let places = this.getPlaces();
        //Дефолтное состояние локального хранилища = False
        let pushPlaces = false;
        //Получаем индекс конкретной записи в зависимости от id 
        const index = places.indexOf(id);
        //Проверяем если такого индекса нет тогда:
        if (index === -1) {
        //добавляем новую запись и записываем в переменную что в локальном хранилище теперь есть данные
            places.push(id);
            pushPlaces = true;
        } else {
        //В противном случае если элемент с index присутствует, то вырезаем его из массива
            places.splice(index, 1)
        }

        //Записываем в LocalStorage данные переведя их в строку
        localStorage.setItem(this.keyName, JSON.stringify(places));
        //Возвращаем из функции информацию (пусто или что то есть в LS) и сам массив содержимого
        return { pushPlaces, places } 
    }
}
// Объявляем экземпляр класса
const localStorageUtil = new LocalStorageUtil();


// Очистка Локального хранилища
const clearLocalStorage = function(){
    localStorage.clear();
    placesCard.render();
    document.querySelector('.counter__data').innerHTML = 'Результаты сброшены';
    resetBtn.innerHTML = 'Готово!';
    resetBtn.classList.add('complete');
    closeModal();
    setTimeout(()=>{
        document.querySelector('.counter__data').innerHTML = `Посещено мест: 0/${CATALOG.length}`
        resetBtn.innerHTML = 'Сброс'
        resetBtn.classList.remove('complete')
    }, 2000)

}
const resetBtn = document.querySelector('#resetBtn');
const cancel = document.querySelector('#cancel');
const overlay = document.querySelector('.overlay');


const openModal = function(){
    const lStorageContent = localStorageUtil.getPlaces();
    if (lStorageContent.length == 0){
    } else{
        overlay.classList.add('show');
        cancel.focus();
    }
     
}

const closeModal = function(){
    overlay.classList.remove('show');
}