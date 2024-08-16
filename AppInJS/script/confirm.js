'use strict';

confirmCancelBtn.addEventListener('click', (event) => {
    confirmComponent.classList.toggle('hidden');
    cloakComponent.classList.toggle('hidden');
    confirmTextMessage = '';
    confirmFunctionArguments = [];
});

const confirmEmptyObj = {};

confirmOkBtn.addEventListener('click', (event) => {
    const methodToExecute = confirmFunctionToExecute;
    confirmFunctionToExecute = '';
    let args = confirmFunctionArguments;
    
    if (methodToExecute) {
        methodToExecute.apply(confirmEmptyObj, args);
    }
    confirmFunctionArguments = [];
    confirmTextMessage = '';
    confirmComponentToggle();
})

const confirmComponentToggle = () => {
    confirmTextComp.textContent = confirmTextMessage;
    confirmComponent.classList.toggle('hidden');
    cloakComponent.classList.toggle('hidden');
};