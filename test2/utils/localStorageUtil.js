class LocalStorageUtil {
    constructor(){
        this.keyName = 'places';

    }
    getPlaces(){
        const placesLocalStorage = localStorage.getItem(this.keyName)
        if (placesLocalStorage !== null){
            return JSON.parse(placesLocalStorage);
        }
        return [];
    }

    putPlaces(id){
        let places = this.getPlaces();
        let pushPlaces = false;
        const index = places.indexOf(id);

        if (index === -1) {
            places.push(id);
            pushPlaces = true;
        } else {
            places.splice(index, 1)
        }

        localStorage.setItem(this.keyName, JSON.stringify(places));

        return { pushPlaces, places } 
    }
}

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
const overlay = document.querySelector('.overlay');


const openModal = function(){
    const lStorageContent = localStorageUtil.getPlaces();
    if (lStorageContent.length == 0){
    } else{
        overlay.classList.add('show');
    }
     
}

const closeModal = function(){
    overlay.classList.remove('show');
}