class IssueModal {
  constructor() {
    this.submitButton = 'button[type="submit"]';
    this.issueModal = '[data-testid="modal:issue-create"]';
    this.issueDetailModal = '[data-testid="modal:issue-details"]';
    this.title = 'input[name="title"]';
    this.issueType = '[data-testid="select:type"]';
    this.descriptionField = ".ql-editor";
    this.assignee = '[data-testid="select:userIds"]';
    this.backlogList = '[data-testid="board-list:backlog"]';
    this.issuesList = '[data-testid="list-issue"]';
    this.deleteButton = '[data-testid="icon:trash"]';
    this.deleteButtonName = "Delete issue";
    this.cancelDeletionButtonName = "Cancel";
    //this.confirmationPopup = '[data-testid="modal:confirm"]';
    this.closeDetailModalButton = '[data-testid="icon:close"]';
    // CommentsModal
    this.commentTextArea = 'textarea[placeholder="Add a comment..."]';
    this.saveCommentButton = 'button:contains("Save")';
    this.editCommentButton = 'button:contains("Edit")';
    this.commentBox = '[data-testid="issue-comment"]';
    this.comment = "L5_Kommentaari";
    this.commentEdited = "L5_Kommentaari_EDITED";
    this.saveCommentButton = 'button:contains("Save")';
    this.editCommentButton = 'button:contains("Edit")';
    this.deleteCommentButton = 'button:contains("Delete")';
    this.confirmDeleteButton = 'button:contains("Delete comment")';
    this.confirmCommentDeleteButton = '"button", "Delete comment"';
    this.confirmDeleteWindow = '[data-testid="modal:confirm"]';
  }

  getIssueModal() {
    return cy.get(this.issueModal);
  }

  getIssueDetailModal() {
    return cy.get(this.issueDetailModal);
  }

  clickDeleteEditedComment() {
    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .contains("Delete")
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .contains(this.commentEdited)
        .should("not.exist");
    });
  }

  getIssueModal() {
    return cy.get(this.issueModal);
  }

  getIssueDetailModal() {
    return cy.get(this.issueDetailModal);
  }

  // commentsModal
  //createAcomment() {
  createComment(comment) {
    cy.contains("Add a comment...").click();
    cy.get(this.commentTextArea).type(comment);
    cy.get(this.saveCommentButton).click().should("not.exist");
    cy.contains("Add a comment...").should("exist");
  }

  assertCommentExists(comment) {
    cy.get(this.commentBox).should("contain", comment);
  }

  // ADD COMMENT

  addComment(comment) {
    cy.contains("Add a comment...").click();
    cy.get(this.commentTextArea).type(comment);
    cy.get(this.saveCommentButton).click().should("not.exist");
    cy.contains("Add a comment...").should("exist");
  }

  assertCommentExists(comment) {
    cy.get(this.commentBox).should("contain", comment);
  }

  // EDIT COMMENT
  editComment(comment, commentEdited) {
    cy.contains("Add a comment...").click();
    cy.get(this.commentTextArea).type(comment);
    cy.get(this.saveCommentButton).click().should("not.exist").wait(7777);
    cy.get(this.commentBox)
      .contains(this.comment)
      .closest(this.commentBox)
      .contains("Edit")
      .click();
    cy.get(this.commentTextArea)
      .should("contain", comment)
      .wait(2000)
      .clear()
      .type(commentEdited);

    cy.get(this.saveCommentButton).click().should("not.exist");
  }

  // DELETE COMMENT
  clickDeleteComment() {
    cy.get(this.commentBox)

      .closest(this.commentBox)
      .contains("Delete")
      .click();
  }

  confirmDeleteComment() {
    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");

    cy.get(this.confirmDeleteModal).should("not.exist");
  }

  selectIssueType(issueType) {
    cy.get(this.issueType).click("bottomRight");
    cy.get(`[data-testid="select-option:${issueType}"]`)
      .trigger("mouseover")
      .trigger("click");
  }

  selectAssignee(assigneeName) {
    cy.get(this.assignee).click("bottomRight");
    cy.get(`[data-testid="select-option:${assigneeName}"]`).click();
  }

  editTitle(title) {
    cy.get(this.title).debounced("type", title);
  }

  editDescription(description) {
    cy.get(this.descriptionField).type(description);
  }

  createIssue(issueDetails) {
    this.getIssueModal().within(() => {
      this.selectIssueType(issueDetails.type);
      this.editDescription(issueDetails.description);
      this.editTitle(issueDetails.title);
      this.selectAssignee(issueDetails.assignee);
      cy.get(this.submitButton).click();
    });
  }

  ensureIssueIsCreated(expectedAmountIssues, issueDetails) {
    cy.get(this.issueModal).should("not.exist");
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");

    cy.get(this.backlogList)
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get(this.issuesList)
          .should("have.length", expectedAmountIssues)
          .first()
          .find("p")
          .contains(issueDetails.title);
        cy.get(`[data-testid="avatar:${issueDetails.assignee}"]`).should(
          "be.visible"
        );
      });
  }

  ensureIssueIsVisibleOnBoard(issueTitle) {
    cy.get(this.issueDetailModal).should("not.exist");
    cy.reload();
    cy.contains(issueTitle).should("be.visible");
  }

  ensureIssueIsNotVisibleOnBoard(issueTitle) {
    cy.get(this.issueDetailModal).should("not.exist");
    cy.reload();
    cy.contains(issueTitle).should("not.exist");
  }

  validateAmountOfIssuesInBacklog(amountOfIssues) {
    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.get('[data-testid="list-issue"]').should(
        "have.length",
        amountOfIssues
      );
    });
  }

  clickDeleteButton() {
    cy.get(this.deleteButton).click();
    cy.get(this.confirmationPopup).should("be.visible");
  }

  confirmDeletion() {
    cy.get(this.confirmationPopup).within(() => {
      cy.contains("Are you sure you want to delete this issue?").should(
        "be.visible"
      );
      cy.contains("Once you delete, it's gone for good").should("be.visible");
      cy.contains(this.deleteButtonName).click();
    });
    cy.get(this.confirmationPopup).should("not.exist");
    cy.get(this.backlogList).should("be.visible");
  }

  cancelDeletion() {
    cy.get(this.confirmationPopup).within(() => {
      cy.contains("Are you sure you want to delete this issue?").should(
        "be.visible"
      );
      cy.contains("Once you delete, it's gone for good").should("be.visible");
      cy.contains(this.cancelDeletionButtonName).click();
    });
    cy.get(this.confirmationPopup).should("not.exist");
    cy.get(this.issueDetailModal).should("be.visible");
  }

  closeDetailModal() {
    cy.get(this.issueDetailModal)
      .get(this.closeDetailModalButton)
      .first()
      .click();
    cy.get(this.issueDetailModal).should("not.exist");
  }
}

export default new IssueModal();
