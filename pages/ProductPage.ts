import {type Page,type Locator, expect} from '@playwright/test'

export class ProductPage{
    private readonly page:Page
    private readonly searchBar:Locator
    private readonly searchButton:Locator
    private readonly category:Locator
    private readonly brand:Locator
    private readonly productAddToCartButton:Locator
    private readonly viewProductButton:Locator
    private readonly productPrice:Locator
    private readonly productImage:Locator
    private readonly productName:Locator

    constructor(page:Page){
        this.page = page
        this.searchBar = page.locator('#search_product')
        this.searchButton = page.locator('#submit_search')
    }

    async navigateToProductPage(){
        await this.page.goto('/products')
    }

    async selectCategory(mainMenu:string, subMenu:string){
        let mainElement = this.page.getByRole('heading').getByRole('link',{name:mainMenu}).last()
        let subElement = this.page.getByRole('list').getByRole('link',{name:subMenu})
        await mainElement.click()
        await subElement.click()
    }

    async selectBrands(brand:string){
        await this.page.getByRole('list').getByRole('link', {name:brand}).click()
    }

    async searchBarFunctionality(searchTerm:string){
        await this.searchBar.fill(searchTerm)
        await this.searchButton.click()
    }

    async getSelectedItem(item:string){

    }

}