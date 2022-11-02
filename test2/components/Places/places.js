class Places {
    constructor() {
        this.classNameActive = 'active'
        this.labelAdd = 'Посетить'
        this.labelRemove = 'Исследовано'
    }
    // Функция которая 
    handleSetLocationStorage(element, id){
        const { pushPlaces, places } = localStorageUtil.putPlaces(id);
        const activeCard = element.closest('.places-item')
        const activeBg = activeCard.querySelector('.places-item__name')
        // console.log(element);
        if (pushPlaces){
            element.classList.add(this.classNameActive);
            element.innerHTML = this.labelRemove;
            activeCard.classList.add(this.classNameActive)
            // activeBg.classList.add(this.classNameActive)
        } else {
            element.classList.remove(this.classNameActive);
            element.innerHTML = this.labelAdd;
            activeCard.classList.remove(this.classNameActive)
            // activeBg.classList.remove(this.classNameActive)
        }
        counterPage.render(places.length)
    }

    render(){
        const placesStore = localStorageUtil.getPlaces();
        let htmlCatalog = '';

        CATALOG.forEach(({id, title, imgSrc})=>{
            let activeClass = '';
            let activeText = '';

            if (placesStore.indexOf(id) === -1){
                activeText = this.labelAdd;
            } else {
                activeClass = ' '+this.classNameActive;
                activeText = this.labelRemove;
            }

            htmlCatalog += `                    
            <li class="places-item${activeClass}">
                <img class="places-item__img" src="img/${imgSrc}" alt="">
                <div class="places-item__name">${title}</div>
                <button class="places-item__btn${activeClass}" onclick="placesCard.handleSetLocationStorage(this, ${id});">
                ${activeText}
                </button>
            <!-- <div class="places-item__descr">Здесь будет развёрнутое описание места которое нужно посетить пользователю для выполнения задания</div> -->
            </li>`
        });
        const html =`
        <ul class="places__wrapper">
            ${htmlCatalog}
        </ul>
        <div class="buttons-wrap">
            <!-- button class="btn" id="checkBtn" href="">Колонка</button> -->
                <button class="btn" id="resetBtn" href="" onclick="openModal()">Сбросить</button>
            </div>
        `;
        ROOT_PLACES.innerHTML = html;
    }
}

const placesCard = new Places();
const counterPage = new Counter();
