'use strict';

let userInfos = [{
    userName: 'admin',
    password: 'admin',
    roles:['admin']
}, {
    userName: 'sam',
    password: 'Password$1',
    roles:['normal']
}, {
    userName: 'chris',
    password: 'Password$1',
    roles:['premium']
}, {
    userName: 'mark',
    password: 'Password$1',
    roles:['normal']
}, {
    userName: 'ram',
    password: 'Password$1',
    roles:['premium']
}, {
    userName: 'senju',
    password: 'Password$1',
    roles:['normal']
}, {
    userName: 'maddy',
    password: 'Password$1',
    roles:['premium']
}, {
    userName: 'raghu',
    password: 'Password$1',
    roles:['normal']
}, {
    userName: 'danny',
    password: 'Password$1',
    roles:['normal']
}, {
    userName: 'nancy',
    password: 'Password$1',
    roles:['premium']
}, {
    userName: 'kiara',
    password: 'Password$1',
    roles:['premium']
}, {
    userName: 'amy',
    password: 'Password$1',
    roles:['premium']
}, {
    userName: 'ganesh',
    password: 'Password$1',
    roles:['normal']
}, {
    userName: 'baha',
    password: 'Password$1',
    roles:['premium']
}];

let videoCardData = [{
    videoName: "MathProblem1",
    videoTitle: "The Simplest Math Problem No One Can Solve - Collatz Conjecture",
    videoSubs: "3.4M",
    videoAge: "6 Months",
    videoAuthor: "Macdonal",
    thumbnailPath: "images/math-problem.webp",
    profilepicPath: "images/profile1.jpeg",
    videoduration: "11:00"
}, {
    videoName: "kadaneAlgo",
    videoTitle: "Kadane Algo explained in short",
    videoSubs: "1.4M",
    videoAge: "2 Years",
    videoAuthor: "Samuel",
    thumbnailPath: "images/kadane-algo.webp",
    profilepicPath: "images/profile2.jpeg",
    videoduration: "21:32" 
}, {
    videoName: "PowerOfNow",
    videoTitle: "The Power of now was never explained in such detail",
    videoSubs: "37.4M",
    videoAge: "6 Months",
    videoAuthor: "JK",
    thumbnailPath: "images/goole-tech-talk.webp",
    profilepicPath: "images/profile3.jpeg" ,
    videoduration: "7:45"
}, {
    videoName: "dubaiTrain",
    videoTitle: "OMG - Underwater dubai train. What you should know",
    videoSubs: "11.2M",
    videoAge: "1 Year",
    videoAuthor: "Explorer",
    thumbnailPath: "images/thumbnail11.webp",
    profilepicPath: "images/profile4.jpeg" ,
    videoduration: "1:20:44"
}, {
    videoName: "WaterDrinking",
    videoTitle: "What will happen if you drink so much water",
    videoSubs: "11.4K",
    videoAge: "9 Months",
    videoAuthor: "Newb",
    thumbnailPath: "images/thumbnail12.webp",
    profilepicPath: "images/profile5.jpeg",
    videoduration: "10:00" 
}, {
    videoName: "FoodVlogger",
    videoTitle: "Amazing food prepared the right way!!",
    videoSubs: "121.4K",
    videoAge: "2 years",
    videoAuthor: "Explorer",
    thumbnailPath: "images/thumbnail10.webp",
    profilepicPath: "images/profile4.jpeg",
    videoduration: "1:10:33" 
}];

let selectedVidUser = new Map();

const currLoggedInUser = {};

const selectedUsers = new Map();

const roleMenuMap = new Map();
roleMenuMap.set('admin', ['person-admin', 'video-library', 'book-library', 'manage-profile']);
roleMenuMap.set('premium', ['video-library', 'book-library', 'manage-profile']);
roleMenuMap.set('normal', ['book-library', 'manage-profile']);

const menuComponentMap = new Map();
menuComponentMap.set('person-admin', personAdminComponent);
menuComponentMap.set('video-library', videoLibComponent);
menuComponentMap.set('book-library', bookLibComponent);
menuComponentMap.set('manage-profile', profileMgmtComponent);

const menuTextMap = new Map();
menuTextMap.set('person-admin', 'Administration');
menuTextMap.set('video-library', 'Video Library');
menuTextMap.set('book-library', 'Book Library');
menuTextMap.set('manage-profile', 'Profile Management');

const defaultUserAdminPageSize = 5;
let currUserAdminPageSize = defaultUserAdminPageSize;

const filterResult = (searchVal) => {
    const copyUser = userInfos.filter((userInfo, i, arr) => {

        if (currLoggedInUser.userName === userInfo.userName ||
            !userInfo.userName.includes(searchVal)) {

            return false;
        }
        return true;
    });
    return copyUser;
};

const copyDataInit = () => {
    const copyUser = userInfos.filter((userInfo, i, arr) => {
        if (currLoggedInUser.userName === userInfo.userName ) {
            return false;
        }
        return true;
    });
    return copyUser;
};

let copyUserInfo = copyDataInit();



