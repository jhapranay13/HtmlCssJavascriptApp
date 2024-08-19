profileMgmtForm.addEventListener('submit', (event) => {
    const data = new FormData(profileMgmtForm);
    

    for (const userInfo of userInfos) {

        if (userInfo.userName === currLoggedInUser.userName) {
            const holderObj = {}

            for (const entry of data) {
                holderObj[entry[0]] = entry[1];
            }
            userInfo['address'] = holderObj;
            billingMgmtFormHidden.classList.toggle('hidden');
            profileMgmtForm.classList.toggle('hidden');
            break;
        }
    }
    event.preventDefault();

});

profileMgmtForm.addEventListener("formdata", (e) => {
    const data = e.formData;
    
  });

billingChk.addEventListener("change", (event) => {

    if(event.target.checked) {
        const userName = currLoggedInUser.userName;
        let address = null;
        
        for (const userInfo of userInfos) {

            if (userInfo.userName === userName) {
                address = userInfo.address;
                break;
            }
        }

        for (let [key, value] of Object.entries(address)) {

            if (key === 'firstName' || key === 'lastName') {
                continue;
            }
            let billingKeyToUse = "billing";
            billingKeyToUse += (key[0].toUpperCase() + key.substring(1, key.length));
            const elem = document.querySelector(`#${billingKeyToUse}`);
            elem.value = value;
        }
    }
});

billingMgmtFormHidden.addEventListener('submit', (event) => {
    const data = new FormData(profileMgmtForm);
   

    for (const userInfo of userInfos) {

        if (userInfo.userName === currLoggedInUser.userName) {
            const holderObj = {}

            for (const entry of data) {
                holderObj[entry[0]] = entry[1];
            }
            userInfo['billing'] = holderObj;
            billingMgmtFormHidden.classList.toggle('hidden');
            profileMgmtForm.classList.toggle('hidden');
            break;
        }
    }
    event.preventDefault();
    generalInfoPrevComponent = profileMgmtForm;
    generalInfoTextMessage = "Address and Billing Address records saved!!";
    setGeneralInfoVisibleAndText();
});


