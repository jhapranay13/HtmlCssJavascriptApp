'use strict';

const createProjBtnClick= (event) => {
    hideAllContainerFunc();
    projectMgmtProjectDetailContainer.classList.remove('hidden');

}

createProjectBtn1.addEventListener('click', createProjBtnClick);
createProjectBtn2.addEventListener('click', createProjBtnClick);

projMgmtForm.addEventListener('submit', (event) => {
    const formData = new FormData(event.target);
    let holderObj = {}

    for (const entry of formData) {
        holderObj[entry[0]] = entry[1];
    }
    projectData.unshift(holderObj);
    hideAllContainerFunc();
    drawProjectList();
    projectMgmtCreateBtnContainer2.classList.remove('hidden');

    event.preventDefault();
});

const drawProjectList = () => {
    let htmlText = '';
    let index = 0;

    for (const proj of projectData) {
        htmlText += `<li><button class="project-select-btn" data-proj-assoc="${index++}">${proj['proj_name']}</button></li>`
    }
    projectList.innerHTML = htmlText;
};

projectList.addEventListener('click', (event) => {
    const index = event.target.dataset.projAssoc; 
    const dataForDetailPage = projectData[index];
    hideAllContainerFunc();
    drawProjectDetailPage(dataForDetailPage, index);

});

const drawProjectDetailPage = (dataForDetailPage, index) => {
    selectedProjectDetailContainer.classList.remove('hidden');
    projNameContent.innerText = dataForDetailPage.proj_name;
    projDescContent.innerHTML = dataForDetailPage.proj_desc;
    deleteProjBtn.setAttribute('data-proj-assoc', index);
    createTaskBtn.setAttribute('data-proj-assoc', index);
    let htmlText = '';

    if (dataForDetailPage['tsk_dtls']) {
        let tskDtlsObj = dataForDetailPage['tsk_dtls'];
        let indx = 0;

        for (const dtls of tskDtlsObj) {
            htmlText += `<li><div class="task-dtls-container">
                            <div class="task-name">
                            ${dtls['task_name']}
                            </div>
                            <div class="task-desc">
                            ${dtls['task_desc']}
                            </div>
                            <div class="task-remove">
                                <button class="remove-task-btn" data-proj-assoc="${index}" data-task-assoc="${indx}">Delete Task</button>
                            </div>
                        </div></li>`;
            indx++;
        }
    } else {
        htmlText += `<li>No Tasks Created yet</li>`;
    }
    taskDisplayHolder.innerHTML = htmlText;

};

deleteProjBtn.addEventListener('click', (event) => {
    const index = event.target.dataset.projAssoc; 
    projectData.splice(index, 1);
    hideAllContainerFunc();
    drawProjectList();
    projectMgmtCreateBtnContainer2.classList.remove('hidden');
});

createTaskBtn.addEventListener('click', (event) => {
    const index = event.target.dataset.projAssoc; 
    hideAllContainerFunc();
    projectMgmtProjectTaskContainer.classList.remove('hidden');
    createTaskForm.setAttribute('data-proj-assoc', index);
});

createTaskForm.addEventListener('submit', (event) => {
    const index = event.target.dataset.projAssoc; 

    let obj = projectData[index];
    const formData = new FormData(event.target);
    let holderObj = {};
    
    for (const entry of formData) {
        holderObj[entry[0]] = entry[1];
    }

    if (!obj['tsk_dtls']) {
        obj['tsk_dtls'] = [];
    }
    obj['tsk_dtls'].unshift(holderObj);
    hideAllContainerFunc();
    drawProjectDetailPage(obj, index);
    event.preventDefault();
    event.stopPropagation();
});

taskDisplayHolder.addEventListener('click', (event) => {
    const index = event.target.dataset.projAssoc;
    const idx = event.target.dataset.taskAssoc;

    let obj = projectData[index];
    obj['tsk_dtls'].splice(idx, 1);
    hideAllContainerFunc();
    drawProjectDetailPage(obj, index);
});

const hideAllContainerFunc = () => {
    projectMgmtCreateBtnContainer2.classList.add('hidden');
    projectMgmtProjectDetailContainer.classList.add('hidden');
    projectMgmtProjectDetailContainer.classList.add('hidden');
    selectedProjectDetailContainer.classList.add('hidden');
    projectMgmtProjectTaskContainer.classList.add('hidden');
};