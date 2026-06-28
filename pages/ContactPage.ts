import type{Page, Locator} from '@playwright/test'
import type { ContactPageForm } from '../models/ContactPageFormat.js'

export class ContactPage{
    private readonly page:Page
    private readonly name:Locator
    private readonly email:Locator
    private readonly subject:Locator
    private readonly message:Locator
    private readonly chooseFile:Locator


    constructor(page:Page){
        this.page = page
        this.name = page.getByTestId('name')
        this.email = page.getByTestId('email')
        this.subject = page.getByTestId('subject')
        this.message = page.getByTestId('message')
        this.chooseFile = page.locator('input[type="file"]')
    }

    async navigateToContactPage(){
        await this.page.goto('/contact_us')
    }

    async fillContactPage(data:ContactPageForm){
        await this.name.fill(data.name)
        await this.email.fill(data.email)
        await this.subject.fill(data.subject)
        await this.message.fill(data.message)
        await this.chooseFile.setInputFiles(data.file)
    }
}