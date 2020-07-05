describe("Properties", () => {
  it("Should paginate properties list", () => {
    cy.visit("/");
    cy.get("section").should("have.length", 5);
    cy.scrollTo("bottom");
    cy.get("section").should("have.length", 8);

    cy.findAllByTestId("property")
      .get("strong")
      .should(($properties) => {
        let texts = $properties.map((_, el) => {
          return Cypress.$(el).text();
        });

        texts = texts.get();

        expect(texts).to.have.length(8);
        expect(texts).to.deep.eq([
          "2 beds house for sale",
          "4 beds house for sale",
          "1 bed house for sale",
          "7 beds house for sale",
          "1 bed house for sale",
          "2 beds house for sale",
          "4 beds house for sale",
          "2 beds house for sale",
        ]);
      });

    cy.findAllByTestId("property")
      .eq(0)
      .get("img")
      .should("have.attr", "src")
      .should("include", "104_2160.jpg");

    cy.findAllByTestId("property")
      .get("img")
      .parent()
      .eq(0)
      .click();

    cy.findAllByTestId("property")
      .eq(0)
      .get("img")
      .should("have.attr", "src")
      .should("include", "174_2160.jpg");
  });

  it("Should have expired properties", () => {
    cy.visit("/");
    cy.findAllByTestId("property")
      .eq(1)
      .should("contain", "26  Bouverie Road, WESTON, CW2 5JG")
      .get("button")
      .contains("Expired");

    cy.findAllByTestId("property")
      .eq(1)
      .get("img")
      .parent()
      .should("have.class", "expired");

    cy.findAllByText("4 beds house for sale").should("exist");
  });

  it("Should toggle property status", () => {
    cy.visit("/");
    cy.findAllByTestId("property")
      .eq(4)
      .get("button")
      .contains("Active")
      .click();

    cy.findAllByTestId("property")
      .eq(4)
      .get("button")
      .contains("Expired")
      .click();

    cy.findAllByTestId("property")
      .eq(4)
      .get("img")
      .parent()
      .should("have.class", "expired");

    cy.findAllByTestId("property")
      .eq(4)
      .get("button")
      .contains("Active");
  });
});
