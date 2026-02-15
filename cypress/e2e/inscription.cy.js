describe("Formulaire Contact Happy Path", () => {
  it("passes", () => {
    const menuAttendu = ["Nos services", "Nos réalisations", "Notre équipe"];

    cy.visit("http://localhost:3000");
    cy.get("header nav ul li")
      .should("have.length", menuAttendu.length) 
      .each(($li, index) => {
        cy.wrap($li).should("contain.text", menuAttendu[index]);
      });

    cy.get('header nav [data-testid="button-test-id"]')
      .filter(":visible")
      .click();

    cy.url().should("include", "#contact");

    const validNom = "Anderson";
    cy.contains(".inputField", "Nom")
      .find("input")
      .type(validNom)
      .should("have.value", validNom);

    const validPrenom = "Thomas";
    cy.contains(".inputField", "Prénom")
      .find("input")
      .type(validPrenom)
      .should("have.value", validPrenom);

    cy.get(
      "#contact > form > div > div:nth-child(1) > div.SelectContainer.large > div.Select > button",
    ).as("boutonTypeContact");

    cy.get("@boutonTypeContact").click();
    cy.contains("li", "Personnel").click();

    const validMail = "thomas.anderson@sion.com";
    cy.contains(".inputField", "Email")
      .find("input")
      .type(validMail)
      .should("have.value", validMail);

    const validMessage = " I am very interested in your services.";
    cy.contains(".inputField", "Message")
      .find("textarea")
      .type(validMessage)
      .should("have.value", validMessage);

    cy.intercept("POST", "**/api/contact").as("maRequeteContact");

    cy.get('input[type="submit"][value="Envoyer"]')
      .should("be.visible")
      .click();

    cy.wait("@maRequeteContact").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });
  });
});
