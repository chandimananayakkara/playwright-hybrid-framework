import {Page, Locator} from '@playwright/test'

export class HomePage{
    private readonly page:Page
    private readonly homePageNav:Locator
    private readonly productsNav:Locator
    private readonly cartNav:Locator
    private readonly loginNav:Locator
    private readonly testCasesNav:Locator
    private readonly apiTestingNav:Locator
    private readonly contactNav:Locator
    private readonly vedioTutorial:Locator


    constructor(page:Page){
        this.page = page
        this.homePageNav = page.getByRole('link',{name:'Home'})
        this.productsNav = page.getByRole('link',{name:'Products'})
        this.cartNav = page.getByRole('link',{name:'Cart'})
        this.loginNav = page.getByRole('link',{name:' Signup / Login'})
        this.testCasesNav = page.getByRole('link',{name:'Test Cases'})
        this.apiTestingNav = page.getByRole('link',{name:'API Testing'})
        this.contactNav = page.getByRole('link',{name:'Contact us'})
        this.vedioTutorial = page.getByRole('link', {name: 'Video Tutorials'})
    }

    async navigateToHomePage(){
        await this.page.goto('/')
    }

    get productNavigation(){
        return this.productsNav;
    }

    get cartNavigation(){
        return this.cartNav;
    }

    get signUpNavigation(){
        return this.loginNav
    }

    get testCasesNavigation(){
        return this.testCasesNav;
    }

    get apiTestingNavigation(){
        return this.apiTestingNav;
    }

    get contactNavigation(){
        return this.contactNav;
    }

    get videoTutorialsNavigation(){
        return this.vedioTutorial;
    }
}