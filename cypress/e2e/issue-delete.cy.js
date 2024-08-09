import IssueModal from '../pages/IssueModal';

const issueTitle = 'This is an issue of type: Task.';
//#root > div.sc-VigVT.dOxCFh > div > div > div.sc-fOKMvo.eJoEKV > div.sc-cMljjf.jnweIx > div > button > div
describe('Issue deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });
  
    it.only('Should delete issue successfully', () => {

        const issueTitle = 'This is an issue of type: Task.';
      // Find the first issue element on the board (assuming a list structure)
      cy.get('[data-testid="board-list:backlog"]')
        .find('[data-testid="list-issue"]')
        .first()
        .click(); // Click the first issue
  
      // Assert issue detail view is visible
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
  
      // Rest of your test steps to delete the issue...
      cy.contains("Once you delete, it's gone for good").should('be.visible');
      cy.contains('Delete issue').click();
    });
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]', { timeout: 120000 }).within(
      () => {
        cy.contains(issueTitle).should('not.exist');
      }
    );
    cy.reload();
    cy.contains(issueTitle).should('not.exist');
  });

  //Test Case 2: Issue Deletion Cancellation
    
  it('Should cancel deletion process successfully', () => {

    //Assert the visibility of the issue detail view modal
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');

    //Delete the issue by clicking the delete button and confirming the deletion.
    cy.get('[data-testid="icon:trash"]').click()
    cy.get('[data-testid="modal:confirm"]').should('be.visible');
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains('Are you sure you want to delete this issue?').should('be.visible')
      cy.contains("Once you delete, it's gone for good.").should('be.visible')

      //Cancel the deletion in the confirmation pop-up.
      cy.contains('button', 'Cancel').click();
    })
    
    //Assert that the deletion confirmation dialogue is not visible.
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="modal:issue-details"]').find('[data-testid="icon:close"]').first().click();
    cy.get('[data-testid="modal:issue-details"]').should("not.exist");
    
    //Assert that the issue is not deleted and is still displayed on the Jira board.
    cy.get('[data-testid="list-issue"]')
    .find("p")
    .contains(issueModal)
    .should("be.visible");
});

