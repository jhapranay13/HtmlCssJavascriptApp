'use strict';

generalInfoOkBtn.addEventListener('click', (event) => {
    generalInfo.classList.add('hidden');
    generalInfoPrevComponent.classList.remove('hidden');
    generalInfoText.textContent = '';
});

generalInfoClose.addEventListener('click', (event) => {
    generalInfo.classList.add('hidden');
    generalInfoPrevComponent.classList.remove('hidden');
    generalInfoText.textContent = '';
});

const setGeneralInfoVisibleAndText = function() {
    generalInfo.classList.remove('hidden');
    generalInfoText.textContent = generalInfoTextMessage;
}