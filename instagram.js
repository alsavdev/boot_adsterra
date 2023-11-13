const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({ headless: false, defaultViewport:null });
// await page.setUserAgent('Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.111 Mobile Safari/537.36');
  const page = await browser.newPage();

  //   // Buka halaman web yang sesuai
  await page.goto('https://instagram.com/bakmi.ton?igshid=enFwY2VrdTF0MHVq');

  await page.waitForTimeout(2000); // Contoh menunggu 2 detik

  await page.waitForXPath('//*[text()="tinyurl.com/bdd536yr"]');


  const elements = await page.$x('//*[text()="tinyurl.com/bdd536yr"]');

  // if (elements.length > 0) {
  //   await elements[0].click();
  // }
  const newTargetPromise = new Promise((resolve) => {
    browser.once('targetcreated', (target) => {
        resolve(target);
    });
});

if (elements.length > 0) {
    await elements[0].click()
}
await page.waitForTimeout(7000);

const newTarget = await newTargetPromise;
const newPage = await newTarget.page();

const learn = await newPage.$$('a')
if (learn.length > 3) {
    await newPage.evaluate((e) => e.click(), learn[3])
    await newPage.waitForSelector("#explanation")
    await newPage.click('#explanation > p > a')
  }

// // await page.waitForTimeout(10000); 
// await page.waitForTimeout(7000);
// const pages = await browser.pages(); 
// const lastPage = pages[pages.length - 1];
// const learn = await lastPage.$$('a')
//     if (learn.length > 3) {
//         await lastPage.evaluate((e) => e.click(), learn[3])
//       }
//       await lastPage.waitForSelector("#explanation")
//       await lastPage.click('#explanation > p > a')



})();