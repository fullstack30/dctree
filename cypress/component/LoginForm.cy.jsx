
import Login from '../../src/pages/Login';
import { MemoryRouter } from 'react-router-dom'
import './../../src/assets/bootstrap.min.css'

const customMount = (component, options = {}) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options;
  const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>
  return cy.mount(wrapped, mountOptions)
}

describe('pages/Login', () => {
  it('Testando rederização dos elementos', () => {
    customMount(<Login />);

    const label = [
      "Email",
      "Senha"
    ];

    cy.get('label')
      .should('have.length', 2)
      .each((item, index) => {
        cy.wrap(item).should('have.text', label[index])
      })

    cy.get('input[type="email"]')
      .should('have.length', 1)

      cy.get('input[type="password"]')
        .should('have.length', 1)
  })

  it('Testando validação de compos obrigatorios', () => {
    customMount(<Login />);

    cy.get('form button').click();

    cy.get('div.invalid-feedback.d-block')
      .should('have.length', 2)
      .each((item) => {
        cy.wrap(item).should('have.text', 'Campo obrigatorio')
      })
  })

  it('Testando validação do password', () => {
    customMount(<Login />);

    cy.get('input[type="email"]').type('teste@mail.com')
    
    cy.get('form button').click();

    cy.get('input[type="password"]')
      .parent()
      .find('div.invalid-feedback.d-block')
      .should('have.length', 1)
      .and('have.text', 'Campo obrigatorio')
  })
})