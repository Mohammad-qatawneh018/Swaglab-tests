/// <reference types= "cypress" />
Cypress.Commands.add("login", () => {
  cy.visit("https://www.saucedemo.com/");
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();
});
describe("swag lab test", () => {
  it.skip("login with random users", () => {
    cy.visit("https://www.saucedemo.com/");
    let users = [
      "standard_user",
      "locked_out_user",
      "problem_user",
      "performance_glitch_user",
    ];
    let password = "secret_sauce";
    const randomIndex = Math.floor(Math.random() * users.length);
    cy.get('[data-test="username"]').type(users[randomIndex]);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  });

  it.skip("login with standard user and add all items to the cart", () => {
    cy.login();

    cy.get(".btn").click({ multiple: true });

    cy.get(".shopping_cart_badge").invoke("text").should("contain", "6");
  });

  it.skip("checking out all the items", () => {
    cy.login();

    cy.get(".btn").click({ multiple: true });

    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("mohammad");
    cy.get('[data-test="lastName"]').type("qatawneh");
    cy.get('[data-test="postalCode"]').type("2312");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();

    cy.get(".complete-header")
      .invoke("text")
      .should("include", "Thank you for your order!");
  });

  it("check if the sort functionality is correct Price(low-high)", () => {
    cy.login();
    cy.get('[data-test="product_sort_container"]').select(2);
    cy.get(".inventory_item_price")
      .first()
      .invoke("text")
      .then((ele) => {
        let ele2 = parseFloat(ele.slice(-4));
        return ele2;
      })
      .then((ele2) => {
        cy.get(".inventory_item_price")
          .last()
          .invoke("text")
          .then((ele) => {
            let ele3 = parseFloat(ele.slice(-4));
            return ele3;
          })
          .then((lastItem) => {
            expect(ele2).to.be.lessThan(lastItem);
          });
      });
  });
});
