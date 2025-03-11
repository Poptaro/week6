describe('Basic homepage default value checke', () => {
  it('Lands on webpage and submits default values of "Rokusho" + "kana"', () => {
    cy.visit('http://localhost:5173/')
    cy.get("button").click()
    cy.wait(1000)
  })
})

describe("check api for correct response", () => {
  it("If rokusho#kana, check if yasuo, vayne, khazix are present", () => {
    cy.visit('http://localhost:5173/')
    cy.get("button").click()
    cy.wait(2000)
    cy.contains("Yasuo").should("exist")
    cy.contains("Vayne").should("exist")
    cy.contains("Khazix").should("exist")
  })
  
  it("Check jungyajim#uwu if pyke, brand, vex are present", () => {
    cy.visit('http://localhost:5173/')
    cy.get("input").eq(0).clear().type("jungyajim")
    cy.get("input").eq(1).clear().type("uwu")
    cy.wait(500)
    cy.get("button").click()
    cy.contains("Pyke").should("exist")
    cy.contains("Brand").should("exist")
    cy.contains("Vex").should("exist")

  })
})

