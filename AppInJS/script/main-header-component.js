'use strict';

mainHeaderLogoutImgComponent.addEventListener('click', (event) => {
    generalInfoTextMessage = `${currLoggedInUser['userName']} has been logged of!!`;
    confirmTextMessage = 'Are you sure you want to log off?';
    generalInfoPrevComponent = loginComponent;
    confirmFunctionToExecute = logoutAction;
    confirmComponentToggle();
});

const logoutAction = function() {
    setGeneralInfoVisibleAndText();
    loginSuccessfullComponent.classList.add('hidden');
    delete currLoggedInUser.userName;
    delete currLoggedInUser.roles;

    if (currComponent) {
        currComponent.classList.add('hidden');
    }
}