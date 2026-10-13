class LoginPractisePage {
  constructor(page) {
    this.page = page;
    this.userName = page.getByLabel("Username:");
    this.password = page.getByLabel("Password:");
    this.signInButton = page.getByRole("button", { name: "Sign In" });
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  }

  async validLogin(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
  }
}

module.exports = { LoginPractisePage };
