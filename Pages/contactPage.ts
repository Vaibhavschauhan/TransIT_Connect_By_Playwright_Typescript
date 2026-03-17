import { test, expect, Locator } from '@playwright/test';
import { Page } from "playwright-core";

export class contactpage {
    readonly page: Page;
    readonly contactPageTitle: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly message: Locator;
    readonly phone: Locator;
    readonly submitButton: Locator;
    readonly sendMessageErrorMessage: Locator;
    readonly selectSubject: Locator;
    readonly emailErrorMessage: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactPageTitle = page.locator("//h2[@class='section-title']");
        this.firstName = page.locator("//input[@name='first-name']");
        this.lastName = page.locator("//input[@name='last-name']");
        this.email = page.locator("//input[@name='email']");
        this.selectSubject = page.locator("//span[text()='Other']");
        this.message = page.locator("//textarea[@name='message']");
        this.phone = page.locator("//input[@name='phone']");
        this.submitButton = page.locator("//input[@value='Send Message']");
        this.sendMessageErrorMessage = page.locator("//div[contains(text(),'One or more fields')]");
        this.emailErrorMessage = page.locator("//span[text()='Please enter an email address.']");
        this.successMessage = page.locator("//div[text()='Thank you for your message. It has been sent.']");
    }

    async verifyContactPageDiaplayed() {
        await expect(this.contactPageTitle).toBeVisible();
    }

    async verifyFieldsVisible() {
        await expect(this.firstName).toBeVisible();
        await expect(this.lastName).toBeVisible();
        await expect(this.email).toBeVisible();
        await expect(this.message).toBeVisible();
        await expect(this.phone).toBeVisible();
    }

    async verifySubmissionWithEmptyFields() {
        await this.submitButton.click();
        await this.sendMessageErrorMessage.waitFor({ state: 'visible' });
        await expect(this.sendMessageErrorMessage).toBeVisible();
    }

    async verifySubmissionWithInvalidEmail() {

        const invalidEmails = [
            "invalidemail",
            "test@",
            "@gmail.com",
            "test@gmail",
            "test@.com",
            "test@@gmail.com",
            "test gmail.com"
        ];

        const randomEmail = invalidEmails[Math.floor(Math.random() * invalidEmails.length)];

        await this.email.fill(randomEmail);
        await this.email.press('Enter');
        await this.emailErrorMessage.waitFor({ state: 'visible' });
        await expect(this.emailErrorMessage).toBeVisible();

    }

    async fillContactForm(firstNameValue: string, lastNameValue: string, emailValue: string, messageValue: string, phoneValue: number) {
        await this.firstName.fill(firstNameValue);
        await this.lastName.fill(lastNameValue);
        await this.email.fill(emailValue);
        await this.phone.fill(phoneValue.toString());
        await this.selectSubject.click();
        await this.message.fill(messageValue);
        await this.submitButton.click();

        await this.successMessage.waitFor({ state: 'visible' });
        await expect(this.successMessage).toBeVisible();
    }
}

module.exports = { contactpage }