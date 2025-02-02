const {expect} = require('@Playwright/test')
class LoginPage {
    constructor(page) {
      this.page = page
      this.Username = page.locator('#user-name')
      this.Password = page.locator('#password')
      this.Submit = page.locator('#login-button')
      this.addbackpackpage = page.locator('#add-to-cart-sauce-labs-backpack')
      this.addbikelight = page.locator('#add-to-cart-sauce-labs-bike-light')
      this.cart = page.locator('.shopping_cart_link')
      this.checkout = page.locator('#checkout')
      this.firstname = page.locator('#first-name')
      this.lastname = page.locator('#last-name')
      this.postalcode = page.locator('#postal-code')
      this.continue = page.locator('#continue')
      this.completebuying = page.locator('#finish')
    }
   // -----------------------------Login with correct creds----------------------------------------

    async Correctlogincreds(){
    
      const logoname = 'Swag Labs'
      await this.page.goto('https://www.saucedemo.com/')
      await expect(this.page).toHaveURL(/saucedemo/);      //To check if the url is correct or not
      console.log('URL Matched');  
      const title = await this.page.title()                               //To get the title of the page
      console.log(title)                                                  //Printing the title of the page
      await expect(this.page).toHaveTitle("Swag Labs")
      console.log('Title Matched')
      await this.Username.fill('standard_user')                             //To fill the username field
      await this.Password.fill('secret_sauce')                              //To fill the password field
      await this.Submit.click()                                             //To click on the submit button        
      if(await this.page.locator('.app_logo').textContent()===logoname){    //To check if the login is successful by checking the logo name
        console.log('Login Successful')
      }else{
     console.log('Login Failed')
    }
    }
    //-------------------------------------- Login with incorrect creds--------------------------------------

    async Incorrectlogincreds(){
      let title = 'Swag Labs'
      await this.page.goto('https://www.saucedemo.com/')
      await this.Username.fill('standard')               //To fill the incorrect username field
      await this.Password.fill('secret')                 //To fill the incorrect password field     
      await this.Submit.click()                          //To click on the submit button    
      if (await this.page.locator('.error-message-container').textContent() === 'Epic sadface: Username and password do not match any user in this service'){    //To check if the error message is displayed or not
          console.log('Login Failed')
      }else{
          console.log('Login Successful')
      }
    }
    // -----------------------------Adding two product to cart and buying them----------------------------------------
    async addtocart(){
      await this.Correctlogincreds()                                             //calling the Correctlogincreds function to login
      await this.addbackpackpage.click()                                        //To add the backpack to the cart
      await this.addbikelight.click()                                           //To add the bike light to the cart
      await this.cart.click()   
      await expect(this.page).toHaveURL(/cart.html/)                            //To check if the url is correct or not
      console.log("Redirect to Your Cart Section")                                             //To click on the cart icon
      await this.checkout.click()   
      await expect(this.page).toHaveURL(/checkout/)                            //To check if the url is correct or not
      console.log("Redirect to Your Your Information Section")                  //To click on the checkout button
      await this.firstname.fill('John')                                         //To fill the first name field for buying the product
      await this.lastname.fill('Doe')                                           //To fill the last name field for buying the product
      await this.postalcode.fill('12345')                                       //To fill the postal code field for buying the product
      await this.continue.click()                                                //To click on the continue button and redirect to next page
      const product1 = await this.page.locator(".inventory_item_price").first().textContent()   //To get the price of the first product
      console.log(product1) 
      const product2 = await this.page.locator(".inventory_item_price").last().textContent()    //To get the price of the second product
      console.log(product2) 
      let TotalPrice  = parseFloat(product1.slice(1)) + parseFloat(product2.slice(1))           //To calculate the total price of the products
      console.log("Total Price",+TotalPrice)
      const Price = await this.page.locator('.summary_subtotal_label').textContent()
      console.log(Price)
     const FinalPrice = parseFloat(Price.slice(13))                                      
      console.log(FinalPrice)
      if(TotalPrice == FinalPrice){                                            //To check if the total price of the products is matched or not
          console.log('Total Price Matched')}
      else{
          console.log('Total Price Not Matched')
      }
      await this.completebuying.click()                                         //To click on the finish button and complete the buying process
      console.log(await this.page.locator('.complete-header').textContent())    //To check if the buying process is completed or not
  }
}
  module.exports = { LoginPage }
