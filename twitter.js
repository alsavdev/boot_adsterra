const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({ headless: false, defaultViewport:null });
  const page = await browser.newPage();
  // await page.setUserAgent('Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.111 Mobile Safari/537.36');
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
  await page.goto('https://twitter.com/AndaniAmel1765/status/1722903886401503736');
  // await page.waitForTimeout(10000);
  //     // Temukan elemen dengan atribut tertentu
  //     const targetElement = await page.$('div[class="css-901oao r-1awozwy r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0"]');

  //     // Jika elemen ditemukan, lakukan klik
  //     if (targetElement) {
  //         await targetElement.click();
  //         console.log('Elemen diklik');
  //     } else {
  //         console.log('Elemen tidak ditemukan');
  //     }

    // Tunggu sampai elemen muncul di halaman
    // try {
    //   await page.waitForSelector('[aria-label="Close"]');
    //   await page.click('[aria-label="Close"]');
    // } catch (error) {
    //   console.error('1Elemen tidak ditemukan atau tidak dapat diakses:');
    // }
    // await page.waitForTimeout(10000);
    // try {
    //   await page.waitForSelector('[aria-label="Close"]');
    //   await page.click('[aria-label="Close"]');
    // } catch (error) {
    //   console.error('2Elemen tidak ditemukan atau tidak dapat diakses:');
    // }
  

// Wait for the anchor element to become available
//klik popup 
try {
  await page.waitForSelector('[aria-label="Close"]');
  await page.click('[aria-label="Close"]');
} catch (error) {
  console.error('2Elemen tidak ditemukan atau tidak dapat diakses:');
}


// // Click the anchor element after removing target="_blank"
// await page.click('a.css-4rbku5');
// console.log('selesai klik');

  
// await page.waitForTimeout(30000);
// await page.evaluate(() => {
//     const elements = document.querySelectorAll('span'); // Ganti selektor sesuai dengan kebutuhan Anda.
//     for (const element of elements) {
//       if (element.innerText === 'Not now') {
//         element.click();
//         break; // Hentikan pencarian setelah elemen ditemukan dan diklik.
//       }
//     }
//   });
//   await page.waitForTimeout(3000);
//   const linkElement = await page.$x(`//a[contains(@href, "https://t.co/ki43zYAFGP")]`);
//   if (linkElement.length > 0) {
//     // Klik tautan jika ditemukan
//     await linkElement[0].click();
//   }

// await page.waitForTimeout(7000);
//   const pages = await browser.pages(); 
//   const lastPage = pages[pages.length - 1];
//   await lastPage.evaluate(() => {
//     window.scrollBy(0, window.innerHeight * 10000);
//   });

//   await lastPage.waitForTimeout(30000);
//   const starttTimes = Date.now();
//   const miscs = 1 * 60;
//   const maxscs = 1 * 60;
//   const ttimes = Math.floor(Math.random() * (maxscs - miscs + 1)) + 60;
//   const cossfe = ttimes / 60;
//   const numb = cossfe.toString().slice(0,4)
//   const rNumb = parseFloat(numb);
//   console.log("Scrolling page tautan for random range " + rNumb + " minute 🕐");
//       while (Date.now() - starttTimes < ttimes * 1000) {
//           await lastPage.evaluate(() => {
//               window.scrollBy(0, 500);
//       });
//       await lastPage.waitForTimeout(3000);
//       await lastPage.evaluate(() => {
//           window.scrollBy(0, -300);
//       });
//       await lastPage.waitForTimeout(3000);
// }


})();