import {test, expect, Locator} from '@playwright/test';
import { Page } from "playwright-core";

export class homepage
{
    readonly homePageText:Locator;
    readonly servedSegments:Locator;
    readonly navigationMenu:Locator;
    readonly successStory:Locator;
    readonly contactUsLink:Locator;
    readonly contactPageTitle:Locator;

    constructor(page:Page){
        this.homePageText=page.locator("//h1[contains(text(),'Simplifying Every Mile Of')]");
        this.navigationMenu=page.locator("//div[contains(@class,'nav-items')]");
        this.successStory=page.locator("//div[contains(@class,'featured-title')]");
        this.servedSegments=page.locator("//section[@class='segments-section']");
        this.contactUsLink=page.locator("(//a[text()='Contact us'])[1]");
        this.contactPageTitle = page.locator("//h2[@class='section-title']");

    }

    async homepageDisplayed(){
        const homepageText= this.homePageText.innerText();
        expect(homepageText).toBeTruthy();
        await expect(this.homePageText).toBeVisible();        
    }

    async keySectionsVisible(){
        await expect(this.servedSegments).toBeVisible();
        await expect(this.navigationMenu).toBeVisible();
        await expect(this.successStory).toBeVisible();
    }

    async clickContactUs(){
        await this.contactUsLink.click();
        await this.contactPageTitle.waitFor({ state: 'visible' });
    }
}

module.exports = {homepage}