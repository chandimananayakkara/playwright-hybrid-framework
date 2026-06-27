import type { Page, Locator } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId("login-email");
    this.passwordInput = page.getByTestId("login-password");
    this.loginBtn = page.getByTestId("login-button");
  }

  async navigateToLoginPage() {
    await this.page.goto("/login");
  }

  async fillLoginPage(email:string, password:string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async getValidationMessage(field:'email' | 'password'){
    const element = field === 'email'? this.emailInput : this.passwordInput
    const message = await element.evaluate((ele:HTMLInputElement)=>{
        return ele.validationMessage
    })

    return message
  }

  get emailInputField(){
    return this.emailInput
  }

  get passwordInputField(){
    return this.passwordInput
  }

  get loginButton(){
    return this.loginBtn
  }

  get loginTitle(){
    return this.page.getByRole('heading', {name:'Login to your account'})
  }
}
