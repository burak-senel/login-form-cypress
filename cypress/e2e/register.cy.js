beforeEach(() => {
  cy.visit('http://localhost:5173/')
})
describe('Register page', () => {
  describe('Errors', () => {
    it('name input throws error for 2 chars', () => {
      cy.get("[data-cy=ad-input]").type("bsr")
      cy.contains("En az 3 karakter giriniz.")
    })
    it('surname input throws error for 1 chars', () => {
      cy.get("[data-cy=soyad-input]").type("r")
      cy.contains("En az 3 karakter giriniz.")
    })
    it('email input throws error for wrong format', () => {
      cy.get("[data-cy=email-input]").type("emre@wit.")
      cy.contains('Geçerli bir email adresi giriniz.')
    })
    it('password input throws error for weak password', () => {
      cy.get("[data-cy=password-input]").type("brk3*")
      cy.contains('8-16 karakter, (min) 1 büyük harf, 1 küçük harf, 1 sembol ve 1 rakam içermelidir.')
    })

  })
  describe('Button disabled for unvalid inputs', () => {
    it('name input throws error for 2 chars', () => {
      cy.get("[data-cy=ad-input]").type("bsr")
      cy.get("[data-cy=soyad-input]").type("r")
      cy.get("[data-cy=email-input]").type("emre@wit.")
      cy.get("[data-cy=password-input]").type("brk3*")

      cy.get("[data-cy=submit-button").should("be.disabled")
    })
  })
  describe('Button enabled for valid inputs', () => {
    it('name input throws error for 2 chars', () => {
      cy.get("[data-cy=ad-input]").type("Burak")
      cy.get("[data-cy=soyad-input]").type("Şenel")
      cy.get("[data-cy=email-input]").type("buraksenel@hot.com")
      cy.get("[data-cy=password-input]").type("Deneme123*")

      cy.get("[data-cy=submit-button").should("be.enabled").click()
      cy.get("[data-cy=id]").should("not.be.empty")

    })
  })
})