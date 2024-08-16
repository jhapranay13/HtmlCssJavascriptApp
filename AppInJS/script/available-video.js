'use strict';

availableVideoHeader.addEventListener('click', ()=> {
    availableVideoCardContainer.classList.toggle('hidden');
    drawAvailableVideoCards();
});


const drawAvailableVideoCards = () => {
    let innerHTML = '';

    for (const videoData of videoCardData) {
        const vidName = videoData.videoName;
        const vidThumbNailPath = videoData.thumbnailPath;
        const profilePicPath = videoData.profilepicPath;
        const videoTitle = videoData.videoTitle;
        const profileName = videoData.videoAuthor;
        const subsStats = videoData.videoSubs;
        const vidAge = videoData.videoAge;
        const  duration = videoData.videoduration;
        const videoNames = selectedVidUser.get(currLoggedInUser.userName);
        console.log(currLoggedInUser);
        console.log(videoNames);

        if (videoNames && videoNames.has(vidName)) {
            continue;
        }

        innerHTML += 
            `<div class="video-card" data-video-name="${vidName}">
                <div class="video-cover" data-video-name="${vidName}">
                </div>
                
                <div class="video-thumbnail-container">
                    <img class="video-thumbnail" src="${vidThumbNailPath}"/>
                    <div class="video-duration">
                        ${duration}
                    </div>
                </div>
                <div class="video-description">
                    <div class="uploader-pic-container">
                        <img class="uploader-pic" src="${profilePicPath}"/>
                    </div>
                    <div class="descritopn-stats-container">
                        <div class="title-container">
                            ${videoTitle}
                        </div>
                        <div class="profile-name-container">
                            ${profileName} &#x2713
                        </div>
                        <div class="subscription-total-container">
                            ${subsStats} subscriptions &#183 ${vidAge}
                        </div>
                    </div>    
                </div>
            </div>`;
    }
    availableVideoCardContainer.innerHTML = innerHTML;
    drawSelectedVideoCount();
    drawSelectedVideoContainer();
};

availableVideoCardContainer.addEventListener('click', (event) => {
    const vidName = event.target.dataset.videoName;
    let index = 0;

    for (const cardData of videoCardData) {
        
        if (cardData.videoName === vidName) {
            break;
        }
        index++;
    }
    const selectedVideo = videoCardData[index];
    let videoSet = null;

    if (selectedVidUser.has(currLoggedInUser.userName)) {
        videoSet = selectedVidUser.get(currLoggedInUser.userName);
    } else {
        videoSet = new Set();
        selectedVidUser.set(currLoggedInUser.userName, videoSet);
    }
    videoSet.add(selectedVideo.videoName);
    console.log(videoSet);
    drawAvailableVideoCards();
    drawSelectedVideoCount();
    drawSelectedVideoContainer();
})

const drawSelectedVideoCount = () => {
    const userName = currLoggedInUser.userName;
    const videoSet = selectedVidUser.get(userName);
    let num = 0;

    if (videoSet) {
        num = videoSet.size;
    }
    selectedVidCounter.textContent = num;
}

const drawSelectedVideoContainer = () => {
    let innerHTML = '';
    const selectedVideoSet = selectedVidUser.get(currLoggedInUser.userName);

    if (selectedVideoSet) {

        for (const videoData of videoCardData) {
            const vidName = videoData.videoName;
            const vidThumbNailPath = videoData.thumbnailPath;
            const profilePicPath = videoData.profilepicPath;
            const videoTitle = videoData.videoTitle;
            const profileName = videoData.videoAuthor;
            const subsStats = videoData.videoSubs;
            const vidAge = videoData.videoAge;
            const  duration = videoData.videoduration;

            if (!selectedVideoSet.has(vidName)) {
                continue;
            }

            innerHTML += 
                `<div class="video-card" data-video-name="${vidName}">
                    <div class="video-cover" data-video-name="${vidName}">
                    </div>
                    
                    <div class="video-thumbnail-container">
                        <img class="video-thumbnail" src="${vidThumbNailPath}"/>
                        <div class="video-duration">
                            ${duration}
                        </div>
                    </div>
                    <div class="video-description">
                        <div class="uploader-pic-container">
                            <img class="uploader-pic" src="${profilePicPath}"/>
                        </div>
                        <div class="descritopn-stats-container">
                            <div class="title-container">
                                ${videoTitle}
                            </div>
                            <div class="profile-name-container">
                                ${profileName} &#x2713
                            </div>
                            <div class="subscription-total-container">
                                ${subsStats} subscriptions &#183 ${vidAge}
                            </div>
                        </div>    
                    </div>
                </div>`;
        } 
        selectedVidCrdContainer.innerHTML = innerHTML;
    } else {
        selectedVidCrdContainer.innerHTML = `<div class="selected-video-zero">
                        No Video Selected
                    </div>`;
    }
}
