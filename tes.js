const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({ headless: false, defaultViewport:null });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.111 Mobile Safari/537.36');
  await page.evaluateOnNewDocument(() => {
    document.addEventListener('click', (event) => {
      const targetElement = event.target.closest('a[target="_blank"]');
      if (targetElement) {
        event.preventDefault();
        window.location.href = targetElement.getAttribute('href');
      }
    });
});
  //   // Buka halaman web yang sesuai
  await page.goto('https://youtu.be/qf_2ylYhDlw?si=RNyZp_EnAs3aKcef');
  const acceptSus = await page.evaluate(() => {
    const element = document.querySelector(
        "body > div.consent-bump-v2-lightbox > ytm-consent-bump-v2-renderer > div > div.dialog-scrollable-content > div.one-col-dialog-buttons > ytm-button-renderer.eom-accept > button"
    );
    return element && typeof element.click === "function";
});

if (acceptSus) {
    try {
        await page.waitForSelector('body > div.consent-bump-v2-lightbox > ytm-consent-bump-v2-renderer > div > div.dialog-scrollable-content > div.one-col-dialog-buttons > ytm-button-renderer.eom-accept > button')
    } catch (error) {
        log(error)
        await browser.close();
    }
    await page.click('body > div.consent-bump-v2-lightbox > ytm-consent-bump-v2-renderer > div > div.dialog-scrollable-content > div.one-col-dialog-buttons > ytm-button-renderer.eom-accept > button')
  }
  // const more = await page.$('button[class="slim-video-information-show-more"]')
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