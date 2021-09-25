const puppeteer = require("puppeteer");

(async () => {
  const url = "https://www.zalando.pl/obuwie-meskie/nike/";
  const text = "AIR FORCE 1";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [span] = await page.$x(`//h3[contains(., '${text}')]`);
  if (span) {
    span.click();
    await page.waitForNavigation({ waitUntil: "networkidle0" });
  }

  await page.screenshot({
    path: `page${text + Number(new Date()).toString()}.png`,
    fullPage: true,
  });
  await browser.close();
})();
