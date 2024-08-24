import IssueModal from "../pages/Issue_Comments_Modal";
describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains(
          "Try dragging issues to different columns to transition their status."
        ).click();
      });
  });
  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
  const issueComment = '[data-testid="issue-comment"]';
  const comment = "L5_Kommentaari";
  const commentEdited = "L5_Kommentaari_EDITED";
  const previousComment = "A lovely sunset.";
  const confirmDeleteWindow = '[data-testid="modal:confirm"]';
  const addNewComment = 'textarea[placeholder="Add a comment..."]';
  const commentBox = '[data-testid="issue-comment"]';
  const confirmDeleteButton = ("button", "Delete comment");

  //  Functions  //
  function clickEditCommentAssertEditButtonNotVisible() {
    cy.get(commentBox).first().contains("Edit").click().should("not.exist");
  }
  function assertCreatedCommentExists() {
    cy.get(commentBox).should("contain", comment);
  }

  function assertEditedCommentExistsAndEditButtonIsVisible() {
    cy.get(commentBox).should("contain", "Edit").and("contain", commentEdited);
  }
  function scroll() {
    cy.get(addNewComment).scrollTo("bottom");
  }

  function AssertCommentEditedRemoved() {
    getIssueDetailsModal().find(commentEdited).should("not.exist");
  }

  it.only("Should create a comment successfully", () => {
    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      cy.get(addNewComment).type(comment);
      cy.contains("button", "Save").click().should("not.exist");
      cy.contains("Add a comment...").should("exist");
      assertCreatedCommentExists();
    });
  });

  it("Should edit added comment successfully", () => {
    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      cy.get(addNewComment).type(comment);
      cy.contains("button", "Save").click().should("not.exist").wait(7777);
      cy.get(commentBox)
        .first()
        .contains("Edit")
        .click()
        .should("not.exist")
        .wait(2000);
      cy.get(addNewComment).clear().type(commentEdited).wait(2000);
      cy.contains("button", "Save").click().should("not.exist").wait(2000);
      cy.get(commentBox)
        .should("contain", "Edit")
        .and("contain", commentEdited);
      cy.get(commentBox).should("contain", commentEdited);
      assertEditedCommentExistsAndEditButtonIsVisible;
    });
  });

  it("Should delete a comment successfully", () => {
    getIssueDetailsModal().find(commentBox).contains("Delete").click();
    cy.get(confirmDeleteWindow)
      .contains("button", "Delete comment")
      .wait(2000)
      .click()
      .should("not.exist");
    getIssueDetailsModal().find(issueComment).should("not.exist");
  });

  //POM create a comment
  it("POM Should create a comment successfully", () => {
    IssueModal.getIssueDetailModal().within(() => {
      IssueModal.addComment(comment);
      IssueModal.assertCommentExists(comment);
    });
  });

  //POM Edit created comment
  it("POM Should Edit created comment successfully", () => {
    IssueModal.getIssueDetailModal().within(() => {
      IssueModal.editComment(comment, commentEdited);
      IssueModal.assertCommentExists(commentEdited);
    });
  });
  //POM Delete Edited comment
  it("POM Should Delete edited comment successfully", () => {
    IssueModal.getIssueDetailModal().within(() => {
      IssueModal.clickDeleteComment();
    });
    cy.wait(1500);
    IssueModal.confirmDeleteComment();
  });

  it(" POM 3 in 1= Should Create; Edit & Delete a comment successfully", () => {
    IssueModal.getIssueDetailModal().within(() => {
      IssueModal.addComment(comment);
      IssueModal.assertCommentExists(comment);
    });
    cy.wait(2000);
    IssueModal.getIssueDetailModal().within(() => {
      IssueModal.editComment(comment, commentEdited);
      IssueModal.assertCommentExists(commentEdited);
    });
    cy.wait(2000);
    IssueModal.getIssueDetailModal().within(() => {
      IssueModal.clickDeleteComment();
    });
    cy.wait(2000);
    IssueModal.confirmDeleteComment();
    AssertCommentEditedRemoved();
  });
});
