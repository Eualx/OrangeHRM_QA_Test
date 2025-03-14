class Candidate {
    navigateToCandidates() {
        cy.contains('Recruitment').click();
        cy.contains('Candidates').should('be.visible');
    }

    clickAddCandidate() {
        cy.get('button').contains('Add').click();
       
    }

    enterCandidateDetails(firstName, lastName, email,jobtitle, contact,file) {
        cy.get('[name="firstName"]').type(firstName);
        cy.get('[name="lastName"]').type(lastName);
        cy.get(':nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type(email);
        cy.get('.oxd-select-text-input').click()
        cy.get('.oxd-select-dropdown').contains(jobtitle).click();
        cy.get('.oxd-grid-3 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(contact)
        cy.get('.oxd-file-button').attachFile(file)
    }
    enterCandidateDetailstwo( email,jobtitle, contact) {
       
        cy.get(':nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type(email);
        cy.get('.oxd-select-text-input').click()
        cy.get('.oxd-select-dropdown').contains(jobtitle).click();
        cy.get('.oxd-grid-3 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(contact)
      
    }

    saveCandidate() {
        cy.get('button[type="submit"]').click();
    }
    shortlist(){
        cy.get('.oxd-button--success').click()
        // cy.get('.oxd-button--secondary').click()
    }
    finalsave(){
        cy.get('.oxd-button--secondary')
    }

    verifyCandidateSaved(successMessage, candidateName) {
        cy.contains(successMessage).should('be.visible');
        cy.contains(candidateName).should('be.visible');
        
    }

    verifyRequiredFieldErrors() {
        cy.contains('Required').should('be.visible');
    }

    // 🔹 **New: Search Candidate Method**
    // search Candidate by name 
    searchCandidateone(candidatename){
        cy.get('.oxd-autocomplete-text-input > input').type(candidatename , { delay: 200 })
        cy.get('.oxd-autocomplete-dropdown .oxd-autocomplete-option')
        .should('have.length.greaterThan', 1);
      cy.get('.oxd-autocomplete-dropdown .oxd-autocomplete-option')
        .eq(1)
        .should('exist') 
        .click();
       
         cy.get('button').contains('Search').click({ force: true });

    } 
    //serach by status
    searchCandidatetwo(status){
        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click()
        cy.get('.oxd-select-dropdown').contains(status).click();
        cy.get('button').contains('Search').click({ force: true });
    }


    verifySearchname(candidateName) {
       
        cy.contains(candidateName).should('be.visible');
       
    }
    verifySearchResults(noRecordsMessage){
        cy.contains(noRecordsMessage).should('be.visible');
    }
    
    editCandidate(email){
        cy.get('.oxd-table-cell-actions > :nth-child(1) > .oxd-icon').click()
            cy.get('.oxd-switch-input').click()
            cy.get(':nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').clear()
        .type(email)
        cy.get('.oxd-button--secondary').click()
         cy.contains('Successfully Updated', { timeout: 10000 }).should('be.visible');
    
    }
    deleteCandidate(){
        cy.get(':nth-child(1) > .oxd-table-row > :nth-child(7) > .oxd-table-cell-actions > :nth-child(2) > .oxd-icon').first().click()
        cy.get('.oxd-button--label-danger').click()
        cy.contains('Successfully Deleted', { timeout: 10000 }).should('be.visible');
    }

}

export default Candidate;
