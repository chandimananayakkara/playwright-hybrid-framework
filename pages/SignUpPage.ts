import type { Page, Locator } from "@playwright/test";
import type { Register_User } from "../models/Register_User.js";

export class SignUpPage {
  private readonly page: Page;
  private readonly name: Locator;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly formName:Locator
  private readonly formEmail:Locator
  private readonly day: Locator;
  private readonly month: Locator;
  private readonly year: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly company: Locator;
  private readonly address: Locator;
  private readonly country: Locator;
  private readonly state: Locator;
  private readonly city: Locator;
  private readonly zipCode: Locator;
  private readonly mobile: Locator;
  private readonly createButton:Locator
  private readonly signUpButton:Locator
  private readonly signUpFTitle:Locator
  private readonly signUpPTitle:Locator

  constructor(page: Page) {
    this.page = page
    this.name = page.getByTestId('signup-name')
    this.email = page.getByTestId('signup-email')
    this.formName = page.getByTestId('name')
    this.formEmail = page.getByTestId('email')
    this.password = page.getByTestId('password')
    this.day = page.getByTestId('days')
    this.month = page.getByTestId('months')
    this.year = page.getByTestId('years')
    this.firstName = page.getByTestId('first_name')
    this.lastName = page.getByTestId('last_name')
    this.company = page.getByTestId('company')
    this.address = page.getByTestId('address')
    this.country = page.getByTestId('country')
    this.state = page.getByTestId('state')
    this.city = page.getByTestId('city')
    this.zipCode = page.getByTestId('zipcode')
    this.mobile = page.getByTestId('mobile_number')
    this.createButton = page.getByTestId('create-account')
    this.signUpButton = page.getByTestId('signup-button')
    this.signUpFTitle = page.getByRole('heading', {name:'Enter Account Information'})
    this.signUpPTitle = page.getByRole('heading',{name:'New User Signup!'})

  }

  async navigateToRegisterPage(){
    await this.page.goto('/login')
  }

  
  async fillSignUpPage(name:string, email:string){
    await this.name.fill(name)
    await this.email.fill(email)
    await this.signUpButton.click()
  }

  async fillUserForm(userData: Register_User){
    userData.title === 'Mr' ? await this.page.locator('#id_gender1').click() : await this.page.locator('#id_gender2').click()
    await this.password.fill(userData.password)
    await this.day.click()
    await this.day.selectOption(userData.day)
    await this.month.click()
    await this.month.selectOption(userData.month)
    await this.year.click()
    await this.year.selectOption(userData.year)
    await this.firstName.fill(userData.firstName)
    await this.lastName.fill(userData.lastName)
    await this.company.fill(userData.company)
    await this.address.fill(userData.address)
    await this.country.click()
    await this.country.selectOption(userData.country)
    await this.state.fill(userData.state)
    await this.city.fill(userData.city)
    await this.zipCode.fill(userData.zipCode)
    await this.mobile.fill(userData.mobile)
    await this.createButton.click()
  }

  get signUpPageTitle(){
    return this.signUpPTitle
  }

  get signUpFormTitle(){
    return this.signUpFTitle
  }

  get userName(){
    return this.firstName
  }

  get userEmail(){
    return this.formEmail
  }

  get createAccountButton(){
    return this.createButton
  }

  async getValidationMessage(){
    const element = this.email
    const message = await element.evaluate((ele:HTMLInputElement)=>{
        return ele.validationMessage
    })

    return message
  }
}
