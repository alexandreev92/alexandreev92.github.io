class Start {

    

    render(){
        const html = `
            <div class="start-container">
                <img class="start__logo" src="img/logo.svg" alt="">
            </div>
        `
        ROOT_START.innerHTML = html;
    };

    renderClear(){
        const html = ''
        ROOT_START.innerHTML = html;
    }
}


const start = new Start()
start.render();
setTimeout(()=>{
    //Убираем стартовое окно
    start.renderClear()
    //Рендерим окно авторизации
    const authPage = new Auth()
    //Авторизация по кнопке войти запускает рендер приложения
    authPage.render()
}, 2000)


// //Рендерим контент с КАТАЛОГОМ
// const placesCard = new Places();
// placesCard.render()
// //Рендерим счётчик
// const counterPage = new Counter();
// const placesStore = localStorageUtil.getPlaces()
// counterPage.render(placesStore.length);