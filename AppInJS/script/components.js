'use strict';

const loginComponent = document.querySelector('.login');
const loginSuccessfullComponent = document.querySelector('.login-successfull');
const loginErrorComponent = loginComponent.querySelector('.login-uname-error');
const userNameComponent = loginComponent.querySelector('.login-userid');
const signupLinkComponent = loginComponent.querySelector('.signup-link');
const loginForm = loginComponent.querySelector('.login-form');

const signupComponent = document.querySelector('.signup');
const signupForm = document.querySelector('#signup-form');
const signupClose = signupComponent.querySelector('#signup-close');
const signupCancelBtn = signupComponent.querySelector('.signup-cancel');
const signupSaveBtn = signupComponent.querySelector('.signup-save');
const signupComponentUserId = signupComponent.querySelector('.choosen-userid');
const signupComponentPassword = signupComponent.querySelector('.choosen-pwd');
const signupComponentConfirmPassword = signupComponent.querySelector('.choosen-pwd1');
const signupError1 = signupComponent.querySelector('#superr1');
const signupError2 = signupComponent.querySelector('#superr2');
const signupError3 = signupComponent.querySelector('#superr3');
const signupError4 = signupComponent.querySelector('#superr4');
const signupError5 = signupComponent.querySelector('#superr5');
const signupError6 = signupComponent.querySelector('#superr6');
const signupError7 = signupComponent.querySelector('#superr7');
const signupError8 = signupComponent.querySelector('#superr8');
const signupUserSelect = signupComponent.querySelector('.choosen-role');

const mainHeaderLogoutImgComponent = document.querySelector('.logout-img');
const mainHeaderLogoutComponent = document.querySelector('.login-successfull');


const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const hasNumber = /\d/;  

const generalInfo = document.querySelector('.ginfo');
const generalInfoText = generalInfo.querySelector('.info-text');
let generalInfoTextMessage = '';
const generalInfoOkBtn = generalInfo.querySelector('.info-ok-btn');
let generalInfoPrevComponent = null;
const generalInfoClose = generalInfo.querySelector('#general-info-close');

const showPwdCheckBoxes = document.querySelectorAll('.show-pwd-checkbox');

for (const showPwdCheckBox of showPwdCheckBoxes) {
    showPwdCheckBox.addEventListener('click', (event) => {
        const passwordFieldClass = showPwdCheckBox.dataset.forPwd;
        const passwordField = document.querySelector('.' + passwordFieldClass);
        
        if (showPwdCheckBox.checked === true) {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    });
};

const cloakComponent = document.querySelector('.cloak');
const confirmComponent = document.querySelector('.confirm-component');
let confirmTextMessage = '';
const confirmOkBtn = confirmComponent.querySelector('.confirmation-ok');
const confirmCancelBtn = confirmComponent.querySelector('.confirmation-cancel');
const confirmTextComp = confirmComponent.querySelector('.confirmation-text');
let confirmFunctionToExecute = '';
let confirmFunctionArguments = [];

const menuBar = document.querySelector('.menubar');
const menuBarContainer = document.querySelector('.menu-holder');

const personAdminComponent = document.querySelector('.admin-component');
const videoLibComponent = document.querySelector('.video-component');
const quizComponent = document.querySelector('.quiz-component');
const quizContainer = quizComponent.querySelector('.quiz-container');
const startQuizCard = quizComponent.querySelector('.start-quiz');
const quizStartBtn = quizContainer.querySelector('.start-quiz-btn');
const quiztimerContainer = quizContainer.querySelector('.quiz-timer-container');
const quizQuesContainer = quizContainer.querySelector('.quiz-ques-container')
const quizQuesCard = quizComponent.querySelector('.quiz-ques-card');
const quizQuestion = quizComponent.querySelector('.quiz-question');
const quizAnswer = quizComponent.querySelector('.quiz-answer');
const quiztimerLine = quizContainer.querySelector('.quiz-timer-line');
const endQuiz = quizContainer.querySelector('.end-quiz');

const profileMgmtComponent = document.querySelector('.profile-component');
let currComponent = null;

const adminComponent = document.querySelector('.admin-component');
const adminContainer = adminComponent.querySelector('.admin-container');
const adminHeader = adminComponent.querySelector('.admin-header');
const adminTableComponent = adminComponent.querySelector('.user-table-component');
const adminTableBodyComponent = adminComponent.querySelector('.user-record-container');
const adminTableCtrlsComponent = adminTableComponent.querySelector('.user-table-controls');
const recordsPerPageTexbx = adminTableCtrlsComponent.querySelector('.records-per-page');
const recordsPageNum = adminTableCtrlsComponent.querySelector('.page-number');
const rcdsSearchTableComponent = adminTableComponent.querySelector('.search-text');
const rcdsPerPageComponent =  adminTableComponent.querySelector('.records-per-page');
const rcdsPageComponent =  adminTableComponent.querySelector('.page-number-container');
const adminTable = adminComponent.querySelector('.user-table');
const userTrash = adminComponent.querySelector('#user-trash-img');
const userSave = adminComponent.querySelector('#user-save-img');

const availableVideoContainer = document.querySelector('.available-video-container');
const availableVideoHeader = availableVideoContainer.querySelector('.available-video-header');
const availableVideoCardContainer = availableVideoContainer.querySelector('.available-video-card-container');

const selectedVidContainer = document.querySelector('.selected-video-container');
const selectedVidCounter = selectedVidContainer.querySelector('.selected-video-counter');
const selectedVidHeader = selectedVidContainer.querySelector('.selected-video-header');
const selectedVidCrdContainer = selectedVidContainer.querySelector('.selected-video-card-container');
const selectedVidZero = selectedVidCrdContainer.querySelector('.selected-video-zero');

const profileManagementDrawArea = selectedVidCrdContainer.querySelector('.profile-management-draw-area');

const profileMgmtForm = document.querySelector('.profile-mgmt-form');
const formSaveBtn = document.querySelector('.form-save');
const billingMgmtFormHidden = document.querySelector('.billing-mgmt-form');
const billingChk = document.querySelector('#billingChk');
