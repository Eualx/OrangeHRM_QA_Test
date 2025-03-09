OrangeHRM Testing Project

Project Overview

This project focuses on testing the OrangeHRM application using both performance and functional testing techniques. The tests ensure the application's reliability, efficiency, and correctness in handling different scenarios.

Features Tested

Functional Testing
User Authentication (Login & Logout)

Recruitment Module Dashboard Navigation

Performance Testing
Load Testing

Stress Testing

Response Time Measurement

Scalability Testing

Tools & Technologies Used

Cypress (Functional Testing) K6 (Performance Testing)

Installation & Setup

Clone the repository:

git clone https://github.com/Eualx/QA_Test_OrangeHRM_app.git

Navigate to the project directory:

cd QA_Test_OrangeHRM_app

Install dependencies:

npm install

Run functional tests:

npx cypress open

Run performance tests:

k6 run

Git Workflow

Cloning the Repository
git clone https://github.com/Eualx/QA_Test_OrangeHRM_app.git

Creating a New Branch
git checkout -b feature-branch-name

Adding and Committing Changes
git add . git commit -m "Your commit message"

Pushing Changes to GitHub
git push origin feature-branch-name

Creating a Pull Request
Go to the repository on GitHub.

Click on "Pull Requests."

Click "New Pull Request."

Select the feature branch and submit for review.

Updating the Local Repository
Before starting new changes, always sync with the main branch:

git pull origin main

Test Execution & Reporting

Functional test reports are generated in cypress/reports.

Performance test logs are stored in results/.

Contribution

Feel free to fork the repository and submit a pull request if you would like to contribute.

Author

Eyerusalem Alemayehu eualx14j@gmail.com LinkedIn: www.linkedin.com/in/eyerusalem-alemayehu-38992421a
