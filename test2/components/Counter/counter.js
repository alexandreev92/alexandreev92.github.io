class Counter {


    render(count){
        const totalCount = CATALOG.length
            
        const htmlCounter = `
            <div class="counter">
                <div class="counter__data">Посещено мест: ${count}/${totalCount}</div>
            </div>
        `;
        
        ROOT_COUNTER.innerHTML = htmlCounter;
    }
}

const counterPage = new Counter();

const placesStore = localStorageUtil.getPlaces()
counterPage.render(placesStore.length);

