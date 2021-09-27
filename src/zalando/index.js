const puppeteer = require("puppeteer-extra");

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const { zalandoUrls, zalandoText } = require("../consts/links");
const { element2selector } = require("puppeteer-element2selector");
puppeteer.use(StealthPlugin());

async function zalandoLogin(CREDS) {
  const url = zalandoUrls.mainUrl;

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

  await page.type(userNameSelector, CREDS.username, { delay: 50 });
  await page.type(userPasswordSelector, CREDS.password, { delay: 50 });

  await page.waitForSelector(zalandoText.loginButton);
  let loginBtnElement = await page.$(zalandoText.loginButton);
  const loginBtnSelector = await element2selector(loginBtnElement);

  const waitForNavigation = page.waitForNavigation();

  await page.click(loginBtnSelector);
  await waitForNavigation;
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
module.exports = { findSneakers, zalandoLogin };
