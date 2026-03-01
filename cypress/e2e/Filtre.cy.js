describe("Récupération et filtre des événements", () => {
  it("Devrait filtrer les réalisations par catégorie 'Conférence'", () => {
    const menuAttendu = ["Nos services", "Nos réalisations", "Notre équipe"];

    cy.visit("http://localhost:3000");

    cy.get("header nav ul li")
      .should("have.length", menuAttendu.length)
      .each(($li, index) => {
        cy.wrap($li).should("contain.text", menuAttendu[index]);
      });

    cy.contains("header nav ul li", "Nos réalisations").click();
    cy.url().should("include", "#nos-realisations");
    
    cy.get('#nos-realisations [data-testid="collapse-button-testid"]').click();
    cy.get('#nos-realisations [data-testid="select-testid"] ul')
      .contains("li", "conférence", { matchCase: false })
      .click();

    cy.get('#events [data-testid="card-testid"]')
      .should("have.length.greaterThan", 0)
      .each(($carte) => {
        cy.wrap($carte)
          .find(".EventCard__label")
          .should("contain.text", "conférence");
      });
  });
});
