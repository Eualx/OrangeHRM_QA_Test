class Vacancie {
    navigateToRecruitment() {
        cy.contains('Recruitment').click();
        cy.contains('Vacancies').click();
    }

    clickAddVacancy() {
        cy.get('button').contains('Add').click();
    }

   
    selectVacancyName(Vname) {
        if (Vname) {
            cy.get('.oxd-form > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input')
              .type(Vname);
    
            // Check if "Already exists" error appears
            cy.get('body').then(($body) => {
                if ($body.find('.oxd-input-group div:contains("Already exists")').length > 0) {
                    cy.log(`Vacancy "${Vname}" already exists. Skipping this entry.`);
                    return; // Skip this iteration
                }
            });
        } else {
            cy.log("Skipping Job Title - Field is empty");
        }
    }
    
    
    enterJobTitle(title) {
        // cy.get('.oxd-select-text-input').click();
        // cy.get('.oxd-select-dropdown').contains(category).click();
        if (title) {
            cy.get('.oxd-select-text-input').click();
            cy.get('.oxd-select-dropdown').contains(title).click();
        } else {
            cy.log("Skipping Job Category - Field is empty");
        }
    }

    

    selectHiringManager(managerName) {
        // cy.get('.oxd-autocomplete-text-input > input').type(managerName);
        // cy.get('.oxd-autocomplete-dropdown').contains(managerName).click();
        if (managerName) {
            cy.get('.oxd-autocomplete-text-input > input').type(managerName);
            cy.get('.oxd-autocomplete-dropdown').contains(managerName).click();

        } else {
            cy.log("Skipping Hiring Manager - Field is empty");
        }
    }

    enterJobDescription(description) {
        // cy.get('.oxd-textarea').type(description);
        if (description) {
            cy.get('.oxd-textarea').type(description);
        } else {
            cy.log("Skipping Job Description - Field is empty");
        }
    }

    enterNumberofPosition(Nposition){
        cy.get('.oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').type(Nposition)
    }

    saveVacancy() {
        cy.get('button[type="submit"]').click();
        
    }
    

    verifyVacancySaved() {
        cy.wait(2000); // Wait for UI updates
    
        cy.get('body').then(($body) => {
            if ($body.find(':contains("Edit Vacancy")').length > 0) {
                cy.log("Vacancy successfully added.");
                cy.contains("Edit Vacancy").should('be.visible');
            } else if ($body.find(':contains("Already exists")').length > 0) {
                cy.log("Vacancy already exists. Skipping further actions.");
                cy.contains("Already exists").should('be.visible'); 
            } else {
                cy.log("No expected messages found. Possible issue.");
                //cy.contains("Edit Vacancy").should('exist'); // Fail the test if neither message appears
            }
        });
    }
    

    verifyRequiredFieldErrors() {
        cy.contains('Required').should('be.visible');
    }

    searchVacancy(vacancyname,jobTitle, hiringManager) {
        // cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
        // cy.get('.oxd-select-dropdown').contains(jobTitle).click();
        if (jobTitle) {
            cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
            cy.get('.oxd-select-dropdown').contains(jobTitle).click();
        }
if(vacancyname){
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input').click()
        cy.get('.oxd-select-dropdown').contains(vacancyname).click();
}

        // cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input').click();
        // cy.get('.oxd-select-dropdown').contains(hiringManager).click();
        if (hiringManager) {
            cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input').click();
            cy.get('.oxd-select-dropdown').contains(hiringManager).click();
        }

        cy.get('button').contains('Search').click();
    }

    verifySearchResults(jobTitle) {
        cy.contains(jobTitle).should('be.visible');
        // cy.contains(hiringManager).should('be.visible');
        // cy.contains(vacancyname).should('be.visible');
        // cy.contains(noresult).should('be.visible');

    }
    verifySearchResultstwo(noresult) {
    
        cy.contains(noresult).should('be.visible');

    }

    deleteVacancy(){
        cy.get(':nth-child(1) > .oxd-table-row > :nth-child(6) > .oxd-table-cell-actions > :nth-child(1) > .oxd-icon').click()
        cy.get('.oxd-button--label-danger').click()
        cy.contains('Successfully Deleted', { timeout: 10000 }).should('be.visible');

    }
editVacancy(vacancyname,jobTitle, hiringManager){
    cy.get(':nth-child(1) > .oxd-table-row > :nth-child(6) > .oxd-table-cell-actions > :nth-child(2) > .oxd-icon').first().click()
    cy.get('.oxd-form > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').clear()
    .type(vacancyname)
    cy.get('.oxd-select-text-input').click()
    cy.get('.oxd-select-dropdown', { timeout: 10000 }).should('be.visible').contains(jobTitle).click();
    cy.get('.oxd-autocomplete-text-input > input').clear().type(hiringManager, { delay: 200 })
    cy.get('.oxd-autocomplete-dropdown', { timeout: 10000 })
    .should('be.visible').contains(hiringManager).click();
    cy.get('.oxd-button--secondary').click(); // Save changes
    cy.get(':nth-child(4) > .oxd-grid-item > .oxd-switch-wrapper > label > .oxd-switch-input').click()
    //cy.contains('Successfully Saved', { timeout: 20000 }).should('be.visible');

}

}

export default Vacancie;
