import {test, expect} from '@playwright/test'
import testData from '../data/users.json' with {"type":"json"}
import { ProductPage } from '../pages/ProductPage.js'

test.describe('Products Page Tests', ()=>{
  let productPage:ProductPage
    
    test.beforeEach(async ({page})=>{
        productPage = new ProductPage(page)
        await productPage.navigateToProductPage()
        
    })

    test('Should be show results according to search bar searched term', async ({page})=>{
        await productPage.searchBarFunctionality('Tshirt')
        await expect(page.getByText('Searched Products')).toBeVisible()
        await expect(page.getByText('Men Tshirt').last()).toBeVisible()
        await expect(page.getByText('Pure Cotton V-Neck T-Shirt').first()).toBeVisible()
    })

    test('Should not be showing any result when searching wrong term', async({page})=>{
        await productPage.searchBarFunctionality('car')
        let resultCount = await page.locator('.features_items').filter({hasText:'View Product'}).count()
         await expect( resultCount).toBe(0)
    })

    test('Should be matched elements only showed when choosing category in category section', async ({page})=>{
        await productPage.selectCategory('Men', 'Jeans')
        await expect(page.getByText('Men > Jeans')).toBeVisible()
        await expect(page.getByRole('heading', {name:'Men - Jeans Products'})).toBeVisible()
        await expect(page.getByText('Soft Stretch Jeans').last()).toBeVisible()
        await productPage.selectCategory('Kids', 'Dress')
        await expect(page.getByText('Kids > Dress')).toBeVisible()
        await expect(page.getByRole('heading', {name:'Kids - Dress Products'})).toBeVisible()
        await expect(page.getByText('Sleeveless Unicorn Print Fit & Flare Net Dress - Multi').last()).toBeVisible()
    })

    test('Should be matched only items according to brand', async ({page})=>{
        await productPage.selectBrands('Polo')
        await expect(page.getByRole('heading', {name:'Brand - Polo Products'})).toBeVisible()
        await expect(page.getByText('Blue Top').last()).toBeVisible()
    })

    test('Should be navigate to page top after clicking navigate to top button', async ({page})=>{
        let item =  page.getByText('Printed Off Shoulder Top - White').last()
        await item.scrollIntoViewIfNeeded()
        await expect(item).toBeVisible()
        await expect(page.locator('#scrollUp')).toBeVisible()
        await page.locator('#scrollUp').click()
        await expect(page.getByAltText('Website for automation practice').first()).toBeInViewport()
    })
})