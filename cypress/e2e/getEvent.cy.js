describe("API Tests - Get Event", () => {
  it("Doit retourner les détails exacts de l'événement avec les bons types de données", () => {
    const eventId = "699eb98a472831a3d985688d";
    const url = `http://localhost:8080/api/events/${eventId}`;

    cy.request("GET", url).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.null;
      expect(response.headers["content-type"]).to.include("application/json");

      const body = response.body;

      expect(body).to.have.property("title", "conférence");
      expect(body).to.have.property("type", "world forum");
      expect(body).to.have.property(
        "description",
        "Conférences sur le design de demain dans le digital",
      );
      expect(body).to.have.property("nb_guest", 800);
      expect(body).to.have.property("periode", "14-15-16");

      expect(body.title).to.be.a("string");
      expect(body.nb_guest).to.be.a("number");
      expect(body.periode).to.be.a("string");
      expect(body.__v).to.be.a("number");

      expect(body.prestations).to.be.an("array");
      expect(body.prestations).to.have.lengthOf(3);
      expect(body.prestations).to.deep.equal([
        "1 espace d’exposition",
        "1 scéne principale",
        "1 site web dédié",
      ]);

      const dateEvenement = "2027-05-14T20:28:45.744Z";
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
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9343.21610700165!2d2.2369483924575335!3d48.889368578651045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6650919830f81%3A0xd9b29faf76e24816!2sH%C3%B4tel%20Mercure%20Paris%20La%20D%C3%A9fense!5e0!3m2!1sfr!2sec!4v1675262233243!5m2!1sfr!2sec";
      expect(body.location, "La propriété 'location' n'est pas bonne").to.eq(
        location,
      );
    });
  });
});
