const puppeteer = require('puppeteer');
const proxyChain = require("proxy-chain");

(async () => {
  const proxyHost = 'private.residential.proxyrack.net';
  const proxyPort = 10004;
  const proxyUsername = 'bismillah2023';
  const proxyPassword = 'a6ae10-5354aa-b24a1c-4a1aea-bcc31b';

  const proxyUrl = `${proxyUsername}:${proxyPassword}@${proxyHost}:${proxyPort}`;
  const oldProxyUrl = `http://${proxyUrl}`;
  const newProxyUrl = await proxyChain.anonymizeProxy({
      url: oldProxyUrl,
      port: generateRandomPort()
  })
  const browser = await puppeteer.launch({
    headless: false, 
    defaultViewport:null,
    args: [
      `--proxy-server=${newProxyUrl}`,
      '--ignore-certificate-errors',
      "--force-device-scale-factor=0.5",
    ],
  });
  const page = await browser.newPage();

  // Buka website
  const websiteUrl = 'https://zacloudta.my.id/';
  // await page.goto(websiteUrl);
  await page.goto(websiteUrl, { waitUntil: ['domcontentloaded', "networkidle2"],
                 timeout: 120000 });
                 await page.waitForTimeout(9000);
                //  const selector = '#custom-background-css > header > div.bs-menu-full > nav > div > div.m-header.align-items-center > div.right-nav > a > i';  
                //  await page.waitForSelector(selector);
                //  await page.click(selector);
                // document.querySelector("#menu-item-20565 > a")
                //document.querySelector("")
                try {
                  await page.waitForSelector('iframe');
                  const iframes = await page.$$('iframe');
                  const iframePertama = iframes[iframes.length - 1];
                  const frame = await iframePertama.contentFrame();
                  await frame.waitForSelector(':first-child');
                  const el = await frame.$(':first-child');
                  await frame.waitForSelector("body > div > div > div.pl-d5f79a10041a731c9e69836d9eb5f241__closelink > img",{timeout: 9000 });
                  const acc = await el.$("body > div > div > div.pl-d5f79a10041a731c9e69836d9eb5f241__closelink > img");
                  await acc.click();
                } catch (error) {
                  console.log('pop up 1');
                }
                try {
                  await page.waitForSelector('iframe');
                  const iframes = await page.$$('iframe');
                  const iframePertama = iframes[iframes.length - 1];
                  const frame = await iframePertama.contentFrame();
                  await frame.waitForSelector(':first-child');
                  const el = await frame.$(':first-child');
                  await frame.waitForSelector("body > div > div > div > div > img",{timeout: 9000 });
                  const acc = await el.$("body > div > div > div > div > img");
                  await acc.click();
                } catch (error) {
                  console.log('pop up 2');
                }
                await page.evaluate(async () => {
                  await new Promise((resolve, reject) => {
                    let totalHeight = 0;
                    const distance = 100; 
              
                    const timer = setInterval(() => {
                      const scrollHeight = document.body.scrollHeight;
                      window.scrollBy(0, distance);
                      totalHeight += distance;
              
                      if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                      }
                    }, 100); // Interval waktu antara setiap pengguliran
                  });
                });
                try {
                  await page.waitForTimeout(9000);
                  const asfd = await page.$("#categories-3 > ul > li.cat-item.cat-item-36 > a");
                  await asfd.click();  
                } catch (error) {
                  console.log('kilik pop under');
                }
                

  
})();
function generateRandomPort() {
  const currentTime = new Date().getTime();
  const random = Math.random();
  const port = Math.floor(currentTime * random) % (65535 - 1024 + 1) + 1024;
  return port;
}