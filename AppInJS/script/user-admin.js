'use strict';

adminHeader.addEventListener('click', (event) => {
    adminTableComponent.classList.toggle('hidden');

    if (!adminTableComponent.classList.contains('hidden')) {
        copyUserInfo = copyDataInit(currLoggedInUser.userName);

        drawUserTableComponent();
    }
});

const drawUserTableComponent = () => {
    calculateDrawOption();
    drawUserTable(0, 1, copyUserInfo);
};

const calculateDrawOption = () => {
    const recSize = copyUserInfo.length;
    let pagesToDraw = recSize / currUserAdminPageSize + 
        (recSize % currUserAdminPageSize != 0 ? 1 : 0);

    recordsPerPageTexbx.value = currUserAdminPageSize;
    drawOptions(pagesToDraw);
};

const drawOptions = (pagesToDraw) => {
    const element = document.createElement('select');
    let rcdsPageNumComponent =  adminTableComponent.querySelector('.page-number');

    element.className = 'page-number';

    for (let i = 1; i <= pagesToDraw; i++) {
        const opt = document.createElement('option');
        opt.value = ""+ i;
        opt.text = ""+ i;
        element.appendChild(opt);
    }
    rcdsPageComponent.removeChild(rcdsPageNumComponent)  ;
    rcdsPageComponent.appendChild(element);
};

const drawUserTable = (initialIndex, pageNumber, userData) => {
    let htmlText = '';
    let endIndexCalc = currUserAdminPageSize * pageNumber;
    let endIndex = Math.min(endIndexCalc, userData.length);
    let counter = 0;
    const currUser = currLoggedInUser.userName;
    

    for(let i = initialIndex; i < endIndex; i++) {
        let disabledSelect = 'disabled';
        let checked = '';
        let userInfo = null;
        let rolesTxtHidden = "";
        let rolesSltHidden = "hidden";
        
        if(!selectedUsers.has(userData[i].userName)) {
            userInfo = userData[i];
        } else {
            let obj = selectedUsers.get(userData[i].userName);
            rolesTxtHidden = "hidden";
            rolesSltHidden = "";
            disabledSelect = "";
            checked = "checked";

            if (obj.dirty) {
                userInfo = {
                    userName: obj.userName_ ? obj.userName_ : obj.userName,
                    password: obj.password_ ? obj.password_ : obj.password,
                    roles:[obj.role_ ? obj.role_ : obj.role]
                };
            } else {
                userInfo = {
                    userName: obj.userName,
                    password: obj.password,
                    roles:[obj.role]
                };
            }
        }

        if (!userInfo) {
            break;
        }
        let userName = userInfo.userName;
        let password = userInfo.password;
        let role = userInfo.roles[0];
        let premium = role === "premium" ? "selected" : "";
        let normal = role === "normal" ? "selected" : "";
        let color = counter % 2 == 0 ? "green" : "white"
        htmlText += 
        `<tr id="row_${counter}" data-user-id="${userName}">
            <td>
                <input class="password-input-text-${color}" disabled type="text" value="${userName}" data-user-id="${userName}"/>
            </td>
            <td>
                <input class="password-input-text-${color}" id="pwd_text_${counter}" ${disabledSelect} type="text" value="${password}" data-user-id="${userName}"/>
            </td>
            <td>
                <input class="password-input-text-${color} ${rolesTxtHidden}" id="role_text_${counter}" disabled type="text" value="${role}" data-user-id="${userName}"/>
                <select class="password-input-text-${color} ${rolesSltHidden}" id="role_select_${counter}" ${disabledSelect} data-user-id="${userName}">
                    <option value="premium" ${premium} data-index="${counter}">premium</option>
                    <option value="normal" ${normal} data-index="${counter}">normal</option>
                </select>
            </td>
            <td>
                <input type="checkbox" class="edit-chk" data-id="${counter}" data-user-id="${userName}" ${checked}/>
            </td>
        </tr>`;
        counter++;
    }
    adminTableBodyComponent.innerHTML = htmlText;
};

rcdsSearchTableComponent.addEventListener('keyup', (event) => {
    const searchVal = event.target.value;
    copyUserInfo = filterResult(searchVal);
    calculateDrawOption();
    drawUserTable(0, 1, copyUserInfo);
});

rcdsPerPageComponent.addEventListener('change', (event) => {
    const val = event.target.value;
    currUserAdminPageSize = val;
    calculateDrawOption();
    drawUserTable(0, 1, copyUserInfo);  
});


rcdsPageComponent.addEventListener('change', (event) => {
    const pageVal = event.target.value;
    const startIndex = (pageVal - 1) * currUserAdminPageSize;
    const searchVal = rcdsSearchTableComponent.value;
    const copyUserInfo = filterResult(searchVal);
    drawUserTable(startIndex, pageVal, copyUserInfo);
});

adminTable.addEventListener('change', (event) => {
    if (event.target.type === "checkbox") {
        checkboxOperation(event);
    }

    if (event.target.type === "select-one") {
        selectOperation(event);
    }

    if (event.target.type === "text") {
        textOperation(event);
    }
});


const textOperation = (event) => {
    let userId = event.target.dataset.userId;
    const atUser = selectedUsers.get(userId);
    atUser.dirty = true;
    atUser.password_ = event.target.value;
};

const selectOperation = (event) => {
    let id = event.target.id;
    let userId = event.target.dataset.userId;
    let index = event.target.dataset.index;
    const lastIndex = id.lastIndexOf('_');
    id = id.slice(lastIndex + 1);
    const roleTextId = `#role_text_${id}`;
    const roleElem = adminTableComponent.querySelector(roleTextId);
    roleElem.value = event.target.value;
    const atUser = selectedUsers.get(userId);
    atUser.dirty = true;
    atUser.role_ = roleElem.value;
    atUser.selectedIndex_ = event.target.selectedIndex;
};

const checkboxOperation = (event) => {
    const id = event.target.dataset.id;
    const rowId = `#row_${id}`;
    const pwdTextId = `#pwd_text_${id}`;
    const roleTextId = `#role_text_${id}`;
    const roleSelectId = `#role_select_${id}`;

    const rowElem = adminTableComponent.querySelector(rowId);
    const pwdElem = adminTableComponent.querySelector(pwdTextId);
    const roleElem = adminTableComponent.querySelector(roleTextId);
    const selectElem = adminTableComponent.querySelector(roleSelectId);
    const uname = rowElem.dataset.userId;
    const pwd = pwdElem.value;
    const role = roleElem.value;

    if (event.target.checked) {
        selectedUsers.set(uname, {
            userName: uname,
            password: pwd,
            role: role,
            selectedIndex: selectElem.selectedIndex
        });
        roleElem.classList.toggle('hidden');
        selectElem.classList.toggle('hidden');
        selectElem.disabled = false;
        pwdElem.disabled = false;
    } else {
        const obj = selectedUsers.get(uname);
        selectedUsers.delete(uname)
        pwdElem.value = obj.password;
        selectElem.selectedIndex = obj.selectedIndex;
        roleElem.value = obj.role;
        roleElem.classList.toggle('hidden');
        selectElem.classList.toggle('hidden');
        selectElem.disabled = true;
        pwdElem.disabled = true;
    }
};

userTrash.addEventListener('click', (event) => {

    if (selectedUsers.size) {
        confirmTextMessage = `Are you sure you want to delete ${selectedUsers.size} records?`
        confirmFunctionToExecute = trashingUserRecords;
        confirmFunctionArguments = [];
        confirmComponentToggle();
    }
});

const trashingUserRecords = () => {
    let index = 0;

    for (const user of copyUserInfo) {

        if (selectedUsers.has(user.userName)) {
            copyUserInfo.splice(index, 1);
            index--;
        }
        index++;
    }
    index = 0;

    for (const user of userInfos) {

        if (selectedUsers.has(user.userName)) {
            userInfos.splice(index, 1);
            index--;
        }
        index++;
    }
    drawUserTableComponent();
};

userSave.addEventListener('click', (event) => {
    if (selectedUsers.size) {
        const savingList = new Map();;
        
        for (const key of selectedUsers.keys()) {

            let obj = selectedUsers.get(key);

            if (obj.dirty) {
                let chkDirty = false;

                if (obj.userName_) {
                    chkDirty |= (obj.userName_ !== obj.userName);
                }

                if (obj.password_) {
                    chkDirty|= (obj.password_ !== obj.password);
                }

                if (obj.role_) {
                    chkDirty |= (obj.role_ !== obj.role);
                }

                if (chkDirty) {
                    savingList.set(obj.userName, obj);
                }
            } 
        }

        if (savingList.size) {
            confirmTextMessage = `Are you sure you want to save ${savingList.size} records?`
            confirmFunctionToExecute = savingUserRecords;
            confirmFunctionArguments = [savingList];
            confirmComponentToggle();
        }
    }
});

const savingUserRecords = (filteredUsers) => {
    for (const user of copyUserInfo) {

        if (filteredUsers.has(user.userName)) {
            let obj = filteredUsers.get(user.userName)
            user.password = obj.password_ ?? obj.password;
            user.roles = [obj.role_ ?? obj.role];
        }
    }

    for (const user of userInfos) {

        if (filteredUsers.has(user.userName)) {
            let obj = filteredUsers.get(user.userName)
            user.password = obj.password_ ?? obj.password;
            user.roles = [obj.role_ ?? obj.role];
        }
    }
    selectedUsers.clear();
    drawUserTableComponent();
};