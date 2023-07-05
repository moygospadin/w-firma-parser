import puppeteer from "puppeteer-extra";

import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AnonUA from "puppeteer-extra-plugin-anonymize-ua";
import { zalandoUrls, zalandoText } from "../consts/links";

import { IProps } from "./types";
import { Page } from "puppeteer";

async function zalandoLogin({ CREDS }: IProps) {
  const url = zalandoUrls.mainUrl;
  puppeteer.use(StealthPlugin());
  puppeteer.use(AnonUA());
  const browser = await puppeteer.launch({
    headless: false,
    // executablePath:
    //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ignoreDefaultArgs: ["--enable-automation"],
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--enable-webgl",
      "--window-size=1300,800",
    ],
  });

  const page = await browser.newPage();

  page.setViewport({ width: 1366, height: 768 });
  await page.goto(url + zalandoUrls.accountPage);

  // await page.$$(zalandoText.emailField);

  await page.type(zalandoText.emailField, CREDS.username, {
    delay: 0,
  });
  await page.type(zalandoText.passwordField, CREDS.password, { delay: 0 });

  // await page.$$(zalandoText.loginButton);

  await page.click(zalandoText.loginButton);
  console.log("123");
  await page.waitForNavigation();

  return { page };
}

async function findSneakers(sneakerName: string, page: Page) {
  const url = zalandoUrls.mainUrl;
  const p = `/katalog/?q=${sneakerName.split(" ").join("+")}`;
  await page.goto(url + p);

  await page.screenshot({
    path: `page${sneakerName + Number(new Date()).toString()}.png`,
    fullPage: true,
  });
  await page.close();
}
export { findSneakers, zalandoLogin };
