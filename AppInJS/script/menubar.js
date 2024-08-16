'use strict';

const drawMenu = function() {
    const userRole = currLoggedInUser.roles;
    const menuItems = roleMenuMap.get(userRole[0]);
    let fullHtml = '';

    for (const menuItem of menuItems) {
        const menuText = menuTextMap.get(menuItem);
        const menuItemCreateText = `<div class="menu-itme-container">
             <button class="menu-item" data-component-assoc="${menuItem}">${menuText}</button>
            </div>`;
        fullHtml += menuItemCreateText;
    }

    if (fullHtml) {
        menuBarContainer.innerHTML = fullHtml;
    }
    const menuBarElements = menuBarContainer.querySelectorAll('.menu-item');
    
    for (const menuBarElement of menuBarElements) {

        const component = menuComponentMap.get(menuBarElement.dataset.componentAssoc);
        
        menuBarElement.addEventListener('click', (event) => {

            if (event.target.dataset.componentAssoc === 'video-library') {
                drawAvailableVideoCards();
            }

            if (currComponent) {
                currComponent.classList.add('hidden');
            }
            component.classList.remove('hidden');
            currComponent = component;
        });
    }
};