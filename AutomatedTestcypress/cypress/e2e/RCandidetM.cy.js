
// candidet witout parametrization 
import Login from "../support/modules/Login";
import Candidate from "../support/modules/Candidate";

describe('Candidate Module Tests', () => {
    let loginpage;
    let candidatePage;
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false; // Prevent Cypress from failing the test on app errors
    });

    beforeEach(() => {
        loginpage = new Login();
        candidatePage = new Candidate();

        loginpage.visit();
        cy.wait(2000)
        loginpage.login('Admin', 'admin123');
        cy.wait(2000)
    });

    afterEach(() => {
        cy.log('Test case completed.');
    });

    it('should add multiple candidates from Excel file', () => {
        cy.task("readExcelFile", "cypress/fixtures/data/candidates.xlsx").then((candidateData) => {
            candidateData.forEach((candidate) => {
                cy.log(`Adding candidate: ${candidate.FirstName} ${candidate.LastName}`);

                candidatePage.navigateToCandidates();
                cy.wait(2000)
                candidatePage.clickAddCandidate();
                cy.wait(2000)
                candidatePage.enterCandidateDetails(
                    candidate.FirstName, 
                    candidate.LastName, 
                    candidate.Email, 
                    candidate.JobTitle,
                    candidate.Contact,
                    candidate.File
                );
                
                candidatePage.saveCandidate();
                candidatePage.verifyCandidateSaved('Successfully Saved', `${candidate.FirstName} ${candidate.LastName}`);
                cy.wait(2000)
                candidatePage.shortlist()
                candidatePage.finalsave()
                cy.wait(2000)
            });
        });
    });

    it('should not add a candidate with empty fields', () => {
        cy.task("readExcelFile", "cypress/fixtures/data/candidates.xlsx").then((candidateData) => {
            candidateData.forEach((candidate) => {
        candidatePage.navigateToCandidates();
        cy.wait(2000)
        candidatePage.clickAddCandidate();
        cy.wait(2000)
        candidatePage.enterCandidateDetailstwo(
           
            candidate.Email, 
            candidate.JobTitle,
            candidate.Contact,
        );
        cy.wait(2000)
        candidatePage.saveCandidate();
        cy.wait(2000)
        candidatePage.verifyRequiredFieldErrors();
        cy.wait(2000)
    })
})
    });

    // 🔹 **New Search Test Case**

    it('search candidate by name of john',()=>{
        candidatePage.navigateToCandidates();
        candidatePage.searchCandidateone('John')
        candidatePage.verifySearchname('John Doe')
        cy.wait(2000)
        
    })
    it('search candidate by status ',()=>{
        candidatePage.navigateToCandidates();
        candidatePage.searchCandidatetwo('Shortlisted')
        candidatePage.verifySearchResults('Shortlisted')
        cy.wait(2000)
    })

    it('edit Candidate',()=>{
        candidatePage.navigateToCandidates();
        candidatePage.searchCandidateone('John')
        candidatePage.editCandidate('janedie@example.com')
        cy.wait(2000)
       })

    it('delete Candidate ',()=>{
        candidatePage.navigateToCandidates();
        candidatePage.deleteCandidate()
        cy.wait(2000)
    })
       
});

