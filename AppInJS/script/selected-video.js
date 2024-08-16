'use strict';

selectedVidHeader.addEventListener('click', (event) => {
    selectedVidCrdContainer.classList.toggle('hidden');
});

selectedVidCrdContainer.addEventListener('click', (event) => {
    const videoName = event.target.dataset.videoName;
    confirmTextMessage = `Are you sure you want to remove this video?`
    confirmFunctionToExecute = removeFromSelectedRedrawComponents;
    confirmFunctionArguments = [videoName];
    confirmComponentToggle();
});

const removeFromSelectedRedrawComponents = (videoName) => {
    const selectedSet = selectedVidUser.get(currLoggedInUser.userName);
    selectedSet.delete(videoName);

    if (!selectedSet.size) {
        selectedVidUser.delete(currLoggedInUser.userName);
    }
    drawAvailableVideoCards();
    drawSelectedVideoCount();
    drawSelectedVideoContainer();
}