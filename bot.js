const path = require("path");
require('dotenv').config({
    path: path.join(__dirname, '.env')
});
const fs = require("fs");
const p = require("puppeteer-extra");
const {
    randomListUser
} = require('./utils/randomListUser')

const {
    randomListAndroid
}= require('./utils/android')

const{
    randomListDesktop
}= require('./utils/desktop')
    
const{
    randomListIphone
}=require('./utils/iphone')

const pPlugin = require("puppeteer-extra-plugin-stealth");
p.use(pPlugin());

const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const { log } = require("console");

const baseUrl = process.env.BASE_URL;
const ipUrl = process.env.IP_URL;
const timeout = process.env.TIMEOUT || 3000;
const ipSaya = process.env.IP_SAYA;

const spoof = path.join(process.cwd(), "extension/spoof/");
const UserAgent = require('user-agents')  

let browser;
let page;
let newProxyUrl;
let stopFlag = false

const startProccess = async (keyword, domain, anchor, logToTextarea, pageArticles, banners, linkAccounts, artikels, proxyC, proxys, desktops, androids, iphones, randoms, whoers, view, recentPosts, loops, scrollmins, scrollmaxs, scrollminAdss, scrollmaxAdss, googlebanners, tiktoks, youtubes, instagrams, twitters, snapcats, ipsayas, captchaApiKeys, linkDirects, facebooks, popups, pinterests, popunders, sequences, threadCount, tablets) => {
stopFlag = false
if (captchaApiKeys) {
  p.use(
      RecaptchaPlugin({
          provider: {
              id: '2captcha',
              token: captchaApiKeys
          },
          visualFeedback: true
      })
  )
} 
let reachedproxy;
let rproxy;    
if (proxyC) {
  if (sequences) {
    const se = proxys.split('\n');
    const firstProxyInfo = se[threadCount - 1]; // Mengambil proxy pertama dari daftar
    const trims = firstProxyInfo.trim();
    reachedproxy = [host, port, username, password] = trims.split(":");
    rproxy = `${reachedproxy[0]}:${reachedproxy[1]}`;
    logToTextarea('proxy : ' + reachedproxy[0]);
  }else{
    const se = proxys.split('\n')
    const randomProxyInfo = se[Math.floor(Math.random() * se.length)];
    const trims = randomProxyInfo.trim()
    reachedproxy = [host, port, username, password] = trims.split(":")
    rproxy = `${reachedproxy[0]}:${reachedproxy[1]}`
    logToTextarea('proxy : ' + reachedproxy[0])
  }
}

let userAgent;
    if (desktops) {
         userAgent = new UserAgent({ deviceCategory:  'desktop' });
        // await page.setUserAgent(userAgent.toString());
    }else if (androids) {
      // userAgent = new UserAgent({ deviceCategory: 'mobile' });
      userAgent = new UserAgent({ deviceCategory: 'mobile' });
        // await page.setUserAgent(userAgent.toString());
    }else if (iphones) {
      userAgent = new UserAgent({ platform: 'iPhone' });
        // await page.setUserAgent(userAgent.toString());
    }else if (randoms) {
      userAgent = new UserAgent().random();
        // await page.setUserAgent(userAgent.toString());
    }else if (tablets){
      userAgent = new UserAgent({ deviceCategory: 'tablet' });
    }else{
      userAgent = new UserAgent().random();
    }
    const options = {
        ignoreHTTPSErrors: true,
        defaultViewport: null,
        args: [
            proxyC ? `--proxy-server=${rproxy}` : null,
            `--load-extension=${spoof}`,
            // `--disable-extensions-except=${spoof}`,
            `--user-agent=${userAgent.toString()}`,
            "--disable-dev-shm-usage",
            "--no-sandbox",
            "--disable-popup-blocking",
            "--allow-popups-during-page-unload",
            "--disable-setuid-sandbox",
            '--start-maximized'
        ].filter(Boolean)
    }

    browser = await p.launch({
        headless: view,
        ...options,
    })

    page = await browser.newPage()
    if (proxyC) {
        await page.authenticate({username: `${reachedproxy[2]}`,password: `${reachedproxy[3]}`}); 
    }
    page.sleep = function (timeout) {
        return new Promise(function (resolve) {
            setTimeout(resolve, timeout);
        });
    };
    try {
        page.on('dialog', async dialog => {
            await dialog.dismiss();
            await closeClear(proxyC)
        })
        await checkErrorPage(logToTextarea)
        if (ipsayas) {
          await getipsaya(logToTextarea, proxyC)
      }

        if (whoers) {
            await getIp(logToTextarea, proxyC)
        }
        if (pageArticles) {
              try {
                await page.goto(keyword, { timeout: 30000 });
              } catch (error) {
                if (error.name === "TimeoutError") {
                    await page.evaluate(() => window.stop());
                    // await page.reload();
                } else {
                  logToTextarea("An error occurred:", error);
                }
              }
            logToTextarea("Go to " + keyword);
            await page.sleep(10000);
            try {
                await page.reload();
                await page.sleep(10000);
              } catch (error) {
                if (error.name === "TimeoutError") {
                  await page.sleep(10000);
                  await page.evaluate(() => window.stop());
                } else {
                  logToTextarea("An error occurred:", error);
                }
            }
            try {
              const pages = await browser.pages(); 
              const urlPage = pages[1];
              const url = await urlPage.url();

              if (url !== keyword) {
                await lastPage.goto(keyword);
                await page.sleep(10000);
                await page.reload();
              }
            } catch (error) {
              
            }
            await page.sleep(10000);
            await noAdds(logToTextarea);
            // await closeAdd(logToTextarea);
            await autoScrollbawa(page);
            await autoScrollToTop(page);
            await autoScroll(page, scrollmins, scrollmaxs, logToTextarea)
            if (recentPosts) {
              logToTextarea("Klik Recent Posts");
              const postLinks = await page.$$('#recent-posts-2 ul li a');
              const randomIndex = Math.floor(Math.random() * postLinks.length);
              const randomLink = postLinks[randomIndex];
              page.sleep(10000)
              const linkUrl = await page.evaluate(link => link.href, randomLink);
              logToTextarea('Url Recent Posts : ' + linkUrl)
              await page.goto(linkUrl);
              logToTextarea("Klik Recent Posts Found ✅");
              //await page.reload();
              await noAdds(logToTextarea);
              await autoScroll(page, scrollmins, scrollmaxs, logToTextarea)
          }
        }
        if (googlebanners) {
          await page.goto(baseUrl, {
            waitUntil: 'networkidle2',
            timeout: 60000
        })

        await checkErrorPage(logToTextarea)
        if (captchaApiKeys) {
            await page.solveRecaptchas()
        }
        await page.sleep(5000)

        const accept = await page.$('#L2AGLb');

        if (accept) {
            logToTextarea("Accept Found ✅");
            const bahasa = await page.$('#vc3jof');
            await bahasa.click();
            await page.waitForSelector('li[aria-label="‪English‬"]');
            await page.click('li[aria-label="‪English‬"]');
            await page.sleep(5000)
            const accept = await page.$('#L2AGLb');
            await accept.click()
        } else {
            logToTextarea("Accept Not Found ❌");
        }

        const search = await page.$('[name="q"]')
        await search.type(keyword, {
            delay: 60
        })
        await search.press('Enter');
        await page.sleep(5000)
        if (captchaApiKeys) {
            await page.solveRecaptchas()
          }

          await page.sleep(5000)

          logToTextarea('Find Article For ' + keyword);

          const startTime = Date.now();
          while (Date.now() - startTime < 10000) {
              await page.evaluate(() => {
                  window.scrollBy(0, 100);
              });
              await page.sleep(5000);
              await page.evaluate(() => {
                  window.scrollBy(0, -10);
              });
              await page.sleep(3000);
          }

          const hrefElements = await page.$$('[href]');
          const hrefs = await Promise.all(hrefElements.map(element => element.evaluate(node => node.getAttribute('href'))));

          let linkFound = false;

          for (const href of hrefs) {
              if (domain.includes(href)) {
                  logToTextarea("Article Found ✅");
                  try {
                      const element = await page.waitForXPath(`//a[@href="${href}"]`, {
                          timeout: 10000
                      });
                      await element.click();
                      linkFound = true;
                      break;
                  } catch (error) {
                      logToTextarea(`Error clicking the link: ${error}`);
                      break;
                  }
              }
          }

          if (!linkFound) {
              logToTextarea("Article Not Found ❌: " + domain);
              await closeClear(proxyC)
              return
          }

          await page.sleep(10000);

          try {
            const pages = await browser.pages(); 
            const urlPage = pages[1];
            const url = await urlPage.url();

            if (url !== keyword) {
              await lastPage.goto(keyword);
              await page.sleep(10000);
              await page.reload();
            }
          } catch (error) {
            
          }
          await page.sleep(10000);
              await noAdds(logToTextarea);
              await page.waitForTimeout(9000);
             
              await autoScrollbawa(page);
              await autoScrollToTop(page);
              const randomWaitTime = Math.floor(Math.random() * 30000) + 30000;
              logToTextarea("Wait on page for random range " + randomWaitTime + " millisecond 🕐")
              await page.waitForTimeout(randomWaitTime);
              await autoScrollbawa(page);
              await no2Adds(logToTextarea);
              await page.waitForTimeout(9000);
              
           try {
              const iframes = await page.$$('iframe:not(:first-child):not(:last-child)');
              const numb = [1,2]
              const random = Math.floor(Math.random() * numb.length)
              await iframes[random].click();
              await page.waitForTimeout(9000);
              const pages = await browser.pages(); 
              const lastPage = pages[2];
              await autoScrolladds(lastPage, scrollminAdss, scrollmaxAdss, logToTextarea)
           } catch (error) {
             logToTextarea(error)
           }
          
        }
       
        if (banners) {
            try {
                await page.goto(keyword, { waitUntil: ['domcontentloaded', "networkidle2"],
                 timeout: 120000 });
              } catch (error) {
                if (error.name === "TimeoutError") {                
                //await page.reload();
                await page.evaluate(() => window.stop());
                //page.sleep(10000)
                } else {
                  // Handle other errors
                  logToTextarea("An error occurred:", error);
                }
              }
            logToTextarea("Go to " + keyword);
            await page.sleep(10000);
            try {
                await page.reload();
                await page.sleep(10000);
              } catch (error) {
                if (error.name === "TimeoutError") {
                await page.evaluate(() => window.stop());
                } else {
                  logToTextarea("An error occurred:", error);
                }
              }
              try {
                const pages = await browser.pages(); 
                const urlPage = pages[1];
                const url = await urlPage.url();
  
                if (url !== keyword) {
                  await lastPage.goto(keyword);
                  await page.sleep(10000);
                  await page.reload();
                }
              } catch (error) {
                
              }
              await page.sleep(10000);
              await noAdds(logToTextarea);
              await page.waitForTimeout(9000);
             
              await autoScrollbawa(page);
              await autoScrollToTop(page);
              const randomWaitTime = Math.floor(Math.random() * 30000) + 30000;
              logToTextarea("Wait on page for random range " + randomWaitTime + " millisecond 🕐")
              await page.waitForTimeout(randomWaitTime);
              await autoScrollbawa(page);
              await no2Adds(logToTextarea);
              await page.waitForTimeout(9000);
              
           try {
              const iframes = await page.$$('iframe:not(:first-child):not(:last-child)');
              const numb = [1,2]
              const random = Math.floor(Math.random() * numb.length)
              await iframes[random].click();
              await page.waitForTimeout(9000);
              const pages = await browser.pages(); 
              const lastPage = pages[2];
              await autoScrolladds(lastPage, scrollminAdss, scrollmaxAdss, logToTextarea)
           } catch (error) {
             logToTextarea(error)
           }

        }
        if (popups) {
          try {
            await page.goto(keyword, { waitUntil: ['domcontentloaded', "networkidle2"],
             timeout: 120000 });
          } catch (error) {
            if (error.name === "TimeoutError") {                
            await page.evaluate(() => window.stop());
            } else {
              logToTextarea("An error occurred:", error);
            }
          }
          // pages = await browser.pages()
          // const checkPage = async () => {
          //   try {
          //       if (pages.length > 1) {
          //           await pages[1].bringToFront()
          //       }
          //   } catch (error) {
          //       console.error(error)
          //   }
          // }
          
          // setInterval(checkPage, 2000)
        logToTextarea("Go to " + keyword);
        await page.sleep(10000);
        try {
            // await page.reload();
            await page.sleep(10000);
          } catch (error) {
            if (error.name === "TimeoutError") {
            await page.evaluate(() => window.stop());
            } else {
              logToTextarea("An error occurred:", error);
            }
          }
          try {
            const pages = await browser.pages(); 
            const urlPage = pages[1];
            const url = await urlPage.url();

            if (url !== keyword) {
              await lastPage.goto(keyword);
              await page.sleep(10000);
              await page.reload();
            }
          } catch (error) {
            
          }
          // await noAdds(logToTextarea);
          await page.waitForTimeout(9000);
         
          await autoScrollbawa(page);
          await autoScrollToTop(page);
          const randomWaitTime = Math.floor(Math.random() * 30000) + 30000;
          logToTextarea("Wait on page for random range " + randomWaitTime + " millisecond 🕐")
          await page.waitForTimeout(randomWaitTime);
          await autoScrollbawa(page);
          try {
            await page.waitForSelector('iframe');
            const iframes = await page.$$('iframe');
            const iframePertama = iframes[iframes.length - 1];
            const frame = await iframePertama.contentFrame();
            await frame.waitForSelector(':first-child');
            const el = await frame.$(':first-child');
            await frame.waitForSelector("body > div > div > a");
            const acc = await el.$("body > div > div > a");
            await acc.click();
            await page.waitForTimeout(9000);
            const pages = await browser.pages(); 
            const lastPage = pages[2];
            await autoScrolladds(lastPage, scrollminAdss, scrollmaxAdss, logToTextarea)
            logToTextarea("Pop Up 1 Found ✅");
          } catch (error) {
            await page.waitForSelector('iframe');
            const iframes = await page.$$('iframe');
            const iframePertama = iframes[iframes.length - 1];
            const frame = await iframePertama.contentFrame();
            await frame.waitForSelector(':first-child');
            const el = await frame.$(':first-child');
            await frame.waitForSelector("#a1");
            const acc = await el.$("#a1");
            await acc.click();
            await page.waitForTimeout(9000);
            const pages = await browser.pages(); 
            const lastPage = pages[2];
            await autoScrolladds(lastPage, scrollminAdss, scrollmaxAdss, logToTextarea)
            logToTextarea("Pop Up 2 Found ✅");
          }
        }
        if (popunders) {
          try {
            await page.goto(keyword, { waitUntil: ['domcontentloaded', "networkidle2"],
             timeout: 120000 });
          } catch (error) {
            if (error.name === "TimeoutError") {                
            await page.evaluate(() => window.stop());
            } else {
              logToTextarea("An error occurred:", error);
            }
          }
        logToTextarea("Go to " + keyword);
        await page.sleep(10000);
        try {
            // await page.reload();
            await page.sleep(10000);
          } catch (error) {
            if (error.name === "TimeoutError") {
            await page.evaluate(() => window.stop());
            } else {
              logToTextarea("An error occurred:", error);
            }
          }
          try {
            const pages = await browser.pages(); 
            const urlPage = pages[1];
            const url = await urlPage.url();

            if (url !== keyword) {
              await lastPage.goto(keyword);
              await page.sleep(10000);
              await page.reload();
            }
          } catch (error) {
            
          }
          // await noAdds(logToTextarea);
          await page.waitForTimeout(9000);
          logToTextarea('Scrolling page adds for random range');
          await autoScrollbawa(page);
          await page.waitForTimeout(9000);
          await autoScrollToTop(page);
          await page.waitForTimeout(9000);
          await autoScrollbawa(page);
          await page.sleep(10000);
          await popunderAdds(logToTextarea, scrollminAdss, scrollmaxAdss)
        }
        if (artikels) {
            try {
                await page.goto(keyword, { timeout: 10000 });
              } catch (error) {
                if (error.name === "TimeoutError") {
                  // Handle timeout error
                //   logToTextarea("TimeoutError: Reloading the page...");
                  await page.reload();
                } else {
                  // Handle other errors
                  logToTextarea("An error occurred:", error);
                }
              }
            logToTextarea("Go to " + keyword);
            await page.sleep(30000);
    
            await page.reload();
            await autoScroll(page, scrollmins, scrollmaxs, logToTextarea)
            // Cari tautan dengan teks tertentu
            //   const linkTextToFind = domain;
            const linkElement = await page.$x(`//a[contains(@href, "${domain}")]`);

            if (linkElement.length > 0) {
                // Klik tautan jika ditemukan
                await linkElement[0].click();
                logToTextarea('Tautan ditemukan dan diklik ✅');
                await page.sleep(30000);
                const proxyDetected = await page.evaluate(() => {
                  const proxyText = document.querySelector('body > a');
                  return proxyText && proxyText.innerText === 'Anonymous Proxy detected, click here.';
                });
              
                if (proxyDetected) {
                  logToTextarea("Site Ads : Anonymous Proxy detected, click here. ❌");
                  // await browser.close();
                  await closeClear(proxyC)
                }else{
                  logToTextarea("Site Ads : ✅");
                  // await page.reload();
                  await autoScrolladds(page, scrollminAdss, scrollmaxAdss, logToTextarea)
              }
            } else {
                logToTextarea('Tautan tidak ditemukan.');
            }           
        }

        if (linkAccounts) {
          await page.goto(baseUrl, {
            waitUntil: 'networkidle2',
            timeout: 60000
          })

          await checkErrorPage(logToTextarea)
          if (captchaApiKeys) {
              await page.solveRecaptchas()
          }
          await page.sleep(5000)

          const accept = await page.$('#L2AGLb');

          if (accept) {
              logToTextarea("Accept Found ✅");
              const bahasa = await page.$('#vc3jof');
              await bahasa.click();
              await page.waitForSelector('li[aria-label="‪English‬"]');
              await page.click('li[aria-label="‪English‬"]');
              await page.sleep(5000)
              const accept = await page.$('#L2AGLb');
              await accept.click()
          } else {
              logToTextarea("Accept Not Found ❌");
          }

          const search = await page.$('[name="q"]')
          await search.type(keyword, {
              delay: 60
          })
          await search.press('Enter');
          // const elements = await page.$$('input[name="btnK"]');
          // if (elements.length > 1) {
          //     const submit = elements[1];
          //     await submit.click();
          // }

          await page.sleep(5000)
          if (captchaApiKeys) {
              await page.solveRecaptchas()
          }

          await page.sleep(5000)

          logToTextarea('Find Article For ' + keyword);

          const startTime = Date.now();
          while (Date.now() - startTime < 10000) {
              await page.evaluate(() => {
                  window.scrollBy(0, 100);
              });
              await page.sleep(5000);
              await page.evaluate(() => {
                  window.scrollBy(0, -10);
              });
              await page.sleep(3000);
          }

          const hrefElements = await page.$$('[href]');
          const hrefs = await Promise.all(hrefElements.map(element => element.evaluate(node => node.getAttribute('href'))));

          let linkFound = false;

          for (const href of hrefs) {
              if (domain.includes(href)) {
                  logToTextarea("Article Found ✅");
                  try {
                      const element = await page.waitForXPath(`//a[@href="${href}"]`, {
                          timeout: 10000
                      });
                      await element.click();
                      linkFound = true;
                      break;
                  } catch (error) {
                      logToTextarea(`Error clicking the link: ${error}`);
                      break;
                  }
              }
          }

          if (!linkFound) {
              logToTextarea("Article Not Found ❌: " + domain);
              await closeClear(proxyC)
              return
          }

          await page.sleep(10000);

          await page.reload();
          await autoScroll(page, scrollmins, scrollmaxs, logToTextarea)
          await page.sleep(3000);
          const linkElement = await page.$x(`//a[contains(@href, "${anchor}")]`);

            if (linkElement.length > 0) {
                // Klik tautan jika ditemukan
                await linkElement[0].click();
                logToTextarea(anchor + ' ditemukan dan diklik ✅');
                await page.sleep(30000);
                const proxyDetected = await page.evaluate(() => {
                  const proxyText = document.querySelector('body > a');
                  return proxyText && proxyText.innerText === 'Anonymous Proxy detected, click here.';
                });
              
                if (proxyDetected) {
                  logToTextarea("Site Ads : Anonymous Proxy detected, click here. ❌");
                  // await browser.close();
                  await closeClear(proxyC)
                }else{
                  logToTextarea("Site Ads : ✅");
                  // await page.reload();
                  await autoScrolladds(page, scrollminAdss, scrollmaxAdss, logToTextarea)
              }
            } else {
                logToTextarea('Tautan tidak ditemukan.');
            } 
        }
       
        if (linkDirects) {
            try {
                await page.goto(keyword, { timeout: 10000 });
              } catch (error) {
                if (error.name === "TimeoutError") {
                  await page.reload();
                } else {
                  logToTextarea("An error occurred:", error);
                }
              }
            logToTextarea("Go to " + keyword);
            await autoScroll(page, scrollmins, scrollmaxs, logToTextarea)
            const linkElement = await page.$x(`//a[contains(@href, "${domain}")]`);

            if (linkElement.length > 0) {
                // Klik tautan jika ditemukan
                await linkElement[0].click();
                logToTextarea(domain + ' ditemukan dan diklik ✅');
                await page.sleep(30000);
                const proxyDetected = await page.evaluate(() => {
                  const proxyText = document.querySelector('body > a');
                  return proxyText && proxyText.innerText === 'Anonymous Proxy detected, click here.';
                });
              
                if (proxyDetected) {
                  logToTextarea("Site Ads : Anonymous Proxy detected, click here. ❌");
                  // await browser.close();
                  await closeClear(proxyC)
                }else{
                  logToTextarea("Site Ads : ✅");
                  await autoScrolladds(page, scrollminAdss, scrollmaxAdss, logToTextarea)
              }
            } else {
                logToTextarea('Tautan tidak ditemukan.');
            } 
        }
        if (tiktoks) {
          logToTextarea('tiktoks')
        }
        if (youtubes) {
            try {
                await page.goto(keyword, { timeout: 10000 });
              } catch (error) {
                if (error.name === "TimeoutError") {
                  await page.reload();
                } else {
                  logToTextarea("An error occurred:", error);
                }
              }
            logToTextarea("Go to " + keyword);
            try {
              const randomTimeout = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000
              await page.waitForTimeout(randomTimeout);
              logToTextarea("wait 5 to 10 seconds")
              await page.waitForTimeout(9000);
              const elSelector = "#invalid-token-redirect-goto-site-button";
              await page.waitForSelector(elSelector);
              await page.click(elSelector);
              await page.waitForTimeout(15000);
              await autoScrolladds(page, scrollminAdss, scrollmaxAdss, logToTextarea)
              logToTextarea("Site Ads : ✅");
            } catch (error) {
              logToTextarea("An error occurred:", error);
            }
            
        }
        if (instagrams) {
              try {
                await page.goto(keyword, { timeout: 10000 });
              } catch (error) {
                if (error.name === "TimeoutError") {
                  await page.reload();
                } else {
                  logToTextarea("An error occurred:", error);
                }
              }
            logToTextarea("Go to " + keyword);
            const randomTimeout = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000
            logToTextarea("wait 5 to 10 seconds")
            await page.waitForTimeout(randomTimeout);
            const buttonSelector = 'button.-cx-PRIVATE-Linkshim__followLink';
            await page.click(buttonSelector);
            await autoScrolladds(page, scrollminAdss, scrollmaxAdss, logToTextarea)

        }
        if (twitters) {
            try {
                await page.goto(keyword, { timeout: 50000 });
              } catch (error) {
                if (error.name === "TimeoutError") {
                  // sawait page.evaluate(() => window.stop());
                  await page.waitForTimeout(9000);
                  // await page.reload();
                } else {
                  logToTextarea("An error occurred:", error);
                }
              }
            logToTextarea("Go to " + keyword);
            await page.waitForTimeout(10000);
           await autoScrolladds(page, scrollminAdss, scrollmaxAdss, logToTextarea)
           logToTextarea('Twitter Done ✅')
        }
        if (snapcats) {
          logToTextarea('snapcats')
        }
        if (facebooks) {
            logToTextarea('facebooks')   
        }
        if (pinterests) {
          try {
            await page.goto(keyword, { timeout: 10000 });
          } catch (error) {
            if (error.name === "TimeoutError") {
              await page.evaluate(() => window.stop());
              await page.waitForTimeout(9000);
              await page.reload();
            } else {
              logToTextarea("An error occurred:", error);
            }
          }
          logToTextarea("Go to " + keyword);
          await autoScroll(page, scrollmins, scrollmaxs, logToTextarea)
          try {
            const elSelector = "#mweb-unauth-container > div > div.Jea.fZz.jzS.snW.wsz.zI7.iyn.Hsu > div.kKU.zI7.iyn.Hsu > div > div.hDW.zI7.iyn.Hsu > div > div > div:nth-child(2) > div > span > a";
            await page.waitForSelector(elSelector);
            await page.click(elSelector);
            await page.waitForTimeout(9000);
            const pages = await browser.pages(); 
            const lastPage = pages[2];
            await autoScrolladds(lastPage, scrollminAdss, scrollmaxAdss, logToTextarea)
            logToTextarea('Pinterest Berhasil! ✅');
          } catch (error) {
              logToTextarea('Terjadi kesalahan:', error);
          }
        }

        logToTextarea('Done');
        await closeClear(proxyC)
    } catch (error) {
        logToTextarea(error)
        await closeClear(proxyC)
    }
}

const closeClear = async (proxyC) => {
    if (proxyC) {
        await browser.close()
        // await proxyChain.closeAnonymizedProxy(newProxyUrl, true);
    } else {
        await browser.close()
    }
}

const checkErrorPage = async (logToTextarea, proxyC) => {
    const titles = await page.title();
    const bodyEl = await page.$('body');
    const bodyText = await page.evaluate(body => body.textContent, bodyEl);

    if (titles.includes("Error 403 (Forbidden)!!1")) {
        logToTextarea("Error Forbidden Page Close...");
        await closeClear(proxyC)
    } else if (bodyText.includes("This site can't be reached")) {
        logToTextarea("Error can't be reached");
        await closeClear(proxyC)
    }
}
async function autoScrollbawa(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100; // Jumlah piksel yang akan digulirkan setiap kali

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
}
async function autoScrollToTop(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = document.documentElement.scrollHeight;
      const distance = -100; // Menggulir ke atas dengan nilai negatif

      const timer = setInterval(() => {
        if (window.scrollY === 0) {
          clearInterval(timer);
          resolve();
        }
        window.scrollBy(0, distance);
      }, 100); // Interval waktu antara setiap pengguliran
    });
  });
}
async function autoScroll(page, scrollmins, scrollmaxs, logToTextarea) {
    const startTimes = Date.now();
    const minsc = scrollmins * 60;
    const maxsc = scrollmaxs * 60;
    const timess = Math.floor(Math.random() * (maxsc - minsc + 1)) + 60;
    const ttltimes = timess / 60;
    const numb = ttltimes.toString().slice(0,4)
    const rNumb = parseFloat(numb);
    logToTextarea("Scrolling page  for random range " + rNumb + " minute 🕐");
        while (Date.now() - startTimes < timess * 1000) {
            await page.evaluate(() => {
            window.scrollBy(0, 100);
        });
        await page.waitForTimeout(3000);
        await page.evaluate(() => {
            window.scrollBy(0, -10);
        });
        await page.waitForTimeout(3000);
    }
    logToTextarea('Scrolling page ✅')
}
async function autoScrolladds(page, scrollminAdss, scrollmaxAdss, logToTextarea) {
    const starttTimes = Date.now();
    const miscs = scrollminAdss * 60;
    const maxscs = scrollmaxAdss * 60;
    const ttimes = Math.floor(Math.random() * (maxscs - miscs + 1)) + 60;
    const cossfe = ttimes / 60;
    const numb = cossfe.toString().slice(0,4)
    const rNumb = parseFloat(numb);
    logToTextarea("Scrolling page adds for random range " + rNumb + " minute 🕐");
    while (Date.now() - starttTimes < ttimes * 1000) {
        await page.evaluate(() => {
        window.scrollBy(0, 100);
        });
        await page.waitForTimeout(3000);
        await page.evaluate(() => {
            window.scrollBy(0, -10);
        });
        await page.waitForTimeout(3000);
    }
    logToTextarea('Scrolling page adds ✅')
}


const getipsaya = async (logToTextarea, proxyC) => {
  try {
      await page.goto(ipSaya, {
          waitUntil: "networkidle2",
          timeout: 60000
      });
      try {
        await page.waitForTimeout(10000);
        await page.waitForSelector("body > div.fc-consent-root > div.fc-dialog-container > div.fc-dialog.fc-choice-dialog > div.fc-choice-dialog-header > button", {timeout: 10000,});
        await page.click("body > div.fc-consent-root > div.fc-dialog-container > div.fc-dialog.fc-choice-dialog > div.fc-choice-dialog-header > button");
        logToTextarea('Pop up Found ✅');
      } catch (error) {
        logToTextarea('No pop up');
      }
      await page.waitForSelector("body");

      const accept = await page.$(".fc-button");
      accept && (await accept.click());

      await page.waitForSelector('input[id="btn-submit"]', {
          timeout: 60000,
      });

      const data = await page.$('input[id="btn-submit"]');
      data && (await data.click());
      await page.waitForTimeout(40000);

      const datas = await page.$$('[name="btn-submit"]');
      datas.length > 0 && (await datas[0].click());
      await page.waitForTimeout(10000);
      const getPrx = await page.$('#submit-control')
      const resultPrx = await page.evaluate((e) => e.innerText, getPrx);
      const splitPrx = resultPrx.split('-')[0]
      const note = resultPrx.split(',')[0]
      const stringPrx = splitPrx.toString();
      await page.sleep(timeout)
      if (stringPrx !== "TIDAK ") {
          logToTextarea('IP yang anda gunakan terindikasi menggunakan VPN atau Proxy Closing browser and retrying... ❗');
          await closeClear(proxyC)
      }else{
          logToTextarea(note)
      }
      
      
  } catch (error) {
      logToTextarea(error)
      await closeClear(proxyC)
  }
};

const getIp = async (logToTextarea, proxyC) => {
    try {
        await page.goto(ipUrl, {
            waitUntil: "networkidle2",
            timeout: 60000
        });

        const title = await page.title();

        if (title !== "Find and check IP address") {
            logToTextarea('Error Reloading...');
            await page.reload()
        }

        const getIp = await page.$(
            "#main > section.section_main.section_user-ip.section > div > div > div > div.main-ip-info__ip > div > strong"
        );
        const resultIp = await page.evaluate((el) => el.innerText, getIp);
        const getDevice = await page.$(
            "#main > section.section_main.section_user-ip.section > div > div > div > div.row.main-ip-info__ip-data > div:nth-child(1) > div:nth-child(3) > div.ip-data__col.ip-data__col_value"
        );
        const resultDevice = await page.evaluate(
            (el) => el.innerText,
            getDevice
        );

        const getBrowser = await page.$("#main > section.section_main.section_user-ip.section > div > div > div > div.row.main-ip-info__ip-data > div:nth-child(1) > div:nth-child(4) > div.ip-data__col.ip-data__col_value");
        const resultBrowser = await page.evaluate(
            (el) => el.innerText,
            getBrowser
        );

        const getCountry = await page.$('[data-fetched="country_name"]');
        const resultCountry = await page.evaluate(
            (el) => el.innerText,
            getCountry
        );

        let browcer;
        if (resultBrowser.includes('Hide')) {
            browcer = resultBrowser.replace('Hide', '')
        } else if (resultBrowser.includes('Protect')) {
            browcer = resultBrowser.replace('Protect', '')
        } else if (resultBrowser.includes('Protected')) {
            browcer = resultBrowser.replace('Protected', '')
        }

        const line = browcer.split('\n')
        const nonEmptyLines = line.filter(line => line.trim() !== '');
        const resultString = nonEmptyLines.join('\n');

        const getPercent = await page.$("#hidden_rating_link");
        const resultPercent = await page.evaluate(
            (el) => el.innerText,
            getPercent
        );
        const zonedata = await page.evaluate(() => {
            const elements = document.querySelectorAll('.card__col.card__col_value.matched.highlighted_red');
            if (elements.length > 0) {
              return elements[0].innerText.trim();
            } else {
              return null;
            }
          });
        const localdata = await page.evaluate(() => {
            const elements = document.querySelectorAll('.card__col.card__col_value.matched.highlighted_red');
            if (elements.length > 0) {
              return elements[1].innerText.trim();
            } else {
              return null;
            }
          });
          const systemdata = await page.evaluate(() => {
            const elements = document.querySelectorAll('.card__col.card__col_value.matched.highlighted_red');
            if (elements.length > 0) {
              return elements[2].innerText.trim();
            } else {
              return null;
            }
          });

        await page.sleep(timeout)
        if (resultPercent !== "Your disguise: 90%" &&  resultPercent !== "Your disguise: 100%") {
            logToTextarea('The Percentage is under 90%. Closing browser and retrying... ❗');
            await closeClear(proxyC)
        } else {
            logToTextarea("\nDetails IP : " + resultIp)
            logToTextarea("Percent : " + resultPercent)
            logToTextarea("Country : " + resultCountry)
            logToTextarea("Device : " + resultDevice)
            logToTextarea("Browser : " + resultString)
            logToTextarea("Zone: " + zonedata)
            logToTextarea("Local Time: " + localdata)
            logToTextarea("System Time: " + systemdata + '\n')
            
        }
    } catch (error) {
        logToTextarea(error)
        await closeClear(proxyC)
    }
};
// Fungsi untuk mengambil semua tautan dari halaman
async function getAdds1(logToTextarea, scrollminAdss, scrollmaxAdss) {
    try {
      await page.waitForSelector('iframe');
      const iframes = await page.$$('iframe');
      const iframePertama = iframes[iframes.length - 1];
      const frame = await iframePertama.contentFrame();
      await frame.waitForSelector(':first-child');
      const el = await frame.$(':first-child');
      await frame.waitForSelector("body > div > div > a");
      const acc = await el.$("body > div > div > a");
      await acc.click();
      const pages = await browser.pages(); 
      const lastPage = pages[2];
      await autoScrolladds(lastPage, scrollminAdss, scrollmaxAdss, logToTextarea)
      logToTextarea("Pop Up 1 Found ✅");
    } catch (error) {
      await page.waitForSelector('iframe');
      const iframes = await page.$$('iframe');
      const iframePertama = iframes[iframes.length - 1];
      const frame = await iframePertama.contentFrame();
      await frame.waitForSelector(':first-child');
      const el = await frame.$(':first-child');
      await frame.waitForSelector("#a1");
      const acc = await el.$("#a1");
      await acc.click();
      const pages = await browser.pages(); 
      const lastPage = pages[2];
      await autoScrolladds(lastPage, scrollminAdss, scrollmaxAdss, logToTextarea)
      logToTextarea("Pop Up 2 Found ✅");
    }
}
async function getAdds2(logToTextarea, scrollminAdss, scrollmaxAdss) {
  try {
    await page.waitForSelector('iframe');
    const iframes = await page.$$('iframe');
    const iframePertama = iframes[iframes.length - 1];
    const frame = await iframePertama.contentFrame();
    await frame.waitForSelector(':first-child');
    const el = await frame.$(':first-child');
    await frame.waitForSelector("#a1");
    const acc = await el.$("#a1");
    await acc.click();
    const pages = await browser.pages(); 
    const lastPage = pages[2];
    await autoScrolladds(lastPage, scrollminAdss, scrollmaxAdss, logToTextarea)
    logToTextarea("Pop Up 2 Found ✅");
  } catch (error) {
    logToTextarea('Pop Up 2 Not Found ❌')
  }

}
async function noAdds(logToTextarea) {
  try {
    await page.waitForSelector('iframe');
    const iframes = await page.$$('iframe');
    const iframePertama = iframes[iframes.length - 1];
    const frame = await iframePertama.contentFrame();
    await frame.waitForSelector(':first-child');
    const el = await frame.$(':first-child');
    await frame.waitForSelector("body > div > div > div.pl-d5f79a10041a731c9e69836d9eb5f241__closelink");
    const acc = await el.$("body > div > div > div.pl-d5f79a10041a731c9e69836d9eb5f241__closelink");
    await acc.click();
    logToTextarea("Close Up 1 Found ✅");
  } catch (error) {
    logToTextarea('Close Up 1 Not Found ❌')
  }
} 
async function no2Adds(logToTextarea) {
  try {
    await noAdds(logToTextarea)
    logToTextarea("Close Up 1 Found ✅");
  } catch (error) {
    await page.waitForSelector('iframe');
    const iframes = await page.$$('iframe');
    const iframePertama = iframes[iframes.length - 1];
    const frame = await iframePertama.contentFrame();
    await frame.waitForSelector(':first-child');
    const el = await frame.$(':first-child');
    await frame.waitForSelector("body > div > div > div > aside > div > div.pl-d5f79a10041a731c9e69836d9eb5f241__closelink");
    const acc = await el.$("body > div > div > div > aside > div > div.pl-d5f79a10041a731c9e69836d9eb5f241__closelink");
    await acc.click();
    logToTextarea("Close Up 1 Found ✅");
  }
}
async function popunderAdds(logToTextarea, scrollminAdss, scrollmaxAdss) {
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
    await page.waitForTimeout(9000);
    const pages = await browser.pages(); 
    const selectedPage = pages[1];
    await selectedPage.click('selector');
    await page.waitForTimeout(9000);
    logToTextarea("Close Pop Up 1 Found ✅");
  } catch (error) {
    logToTextarea('Close pop up 1 Not Found ❌');
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
    await page.waitForTimeout(9000);
    const pages = await browser.pages(); 
    const selectedPage = pages[1];
    await selectedPage.click('selector');
    await page.waitForTimeout(9000);
    logToTextarea("Close Pop Up 2 Found ✅");
  } catch (error) {
    logToTextarea('Close pop up 2 Not Found ❌');
  }
  try {
    await page.waitForTimeout(9000);
    const asfd = await page.$("#categories-3 > ul > li.cat-item.cat-item-36 > a");
    await asfd.click();
    await page.waitForTimeout(9000); 
    const pages = await browser.pages(); 
    const lastPage = pages[2];
    await autoScrolladds(lastPage, scrollminAdss, scrollmaxAdss, logToTextarea)
    logToTextarea("Kilik pop under Found✅"); 
  } catch (error) {
    logToTextarea('Kilik pop under Not Found❌');
  }
}

const main = async (logToTextarea, keywordFilePath, pageArticles, banners, linkAccounts, artikels, proxyC, proxys, desktops, androids, iphones, randoms, whoers, view, recentPosts, loops, scrollmins, scrollmaxs, scrollminAdss, scrollmaxAdss, googlebanners, tiktoks, youtubes, instagrams, twitters, snapcats, ipsayas, captchaApiKeys, linkDirects, facebooks, popups, pinterests, popunders, sequences , tablets) => {
    try {
        const data = fs.readFileSync(keywordFilePath, 'utf-8')
        const lines = data.split('\n');
        let threadCount = 0;
        for (let x = 0; x < loops; x++) {
            logToTextarea("Loop " + x);
            logToTextarea("\n===========================");
            
            for (let y = 0; y < lines.length; y++) {
              threadCount++; 
                const line = lines[y];
                const [keyword, domain, anchor ] = line.trim().split(';');
                logToTextarea("Thread #" + (y + 1));
                await startProccess(keyword, domain, anchor, logToTextarea, pageArticles, banners, linkAccounts, artikels, proxyC, proxys, desktops, androids, iphones, randoms, whoers, view, recentPosts, loops, scrollmins, scrollmaxs, scrollminAdss, scrollmaxAdss, googlebanners, tiktoks, youtubes, instagrams, twitters, snapcats, ipsayas, captchaApiKeys, linkDirects, facebooks, popups, pinterests, popunders, sequences, threadCount , tablets);
                if (stopFlag) {
                    logToTextarea("Stop the proccess success")
                    break
                }
                logToTextarea("\n===========================");
            }
            if (stopFlag) {
                break
            }
        }
    } catch (error) {
        logToTextarea(error)
    }
}
const stopProccess = (logToTextarea) => {
    stopFlag = true;
    logToTextarea("Stop Proccess, waiting until this proccess done")
}

module.exports = {
    main, stopProccess
}