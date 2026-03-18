import { test, expect } from '@playwright/test';
import { homepage } from '../Pages/homePage';
import { contactpage } from '../Pages/contactPage';
const dataset = JSON.parse(JSON.stringify(require("../TestData/testData.json")));

test.beforeEach(async ({ page }) => {
    await page.goto(dataset.url, {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
});

test('Check whether website is loaded properly.', async ({ page }) => {
    const hp = new homepage(page);
    await hp.homepageDisplayed();
});

test('Verify that key sections of the homepage are visible.', async ({ page }) => {
    const hp = new homepage(page);
    await hp.keySectionsVisible();
});

test('Check whether user can submit the contact form without filling the textfields and all fields of contact page is visible.', async ({ page }) => {
    const hp = new homepage(page);
    await hp.clickContactUs();
    const cp = new contactpage(page);
    await cp.verifyFieldsVisible();
    await cp.verifySubmissionWithEmptyFields();
});

test('Check whether user can fill the invalid format in the email field.', async ({ page }) => {
    const hp = new homepage(page);
    await hp.clickContactUs();
    const cp = new contactpage(page);
    await cp.verifySubmissionWithInvalidEmail();
});

test('Check whether user can fill all the text fields in contact us page.', async ({ page }) => {
    const hp = new homepage(page);
    await hp.clickContactUs();

    const cp = new contactpage(page);
    await cp.fillContactForm(dataset.firstname, dataset.lastname, dataset.email, dataset.message, dataset.phone);
});