const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({ headless: false, defaultViewport:null });
  const page = await browser.newPage();
  // await page.setUserAgent('Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.111 Mobile Safari/537.36');

  await page.goto('https://zacloudta.my.id/',{waitUntil: ['domcontentloaded', "networkidle2"],
  timeout: 120000});
  await page.waitForTimeout(7000);
  // await page.waitForSelector('iframe');
  //     const iframes = await page.$$('iframe');
  //     const iframePertama = iframes[iframes.length - 1];
  //     const frame = await iframePertama.contentFrame();
  //     await frame.waitForSelector(':first-child');
  //     const el = await frame.$(':first-child');
  //     await frame.waitForSelector("body > div > div > div.pl-d5f79a10041a731c9e69836d9eb5f241__content-block > a");
  //     const acc = await el.$("body > div > div > div.pl-d5f79a10041a731c9e69836d9eb5f241__content-block > a");
  //     await acc.click();

  // const validIframes = await Promise.all(
  //     iframes[1].map(async (iframe) => {
  //     const style = await iframe.evaluate((el) => el.getAttribute('style'));
  //     if (!style || !style.includes('width:1px;height:1px;display:none;')) {
  //         return iframe;
  //     }
  //     })
  // );
  // if (validIframes.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * validIframes.length);
  //     const randomIframe = validIframes[randomIndex];
  //     await randomIframe.click();
  //     console.log("Klik Banner Found ✅");
  // }






// try {
//   // await page.waitForSelector('iframe');
//   // const numb = [0,1,2]
//   // const random = Math.floor(Math.random() * numb.length)
//   // const iframes = await page.frames();
//   // const iframePertama = iframes[random];
//   // await iframePertama.waitForSelector(':first-child');
//   // await iframePertama.waitForSelector('#atLink-e22e13b63fc6d85892bfb43531138cb5');
//   // const tes = await iframePertama.$('#atLink-e22e13b63fc6d85892bfb43531138cb5');
//   // await tes.click();

//   // await page.waitForSelector('iframe');
//     const numb = [0,1,2]
//     const random = Math.floor(Math.random() * numb.length)
//     const iframes = await page.frames();
//     const iframePertama = iframes[random];
//     // await iframePertama.waitForSelector(':first-child');
//     // await iframePertama.waitForSelector('#atLink-e22e13b63fc6d85892bfb43531138cb5');
//     // const tes = await iframePertama.$('#atLink-e22e13b63fc6d85892bfb43531138cb5');
//     await iframePertama.click();
// } catch (error) {
  
// }
  





  // const pages = await browser.pages(); 
  // const urlPage = pages[1];
  // const url = await urlPage.url();
  // console.log('URL:', url);
  // const targetUrl = 'https://zacloudta.my.id/';

  // if (url !== targetUrl) {
  //   // Buka URL baru jika tidak sesuai
  //   console.log(`Navigating to ${targetUrl}`);
  //   await lastPage.goto(targetUrl);
  // }
  // try {
    // const iframeIndex = 5;
    // const frame = page.frames()[iframeIndex];
    // const el = await frame.$(':first-child');
    // const tes = await el.$("body > div > div > div.pl-d5f79a10041a731c9e69836d9eb5f241__content-block > a");
    // if (tes) {
    //   await tes.click();
    // }
  //  await randomAdd()
  //  await randomAdd()
  //  await randomAdd()
  //  await randomAdd()
  //  await randomAdd()
 
    
    async function randomAdd(){
      try {
        await page.waitForSelector('iframe');
        const iframes = await page.$$('iframe');
        const iframePertama = iframes[5];
        const frame = await iframePertama.contentFrame();
        await frame.waitForSelector(':first-child');
        const el = await frame.$(':first-child');
        await frame.waitForSelector("body > div > div > div.pl-d5f79a10041a731c9e69836d9eb5f241__closelink");
        const acc = await el.$("body > div > div > div.pl-d5f79a10041a731c9e69836d9eb5f241__closelink");
        await acc.click();
        await page.waitForTimeout(20000);
        console.log('berhasil');
      } catch (error) {
        console.log('no');
      }
  }
  // } catch (error) {
    
  // }

        // more && await more.click()
//hp
// Tunggu hingga tombol muncul dalam DOM

// await page.waitForTimeout(2000);
// await page.waitForSelector('button[aria-label="Show more"].slim-video-information-show-more');

// // Temukan tombol dan klik
// await page.click('button[aria-label="Show more"].slim-video-information-show-more');

// await page.waitForTimeout(2000);

// await page.waitForSelector('div.collapsed-string-expand-button');

//   // Temukan elemen dan klik
// await page.click('div.collapsed-string-expand-button');

// //   // Tunggu sebentar jika perlu
//   await page.waitForTimeout(2000); // Contoh menunggu 2 detik


// //   await page.waitForXPath('//*[text()="https://tinyurl.com/bdd536yr"]');


// //   const elements = await page.$x('//*[text()="https://tinyurl.com/bdd536yr"]');

// //   if (elements.length > 0) {
// //     await elements[0].click();
// //   }
// //   await page.waitForTimeout(7000);
// //   const pages = await browser.pages(); 
// //   const lastPage = pages[pages.length - 1];
//   await page.evaluate(() => {
//     window.scrollBy(0, window.innerHeight * 1000);
//   });

  // Tutup browser
  //await browser.close();

 // Tunggu hingga tautan muncul dalam DOM
//  await page.waitForSelector('a.yt-core-attributed-string__link[yt-core-attributed-string__link--display-type]');

 // Temukan tautan dengan atribut href yang sesuai
//  const link = await page.$('a.yt-core-attributed-string__link[yt-core-attributed-string__link--display-type]');

//  if (link) {
//    // Klik tautan
//    await link.click();

//    // Tunggu sebentar jika perlu
//    await page.waitForTimeout(2000); // Contoh menunggu 2 detik

//    // Tutup browser
//    //await browser.close();
//  } else {
//    console.log("Tautan tidak ditemukan.");
//    //await browser.close();
//  }


})();