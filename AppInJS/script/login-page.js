'use strict';

let userNameComponentText = '';
let passwordComponentText = '';


userNameComponent.addEventListener('change', (event)=> {
    userNameComponentText = event.target.value;
    checkToEnableLoginBtn();
});

const passwordComponent = loginComponent.querySelector('.login-password');
passwordComponent.addEventListener('change', (event)=> {
    passwordComponentText = event.target.value;
    checkToEnableLoginBtn();
});

const loginButtonComponent = loginComponent.querySelector('.login-button');
loginButtonComponent.addEventListener('click', (event) => {
    let validLogin = false;

    for (const userInfo of userInfos) {
        const [userName, password, roles] = Object.keys(userInfo);

        if (userNameComponentText.trim().toLocaleLowerCase() === userInfo[userName] && 
            passwordComponentText.trim() === userInfo[password]) {
            validLogin = true;
            currLoggedInUser.userName = userInfo[userName];
            currLoggedInUser.roles = userInfo[roles];
            break;
        }       
    }

    if (validLogin) {
        loginComponent.classList.toggle('hidden');
        //loginComponent.classList.add('hidden'); // won't work with flex
        loginSuccessfullComponent.classList.toggle('hidden');
        userNameComponentText = '';
        passwordComponentText = ''; 
        drawMenu();
    } else {
        loginErrorComponent.classList.toggle('hidden');
    }
    loginForm.reset();
});

signupLinkComponent.addEventListener('click', (event) => {
    event.stopPropagation();
    loginComponent.classList.toggle('hidden');
    signupComponent.classList.toggle('hidden');
    loginForm.reset();
});

function checkToEnableLoginBtn() {

    if (userNameComponentText && passwordComponentText) {
        loginButtonComponent.disabled = false;
    } else {
        loginButtonComponent.setAttribute('disabled', 'true');
    }
}



