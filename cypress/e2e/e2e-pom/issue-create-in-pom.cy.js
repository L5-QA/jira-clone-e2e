import IssueModal from "../../pages/Issue_Comments_Modal.js";

describe("Issue create", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  //data set with which we are creating issue, saved as variable
  const issueDetails = {
    title: "L5 Timing",
    type: "Task",
    description: "Time is money",
    assignee: "Lord Gaben",
  };

  //number of issues we expect to see in the backlog after the test
  const EXPECTED_AMOUNT_OF_ISSUES = "5";

  it("Should create issue successfully", () => {
    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);
  });
});
