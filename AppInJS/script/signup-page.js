'use strict';

let signupUserName = '';
let signupPwd = '';
let signupConfirmPwd = '';
let signupRole = 'normal';


const isSignUpValid = function() {
    const error1 = signupError1.classList.contains('hidden');
    const error2 = signupError2.classList.contains('hidden');
    const error3 = signupError3.classList.contains('hidden');
    const error4 = signupError4.classList.contains('hidden');
    const error5 = signupError5.classList.contains('hidden');
    const error6 = signupError6.classList.contains('hidden');
    const error7 = signupError7.classList.contains('hidden');
    const error8 = signupError8.classList.contains('hidden');
    const userNmDirty = signupComponentUserId.classList.contains('dirty');
    const pwdDirty = signupComponentPassword.classList.contains('dirty');
    const cnPwdDirty = signupComponentConfirmPassword.classList.contains('dirty');

    if (error1 && error2 && error3 && error4 && error5 && error6 && error7 &&
        error8 && userNmDirty && pwdDirty && cnPwdDirty) {
        signupSaveBtn.removeAttribute('disabled');
    } else {
        signupSaveBtn.setAttribute('disabled', 'true');   
    }
};

signupComponentUserId.addEventListener('blur', (event) => {
    signupComponentUserId.classList.add('dirty');
    validateSignUp();
    isSignUpValid();
});

signupComponentPassword.addEventListener('blur', (event) => {
    signupComponentPassword.classList.add('dirty');
    validateSignUp();
    isSignUpValid();
});

const validateSignUp = function() {
    const userNmDirty = signupComponentUserId.classList.contains('dirty');
    const pwdDirty = signupComponentPassword.classList.contains('dirty');
    const cnPwdDirty = signupComponentConfirmPassword.classList.contains('dirty');

    if (userNmDirty && signupUserName.length < 3) {
        signupError1.classList.remove('hidden');
        return;
    } else {
        signupError1.classList.add('hidden');
    }

    for (const userInfo of userInfos) {
        const [userName, password] = Object.keys(userInfo);

        if (userNmDirty && signupUserName.trim() === userInfo[userName] ) {
            signupError7.classList.remove('hidden');
            return;
        } else {
            signupError7.classList.add('hidden');
        }
    }

    if (pwdDirty && signupPwd.length < 6) {
        signupError3.classList.remove('hidden');
        return;
    } else {
        signupError3.classList.add('hidden');
    }

    if (pwdDirty && signupPwd.toLowerCase() === signupPwd) {
        signupError4.classList.remove('hidden');
        return;
    } else {
        signupError4.classList.add('hidden');
    }

    if (pwdDirty && signupPwd.toUpperCase() === signupPwd) {
        signupError5.classList.remove('hidden');
        return;
    } else {
        signupError5.classList.add('hidden');
    }

    if (pwdDirty && !specialChars.test(signupPwd)) {
        signupError6.classList.remove('hidden');
        return;
    } else {
        signupError6.classList.add('hidden');
    }

    if (pwdDirty && !hasNumber.test(signupPwd)) {
        signupError8.classList.remove('hidden');
        return;
    } else {
        signupError8.classList.add('hidden');
    }

    if (pwdDirty && cnPwdDirty && signupConfirmPwd !== signupPwd) {
        signupError2.classList.remove('hidden');
        return;
    } else {
        signupError2.classList.add('hidden');
    }
};

signupComponentConfirmPassword.addEventListener('blur', (event) => {
    signupComponentConfirmPassword.classList.add('dirty');

    validateSignUp();
    isSignUpValid();
});

signupComponentUserId.addEventListener('change', (event) => {
    signupUserName = event.target.value;
});

signupComponentPassword.addEventListener('change', (event) => {
    signupPwd = event.target.value;
});

signupComponentConfirmPassword.addEventListener('change', (event) => {
    signupConfirmPwd = event.target.value;
});

const signUpCloseOrCancel = (event) => {
    signupComponent.classList.toggle('hidden');
    loginComponent.classList.toggle('hidden');
    clearSignUpForm();
};

signupCancelBtn.addEventListener('click', signUpCloseOrCancel);
signupClose.addEventListener('click', signUpCloseOrCancel);
signupSaveBtn.addEventListener('click', (event) => {
    userInfos.unshift({
        userName: signupUserName.toLocaleLowerCase(),
        password: signupPwd,
        roles: [signupRole]
    });
    generalInfoTextMessage = `User \'${signupUserName}\' added!!`
    clearSignUpForm();
    signupComponent.classList.add('hidden');
    generalInfoPrevComponent = loginComponent;
    setGeneralInfoVisibleAndText();
})

const clearSignUpForm = function() {
    signupForm.reset();
    signupComponentUserId.classList.remove('dirty');
    signupComponentPassword.classList.remove('dirty');
    signupComponentConfirmPassword.classList.remove('dirty');
    signupUserName = '';
    signupPwd = '';
    signupConfirmPwd = '';
    signupSaveBtn.setAttribute('disabled', 'true');
    signupError1.classList.add('hidden');
    signupError2.classList.add('hidden');
    signupError3.classList.add('hidden');
    signupError4.classList.add('hidden');
    signupError5.classList.add('hidden');
    signupError6.classList.add('hidden');
    signupError7.classList.add('hidden');
    signupError8.classList.add('hidden');
}

signupUserSelect.addEventListener('change', (event) => {
    signupRole = event.target.value;
});