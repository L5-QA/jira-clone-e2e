import IssueModal from "../pages/Issue_Comments_Modal";
// For testing needs to be download cypress/pages/Issue_Comment_Modal.js
const issuetitle2 = "L5 Timing";
const issuetitle = "You can use rich text with images in issue descriptions.";
const issuemodal = '[data-testid="modal:issue-details"]';
const inputnumber = 'input[placeholder="Number"]';
const iconstopwatch = '[data-testid="icon:stopwatch"]';
const iconclose = '[data-testid="icon:close"]';
const boardbacklog = '[data-testid="board-list:backlog"]';
const ButtonDone = 'button:contains("Done")';
const clickarea = '[data-testid="sc-krvtoX cysrKt"]';

describe("Time estimation functionality & Time logging functionality ", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("eq", `${Cypress.env("baseUrl")}project/board`);
    cy.wait(4000).then((url) => {
      cy.visit(url + "/board?modal-issue-create=true");
    });
  });
  const issueDetails = {
    title: "L5 Timing",
    type: "Story",
    description: "Time is money",
    assignee: "Lord Gaben",
  };
  const EXPECTED_AMOUNT_OF_ISSUES = "5";

  //TEST_Cases for Time estimation functionality

  it("Should create issue & Edit/Remove Estimation ", () => {
    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);
    cy.wait(4000);
    cy.get(issueDetails);
    cy.wait(4000);
    cy.contains(issuetitle2).click();
    cy.wait(3000);

    cy.get(inputnumber).eq(0).wait(3000).clear().type("77").wait(7777);
    cy.wait(7000);
    cy.get(iconclose).eq(0).click();

    cy.get(boardbacklog).wait(8000).should("have.length", 1).first().find("p");
    cy.wait(7000);
    cy.contains(issuetitle2).click();

    cy.get(inputnumber).wait(3000).clear().type("22").wait(7000);
    cy.wait(5000);
    cy.get(iconclose).eq(0).click();

    cy.get(boardbacklog).should("have.length", 1).first().find("p");
    cy.contains(issuetitle2).click();
    cy.wait(5000);
    cy.get(inputnumber).should("have.value", "").should("be.visible");

    cy.get(inputnumber).eq(0).clear();
    cy.wait(1000);
    cy.get(iconclose).eq(0).click();

    cy.get(boardbacklog).should("have.length", 1).first().find("p");
    cy.wait(1000);
    cy.contains(issuetitle2).click();
  });

  it("Should Add/ Edit/Remove Estimation with existing Issue", () => {
    cy.visit(`${Cypress.env("baseUrl")}project/board`);
    cy.wait(4000);
    cy.contains(issuetitle).click();
    cy.get(iconstopwatch).click();
    cy.get(inputnumber).eq(1).wait(4000).clear();
    cy.get(iconclose).eq(2).click();
    cy.wait(3000);
    cy.get(inputnumber).eq(0).wait(3000).clear().type("77").wait(7777);
    cy.get(iconclose).eq(0).click();

    cy.get(boardbacklog).should("have.length", 1).first().find("p");
    cy.wait(7000);
    cy.contains(issuetitle).click();
    cy.get(inputnumber).wait(3000).clear().type("22").wait(7000);
    cy.wait(5000);
    cy.get(iconclose).eq(0).click();

    cy.get(boardbacklog).should("have.length", 1).first().find("p");
    cy.contains(issuetitle).click();
    cy.wait(5000);
    cy.get(inputnumber)
      .should("have.value", "22")
      .should("be.visible")
      .wait(3000);

    cy.get(inputnumber).eq(0).clear();
    cy.wait(2000);
    cy.get(iconclose).eq(0).click();

    cy.get(boardbacklog).should("have.length", 1).first().find("p");
    cy.wait(2000);
    cy.contains(issuetitle).click();
  });

  //TEST_Cases for Time logging functionality

  it("Should creat_issue and log & remove Time_Tracking_Time ", () => {
    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);
    cy.wait(4000);
    cy.get(issueDetails);
    cy.wait(4000);
    cy.contains(issuetitle2).click();
    cy.wait(3000);

    cy.get(inputnumber).eq(0).clear();
    cy.wait(1000);
    cy.get(iconstopwatch).click();
    cy.get(inputnumber).eq(1).clear().type("17");
    cy.wait(3000);
    cy.get(inputnumber).eq(2).clear().type("44");
    cy.wait(3000);
    cy.get(ButtonDone).click();
    cy.wait(7000);

    cy.get(iconstopwatch).click();
    cy.get(inputnumber).eq(1).clear();
    cy.wait(1000);
    cy.get(inputnumber).eq(2).clear();
    cy.wait(1000);
    cy.get(ButtonDone).click();
  });

  it("Should log & remove Time_Tracking_Time with existing Issue", () => {
    cy.visit(`${Cypress.env("baseUrl")}project/board`);
    cy.wait(4000);
    cy.get(issueDetails);
    cy.wait(4000);
    cy.contains(issuetitle).click();
    cy.wait(3000);

    cy.get(inputnumber).eq(0).clear();
    cy.wait(1000);
    cy.get(iconstopwatch).click();
    cy.get(inputnumber).eq(1).clear().type("22");
    cy.wait(3000);
    cy.get(inputnumber).eq(2).clear().type("44");
    cy.wait(3000);
    cy.get(ButtonDone).click();
    cy.wait(7000);

    cy.get(iconstopwatch).click();
    cy.get(inputnumber).eq(1).clear();
    cy.wait(1000);
    cy.get(inputnumber).eq(2).clear();
    cy.wait(1000);
    cy.get(ButtonDone).click();
  });
});
