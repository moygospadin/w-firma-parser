import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { zalandoUrls, zalandoText } from "../consts/links";
import { element2selector } from "puppeteer-element2selector";
async function zalandoLogin({ CREDS }) {
    const url = zalandoUrls.mainUrl;
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto(url + zalandoUrls.accountPage);
    await page.waitForSelector(zalandoText.emailField);
    let userNameElement = await page.$(zalandoText.emailField);
    const userNameSelector = await element2selector(userNameElement);
    await page.waitForSelector(zalandoText.passwordField);
    let userPasswordElement = await page.$(zalandoText.passwordField);
    const userPasswordSelector = await element2selector(userPasswordElement);
    await page.type(userNameSelector, CREDS.username, { delay: 100 });
    await page.type(userPasswordSelector, CREDS.password, { delay: 100 });
    await page.waitForSelector(zalandoText.loginButton);
    let loginBtnElement = await page.$(zalandoText.loginButton);
    const loginBtnSelector = await element2selector(loginBtnElement);
    await page.click(loginBtnSelector);
    return { page };
}
async function findSneakers(sneakerName) {
    //   const [h3] = await page.$x(`//h3[contains(., '${text}')]`);
    //   if (h3) {
    //     h3.click();
    //     await page.waitForNavigation({ waitUntil: "networkidle0" });
    //   }
    // await page.screenshot({
    //   path: `page${sneakerName + Number(new Date()).toString()}.png`,
    //   fullPage: true,
    // });
    //await browser.close();
}
export { findSneakers, zalandoLogin };
