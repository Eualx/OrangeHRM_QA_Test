import Login from "../support/modules/Login";
import Vacancie from "../support/modules/Vacancie";

describe('Vacancy module test suit', () => {
    let loginpage;
    let VacanciePage;
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false; // Prevent Cypress from failing the test on app errors
    });

    beforeEach(() => {
        loginpage = new Login();
        VacanciePage = new Vacancie();

        loginpage.visit();
        cy.wait(5000);
        loginpage.login('Admin', 'admin123');
        cy.wait(5000);
    });

    // beforeEach(() => {
    //     VacanciePage.navigateToRecruitment();
    // });

    afterEach(() => {
        cy.log('Test case completed.');
        cy.wait(5000);
    });

    it('should add a new vacancy using data from Excel', () => {
        cy.task("readExcelFile", "cypress/fixtures/data/vacancies_test_data.xlsx").then((data) => {
            data.forEach(row => {
                //cy.log(`Processing: ${row.JobTitle}`)
                VacanciePage.navigateToRecruitment();
                cy.wait(5000);
                VacanciePage.clickAddVacancy();
                VacanciePage.enterJobTitle(row.JobTitle);
                VacanciePage.enterNumberofPosition(row.Numberofposition);
                VacanciePage.selectVacancyName(row.VacancyName);
                VacanciePage.selectHiringManager(row.HiringManager);
                VacanciePage.enterJobDescription(row.JobDescription);
                VacanciePage.saveVacancy();
                cy.wait(5000);
            });
        });

        VacanciePage.verifyVacancySaved('Edit Vacancy');
    });

    it('should not add a vacancy without required fields', () => {
        cy.task("readExcelFile", "cypress/fixtures/data/vacancies_test_data.xlsx").then((data) => {
            data.forEach(row => {
                cy.log(`Processing: ${row.JobTitle}`);

              // skip jobtitle and hiring manager
                VacanciePage.navigateToRecruitment();
                cy.wait(5000);
                VacanciePage.clickAddVacancy();
                VacanciePage.selectVacancyName(row.VacancyName);
                VacanciePage.enterJobDescription(row.JobDescription);
                VacanciePage.saveVacancy();

                // Expect error messages for missing fields
                cy.wait(5000);
                VacanciePage.verifyRequiredFieldErrors();
            });
        });
       // VacanciePage.verifyVacancySaved('Required');
    });


    it('should search vacancies using filters and verify the results', () => {
        cy.task("readExcelFile", "cypress/fixtures/data/vacancies_test_data.xlsx").then((data) => {
            const row =data[0] 
                VacanciePage.navigateToRecruitment();
                cy.wait(5000);
                VacanciePage.searchVacancy( row.VacancyName,row.JobTitle, row.HiringManager);
                cy.wait(5000);
                VacanciePage.verifySearchResults(row.VacancyName);
            });
        });
   
        it('should search vacancies with incorrect data', () => {
            cy.task("readExcelFile", "cypress/fixtures/data/vacancies_test_data.xlsx").then((data) => {
                const row =data[0] 
                    VacanciePage.navigateToRecruitment();
                    cy.wait(5000);
                    VacanciePage.searchVacancy( 'test',row.JobTitle, row.HiringManager);
                    cy.wait(5000);
                    VacanciePage.verifySearchResults('No Records Found');
                });
            });

    it('edit vacancy',()=>{
        VacanciePage.navigateToRecruitment();
        cy.wait(5000);
        VacanciePage.editVacancy('Software QA', 'QA Engineer','James Butler')
       })
it('delete Recored vacancy',()=>{
    VacanciePage.navigateToRecruitment();
    cy.wait(5000);
    VacanciePage.deleteVacancy()
    cy.wait(5000);
})
});
