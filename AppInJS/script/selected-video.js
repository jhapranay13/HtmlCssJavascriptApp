'use strict';

selectedVidHeader.addEventListener('click', (event) => {
    selectedVidCrdContainer.classList.toggle('hidden');
});

selectedVidCrdContainer.addEventListener('click', (event) => {
    const selectedSet = selectedVidUser.get(currLoggedInUser.userName);
    selectedSet.delete(event.target.dataset.videoName);

    if (!selectedSet.size) {
        selectedVidUser.delete(currLoggedInUser.userName);
    }
    drawAvailableVideoCards();
    drawSelectedVideoCount();
    drawSelectedVideoContainer();
});