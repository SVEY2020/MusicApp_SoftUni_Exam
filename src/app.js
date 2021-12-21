import { logout } from './api/data.js';
import { page , render } from './lib.js'
import { getUserData } from './util.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';


const root = document.getElementById('main-content')
document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/catalog', catalogPage);




updateUserNav();
page.start();


function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root)
    // ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

export function updateUserNav(){
    const userData = getUserData();

    if(userData){
        document.getElementById('user').style.display = "inline-block"
        document.getElementById('guest').style.display = "none"
    }else{
        document.getElementById('user').style.display = "none"
        document.getElementById('guest').style.display = "inline-block"
    }
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/')
}