import { faker } from '@faker-js/faker';
import IssueModal from '../pages/IssueModal';

describe('Issue deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        // Open the first issue from the board
        cy.contains('This is an issue of type: Task.').click();
      }).wait(20000);
      // Assert issue detail view is visible (moved inside beforeEach)
      cy.get('[data-testid="modal:issue-details"]').wait(20000).should('be.visible');
    });
  
    it.only('Should delete issue successfully', () => {
      // Rest of your test steps to delete the issue...
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
      cy.contains("Once you delete, it's gone for good").should('be.visible');
      cy.contains('Delete issue').click().wait(20000);
 
      // Assert deletion confirmation is not visible
      cy.get('[data-testid="modal:confirm"]').wait(20000).should('not.exist');
  
      // Assert the issue is deleted (moved inside the test)
      cy.get('[data-testid="board-list:backlog"]', { timeout: 120000 }).within(() => {
        cy.contains(issueTitle).should('not.exist');
      });
  
      // Reload the page and verify issue is still not there
      cy.reload().wait(20000);
      cy.contains(issueTitle).should('not.exist');})
 
})


//confirmDeletion() })
        //cy.get(this.confirmationPopup).within(() => {
            //cy.contains(this.deleteButtonName).click();})
        //cy.get(this.confirmationPopup).should('not.exist');
        //cy.get(this.backlogList).should('be.visible');//