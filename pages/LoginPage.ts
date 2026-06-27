import type { Page, Locator } from "@playwright/test";
import type { UserLogin } from "../models/UserLogin.js";

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

  async getValidationMessasge(field:string){
    let element:Locator
    
    if(field==='email'){
        element = await this.page.getByTestId('login-email')
    }else{
        element = await this.page.getByTestId('login-password')
    }

    const message = await element.evaluate((ele:HTMLInputElement)=>{
        return ele.validationMessage
    })

    return message
  }
}
