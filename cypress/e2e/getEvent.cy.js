describe("API Tests - Get Event", () => {
  it("Doit retourner les détails exacts de l'événement du World Economic Forum", () => {
    const eventId = "69a017501377e815040e060a";
    const url = `http://localhost:8080/api/events/${eventId}`;

    cy.request("GET", url).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.null;
      expect(response.headers["content-type"]).to.include("application/json");

      const body = response.body;
      expect(body).to.have.property("title", "World economic forum");
      expect(body).to.have.property("type", "world forum");
      expect(body).to.have.property(
        "description",
        "Oeuvre à la coopération entre le secteur public et le privé.",
      );
      expect(body).to.have.property("nb_guest", 1200);
      expect(body).to.have.property("periode", "24-25-26");

      expect(body.title).to.be.a("string");
      expect(body.nb_guest).to.be.a("number");
      expect(body.periode).to.be.a("string");

      expect(body.prestations).to.be.an("array");
      expect(body.prestations).to.have.lengthOf(4);
      expect(body.prestations).to.have.members([
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ]);

      const dateEvenement = "2027-04-24T20:28:45.744Z";
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
      expect(body.date).to.match(
        isoDateRegex,
        "La date doit être au format ISO 8601",
      );
      expect(body.date).to.eq(dateEvenement);

      const urlRegex =
        /^https?:\/\/(?:localhost|[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6})\b(?::\d{1,5})?(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
      expect(body.cover).to.match(
        urlRegex,
        "La propriété 'cover' doit être une URL valide",
      );
      const location =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7641.686438513205!2d2.238008572044138!3d48.890337143184446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66502f6012a89%3A0x31d9bac0d2b5f5!2zVUdDIENpbsOpIENpdMOpIExhIETDqWZlbnNl!5e0!3m2!1sfr!2sec!4v1675261446781!5m2!1sfr!2sec";
      expect(body.location, "La propriété 'location' n'est pas bonne").to.eq(
        location,
      );
    });
  });
});
