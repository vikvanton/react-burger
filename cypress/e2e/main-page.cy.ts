import { NORMA_API } from "../../src/utils/consts";

describe("main page test: base use case", () => {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.visit("http://localhost:3000");
        cy.intercept(`${NORMA_API}/ingredients`).as("ingredients");
        cy.wait("@ingredients");
    });

    it("should open modal that contains ingredient info", () => {
        cy.get("main div section:first > div:last article:first ul li:first")
            .contains("Краторная булка N-200i")
            .click();
        cy.get("#modals header h1").contains("Детали ингредиента");
        cy.get("#modals article img")
            .invoke("attr", "src")
            .then((src) => {
                cy.request(src as string)
                    .its("status")
                    .should("eq", 200);
            });
        cy.get("#modals article > span").contains("Краторная булка N-200i");
        cy.get("#modals article ul li:nth(0) span:first").contains("Калории, ккал");
        cy.get("#modals article ul li:nth(0) span:last").contains("420");
        cy.get("#modals article ul li:nth(1) span:first").contains("Белки, г");
        cy.get("#modals article ul li:nth(1) span:last").contains("80");
        cy.get("#modals article ul li:nth(2) span:first").contains("Жиры, г");
        cy.get("#modals article ul li:nth(2) span:last").contains("24");
        cy.get("#modals article ul li:nth(3) span:first").contains("Углеводы, г");
        cy.get("#modals article ul li:nth(3) span:last").contains("53");
        cy.get("#modals header svg").click();
    });

    it("should add ingredients to constructor, perform auth and make order", () => {
        cy.get("main div section:first > div:last article:nth(0) ul li:last div:first").trigger(
            "dragstart"
        );
        cy.get("main div section:last ul li:first").trigger("drop");

        cy.get("main div section:first > div:last article:nth(1) ul li:first div:first").trigger(
            "dragstart"
        );
        cy.get("main div section:last ul ul").trigger("drop");

        cy.get("main div section:first > div:last article:nth(1) ul li:first div:first").trigger(
            "dragstart"
        );
        cy.get("main div section:last ul ul").trigger("drop");

        cy.get("main div section:first > div:last article:nth(2) ul li:first div:first").trigger(
            "dragstart"
        );
        cy.get("main div section:last ul ul").trigger("drop");

        cy.get("main div section:last ul ul li:first").trigger("dragstart");
        cy.get("main div section:last ul ul li:last").trigger("drop");

        cy.get("main div section:last > span button").click();
        cy.get("#modals header svg").click();
        cy.get("header nav ul li:last").click();

        cy.get("form").within(() => {
            cy.get('input[name="email"]').type("alaric@rome.fall");
            cy.get('input[name="password"]').type("123456");
            cy.root().submit();
        });

        cy.get("main div section:last > span button").click();
        cy.intercept(`${NORMA_API}/orders`).as("orders");
        cy.wait("@orders");
        cy.get("#modals header svg").click();
    });
});
