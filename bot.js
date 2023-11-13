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

let browser;
let page;
let newProxyUrl;
let stopFlag = false

const startProccess = async (keyword, domain, anchor, logToTextarea, pageArticles, banners, linkAccounts, artikels, proxyC, proxys, desktops, androids, iphones, randoms, whoers, view, recentPosts, loops, scrollmins, scrollmaxs, scrollminAdss, scrollmaxAdss, googlebanners, tiktoks, youtubes, instagrams, twitters, snapcats, ipsayas, captchaApiKeys, linkDirects, facebooks) => {
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
    const se = proxys.split('\n')
    const randomProxyInfo = se[Math.floor(Math.random() * se.length)];
    const trims = randomProxyInfo.trim()
    reachedproxy = [host, port, username, password] = trims.split(":")
 rproxy = `${reachedproxy[0]}:${reachedproxy[1]}`
 logToTextarea('proxy : ' + reachedproxy[0])
}
    const options = {
        ignoreHTTPSErrors: true,
        defaultViewport: null,
        args: [
            proxyC ? `--proxy-server=${rproxy}` : null,
            `--load-extension=${spoof}`,
            // `--disable-extensions-except=${spoof}`,
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
   
    const UserAgent = require('user-agents')  
    if (desktops) {
        const userAgent = new UserAgent({
            deviceCategory:  'desktop'
        });
        await page.setUserAgent(userAgent.toString());
    }else if (androids) {
        const randomAgent = randomListAndroid();
        await page.setUserAgent(randomAgent);
    }else if (iphones) {
        const userAgent = new UserAgent({ platform: 'iPhone' });
        await page.setUserAgent(userAgent.toString());
    }else if (randoms) {
        const userAgent = new UserAgent().random();
        await page.setUserAgent(userAgent.toString());
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
                await page.evaluate(() => window.stop());
                } else {
                  logToTextarea("An error occurred:", error);
                }
            }
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
              
              // await page.reload();
              await autoScroll(page, scrollmins, scrollmaxs, logToTextarea)
          }
          const iframes = await page.$$('iframe:not(:first-child):not(:last-child)');
          if (iframes.length > 0) {
              const randomIndex = Math.floor(Math.random() * iframes.length);
              const randomIframe = iframes[randomIndex];
              
              await randomIframe.click();
              logToTextarea("Klik Banner Found ✅");
              const pages = await browser.pages(); 
              const lastPage = pages[pages.length - 1];
              await autoScrolladds(lastPage, scrollminAdss, scrollmaxAdss, logToTextarea)

          } else {
              logToTextarea("Tidak ada benner yang sesuai ditemukan.");
          }
        }
       
        if (banners) {
            try {
                await page.goto(keyword, { timeout: 30000 });
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
                // await page.reload();
                await autoScroll(page, scrollmins, scrollmaxs, logToTextarea)
            }
            const iframes = await page.$$('iframe:not(:first-child):not(:last-child)');
            const validIframes = await Promise.all(
                iframes.map(async (iframe) => {
                const style = await iframe.evaluate((el) => el.getAttribute('style'));
                if (!style || !style.includes('width:1px;height:1px;display:none;')) {
                    return iframe;
                }
                })
            );
  
            // Jika ada iframe yang sesuai, pilih secara acak satu dari mereka
            if (validIframes.length > 0) {
                const randomIndex = Math.floor(Math.random() * validIframes.length);
                const randomIframe = validIframes[randomIndex];
                await randomIframe.click();
                logToTextarea("Klik Banner Found ✅");
                
                

                const startTimes = Date.now();
                const minsc = scrollminAdss * 60;
                const maxsc = scrollmaxAdss * 60;
                const timess = Math.floor(Math.random() * (maxsc - minsc + 1)) + 60;
                const ttltimes = timess / 60;
                const numb = ttltimes.toString().slice(0,4)
                const rNumb = parseFloat(numb);
                logToTextarea("Scrolling page Banner article for random range " + rNumb + " minute 🕐");
                const pages = await browser.pages(); 
                
                const lastPage = pages[pages.length - 1];
                await autoScrollbawa(lastPage);
                await autoScrollToTop(lastPage);
                await page.sleep(5000);
                while (Date.now() - startTimes < timess * 1000) {
                    await lastPage.evaluate(() => {
                        window.scrollBy(0, 100);
                    });
                    await lastPage.waitForTimeout(5000);  // Tunggu selama 5 detik
                    await lastPage.evaluate(() => {
                        window.scrollBy(0, -10);
                    });
                    await lastPage.waitForTimeout(5000);  // Tunggu selama 5 detik
                }

            } else {
                logToTextarea("Tidak ada benner yang sesuai ditemukan.");
            }

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
            await page.evaluateOnNewDocument(() => {
                document.addEventListener('click', (event) => {
                  const targetElement = event.target.closest('a[target="_blank"]');
                  if (targetElement) {
                    event.preventDefault();
                    window.location.href = targetElement.getAttribute('href');
                  }
                });
            });
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
            if (desktops) {
                const acceptSus = await page.evaluate(() => {
                    const element = document.querySelector(
                        "#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.eom-buttons.style-scope.ytd-consent-bump-v2-lightbox > div:nth-child(1) > ytd-button-renderer:nth-child(2) > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"
                    );
                    return element && typeof element.click === "function";
                });
                try {
                        await page.waitForSelector('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.eom-buttons.style-scope.ytd-consent-bump-v2-lightbox > div:nth-child(1) > ytd-button-renderer:nth-child(2) > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill')
                    } catch (error) {
                        log(error)

                        await browser.close();
                    }
                    await page.click('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.eom-buttons.style-scope.ytd-consent-bump-v2-lightbox > div:nth-child(1) > ytd-button-renderer:nth-child(2) > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill')
            }else{
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
            }
            await page.sleep(3000);
            await autoScroll(page, scrollmins, scrollmaxs, logToTextarea)
    
            if (desktops) {
                await page.waitForSelector('tp-yt-paper-button#expand');
                await page.click('tp-yt-paper-button#expand');
                logToTextarea(domain)
                await page.sleep(3000);
                await page.waitForXPath(`//*[text()="${domain}"]`);


                const elements = await page.$x(`//*[text()="${domain}"]`);

                if (elements.length > 0) {
                    await elements[0].click();
                }
                await page.sleep(10000);
                const pages = await browser.pages(); 
                const lastPage = pages[pages.length - 1];
                await lastPage.close();
                await autoScrolladds(page, scrollminAdss, scrollmaxAdss, logToTextarea)
                
                
            }else {
                await page.waitForSelector('button[class="slim-video-information-show-more"]')
                const more = await page.$('button[class="slim-video-information-show-more"]')
                more && await more.click()
                await page.waitForTimeout(2000); 

                const link = await page.$$('a')
                    if (link.length > 2) {
                        await page.evaluate((e) => e.click(), link[2]);
                }
                await autoScrolladds(page, scrollminAdss, scrollmaxAdss, logToTextarea)
            }
            
        }
        if (instagrams) {
            await page.evaluateOnNewDocument(() => {
                document.addEventListener('click', (event) => {
                  const targetElement = event.target.closest('a[target="_blank"]');
                  if (targetElement) {
                    event.preventDefault();
                    window.location.href = targetElement.getAttribute('href');
                  }
                });
            });
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
                await page.waitForSelector('.x9f619');
                await page.click('.x9f619 button');
                logToTextarea('Button Allow all cookies Found ✅')
            } catch (error) {
                logToTextarea('Button Allow all cookies Not Found ❌')
            }
            await autoScroll(page, scrollmins, scrollmaxs, logToTextarea)
            
            await page.waitForXPath(`//*[text()="${domain}"]`);
            const elements = await page.$x(`//*[text()="${domain}"]`);
            if (elements.length > 0) {
                await elements[0].click()
            }
            await page.sleep(10000);
            try {
                const learn = await page.$$('a')
                if (learn.length > 3) {
                    await page.evaluate((e) => e.click(), learn[3])
                    await page.waitForSelector("#explanation")
                    await page.click('#explanation > p > a')
                }
            } catch (error) {
                logToTextarea("Problem With This Link Not Found ❌")
            }
            const pages = await browser.pages(); 
            const lastPage = pages[pages.length - 1];
            await lastPage.close();
            await autoScrolladds(page, scrollminAdss, scrollmaxAdss, logToTextarea)

        }
        if (twitters) {
            await page.evaluateOnNewDocument(() => {
                document.addEventListener('click', (event) => {
                  const targetElement = event.target.closest('a[target="_blank"]');
                  if (targetElement) {
                    event.preventDefault();
                    window.location.href = targetElement.getAttribute('href');
                  }
                });
            });
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
                await page.waitForSelector('[aria-label="Close"]');
                await page.click('[aria-label="Close"]');
                logToTextarea('Pop Up Found ✅')
            } catch (error) {
                logToTextarea('Pop Up Not Found ❌')
            }
            await page.sleep(3000);
            await autoScroll(page, scrollmins, scrollmaxs, logToTextarea)
            try {
                await page.waitForSelector('[aria-label="Close"]');
                await page.click('[aria-label="Close"]');
                logToTextarea('Pop Up Found ✅')
            } catch (error) {
                logToTextarea('Pop Up Not Found ❌')
            }
            await page.sleep(3000);
            const linkElement = await page.$x(`//a[contains(@href, "${domain}")]`);
            if (linkElement.length > 0) {
              await linkElement[0].click();
            }
           await autoScrolladds(page, scrollminAdss, scrollmaxAdss, logToTextarea)
        //    logToTextarea('Twitter Done ✅')
        }
        if (snapcats) {
          logToTextarea('snapcats')
        }
        if (facebooks) {
            logToTextarea('facebooks')   
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
        await page.sleep(3000);
        await page.evaluate(() => {
            window.scrollBy(0, -10);
        });
        await page.sleep(3000);
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
        await page.sleep(3000);
        await page.evaluate(() => {
            window.scrollBy(0, -10);
        });
        await page.sleep(3000);
    }
    logToTextarea('Scrolling page adds ✅')
}


const getipsaya = async (logToTextarea, proxyC) => {
  try {
      await page.goto(ipSaya, {
          waitUntil: "networkidle2",
          timeout: 60000
      });
      await page.waitForSelector("body");

      const accept = await page.$(".fc-button");
      accept && (await accept.click());

      await page.waitForSelector('input[id="btn-submit"]', {
          timeout: 60000,
      });

      const data = await page.$('input[id="btn-submit"]');
      data && (await data.click());
      await page.waitForTimeout(3000);

      const datas = await page.$('[name="btn-submit"]');
      datas && (await datas.click());
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
async function getLinks(page) {
    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a'));
      return anchors.map(anchor => anchor.href);
    });
    return links;
  }
  
  // Fungsi untuk mengklik tautan secara acak
  async function clickRandomLink(page, links) {
    const randomIndex = Math.floor(Math.random() * links.length);
    const randomLink = links[randomIndex];
    await page.goto(randomLink);
  }
const main = async (logToTextarea, keywordFilePath, pageArticles, banners, linkAccounts, artikels, proxyC, proxys, desktops, androids, iphones, randoms, whoers, view, recentPosts, loops, scrollmins, scrollmaxs, scrollminAdss, scrollmaxAdss, googlebanners, tiktoks, youtubes, instagrams, twitters, snapcats, ipsayas, captchaApiKeys, linkDirects, facebooks) => {
    try {
        const data = fs.readFileSync(keywordFilePath, 'utf-8')
        const lines = data.split('\n');

        for (let x = 0; x < loops; x++) {
            logToTextarea("Loop " + x);
            logToTextarea("\n===========================");

            for (let y = 0; y < lines.length; y++) {
                const line = lines[y];
                const [keyword, domain, anchor ] = line.trim().split(';');

                logToTextarea("Thread #" + (y + 1));
                await startProccess(keyword, domain, anchor, logToTextarea, pageArticles, banners, linkAccounts, artikels, proxyC, proxys, desktops, androids, iphones, randoms, whoers, view, recentPosts, loops, scrollmins, scrollmaxs, scrollminAdss, scrollmaxAdss, googlebanners, tiktoks, youtubes, instagrams, twitters, snapcats, ipsayas, captchaApiKeys, linkDirects, facebooks);
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