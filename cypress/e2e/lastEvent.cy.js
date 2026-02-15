describe("Get Last Event Test Erreur 500", () => {
  it("passes", () => {
    const url = "http://localhost:8080/api/events/last";
    cy.request("GET", url).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.null;
    });
  });
});
// Bine noter les tests
// En premier, fais une étude d’automatisation pour fiabiliser les futures campagnes de tests de régression et de validation des livraisons.
// Écris dans un document :

// les tests sélectionnés pour l’automatisation ;
// les critères de choix d’automatisation de ces tests  ;
// les conditions d’automatisation (données nécessaires, environnements, …).
