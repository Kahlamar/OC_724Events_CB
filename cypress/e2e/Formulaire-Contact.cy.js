describe("Tests API - Formulaire de Contact", () => {
  it("Devrait créer un nouveau contact avec succès (Statut 201)", () => {
    // Définition du payload (body)
    const requestBody = {
      name: "Anderson",
      surname: "Thomas",
      contactType: "Entreprise",
      email: "thomas.anderson@sion.com",
      message: "I am very interested in your services.",
    };

    cy.log(`**Nom :** ${requestBody.name}`);
    cy.log(`**Prénom :** ${requestBody.surname}`);
    cy.log(`**Type de contact :** ${requestBody.contactType}`);
    cy.log(`**Email :** ${requestBody.email}`);
    cy.log(`**Message :** ${requestBody.message}`);

    // Exécution de la requête POST
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/contact",
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      // Assertions de base
      expect(response.status).to.eq(201);
      expect(response.duration).to.be.lessThan(500);
    });
  });
});
