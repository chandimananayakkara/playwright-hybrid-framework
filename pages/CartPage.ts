import type{Page, Locator} from '@playwright/test'

export class CartPage{
    private readonly page:Page
    private readonly title:Locator
    private readonly message:Locator
    private readonly cartTable:Locator

    constructor(page:Page){
        this.page = page
        this.title = page.getByRole('list', {name:'Shopping Cart'})
        this.message = page.getByText('Cart is empty!')
        this.cartTable = page.locator('#cart_info_table tbody tr')
    }

    async navigateToCartPage(){
        await this.page.goto('/view_cart')
    }

    get findCartItems(){
        return this.cartTable
        
    }

    get pageTitle(){
        return this.title
    }

    get welcomeMessage(){
        return this.message
    }
}