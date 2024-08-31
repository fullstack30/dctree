import Rigester from '../../src/pages/Register';
import { MemoryRouter } from 'react-router-dom'
import './../../src/assets/bootstrap.min.css'

const customMount = (component, options = {}) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options;
  const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>
  return cy.mount(wrapped, mountOptions)
}

describe("page/Register", () => {
    it('Testando rederização dos itens do formulario', () => {
        customMount(<Register />);

        const label = [
            "Nome",
            "Sobrenome",
            "Email",
            "Senha",
            "Confirmar senha"
        ]

        const placeholder = [
            "Digite seu nome",
            "Digite seu sobrenome",
            "Digite sua senha",
            "Digite a senha novamente"
        ]

        cy.get('label')
            .should('have.length', 5)
            .each((item, index) => {
                cy.wrap(item)
                    .should('have.text', label[index]);
            })

        cy.get('input[type="text"]')
            .should('have.length', 2)
            .each((item, index) => {
                cy.wrap(item)
                    .should('have.attr', 'placeholder')
                    .and('include', placeholder[index])
            })

        cy.get('input[type="email"]')
            .should("have.length", 1)
            .and('have.attr', 'placeholder')
            .and('include', "Digite seu email")
        
        cy.get('input[type="password"]')
            .should('have.length', 2)
            .each((item, index) => {
                cy.wrap(item)
                    .should('have.attr', 'placeholder')
                    .and('include', placeholder[index+2])
            })
        
        cy.get("form button")
            .should("have.length", 1)
            .and('have.text', "Cadastrar")
        
        cy.get('a')
            .should('have.length', 1)
            .and('have.text', "Fazer login")
        
    })
})