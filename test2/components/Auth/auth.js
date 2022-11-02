class Auth {
    render(){
        const html = `
            <div class="auth-container">
                <div class="auth">
                    <img class="start__logo" src="img/logo.svg" alt="">
                    <div class="auth__title">Авторизация</div>
                    <form class='auth__form' action="#">
                        <input id="login" name="login" placeholder="Ваш логин" type="tel" autocomplete="off">
                        <input id="password" type="password" inputmode="number" placeholder="Введите пароль" minlength="9" maxlength="12" autocomplete="off"></form>
                    <button class="auth__btn" onclick="authPage.verify()">Войти</button>    
                </div>
            </div>
        `
        ROOT_AUTH.innerHTML = html;
    };
    renderClear(){
        const html = ''
        ROOT_AUTH.innerHTML = html;
    }
    verify(){
        // //Рендерим контент с КАТАЛОГОМ
        const placesCard = new Places();
        placesCard.render()
        //Рендерим счётчик
        const counterPage = new Counter();
        const placesStore = localStorageUtil.getPlaces()
        counterPage.render(placesStore.length);
        authPage.renderClear()
    }
}

authPage = new Auth();
// authPage.verify();