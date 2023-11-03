const {
  ipcRenderer
} = require('electron');
const startButton = document.getElementById('startBot');
const stopButton = document.getElementById('stop');
const pageArticle  = document.getElementById('page_article');
const banner = document.getElementById('banner');
const linkAccount = document.getElementById('link_account');
const artikel = document.getElementById('artikel');
const keywordFileInput = document.getElementById('keywordFile');
const proxyCheckBox = document.getElementById("proxyC")
const proxy = document.getElementById("proxy")
const desktop = document.getElementById('desktop');
const android = document.getElementById('android');
const iphone = document.getElementById('iphone');
const random = document.getElementById('random');
const whoer = document.getElementById('whoer');
const headlessCheckbox = document.getElementById('headless');
const recentPost = document.getElementById('recent_post');
const loop = document.getElementById('loop');
const scrollmin = document.getElementById('scrollmin');
const scrollmax = document.getElementById('scrollmax');
const scrollminAds = document.getElementById('scrollminAds');
const scrollmaxAds = document.getElementById('scrollmaxAds');

document.addEventListener('change', () => {
  if (proxyCheckBox.checked) {
    proxy.disabled=false
  } else {
    proxy.disabled=true
    
  }
})


startButton.addEventListener('click', () => {
  const keywordFilePath = keywordFileInput.files[0]?.path;
  if (keywordFilePath == undefined) {
    keywordFileInput.style.border = '1px solid red'
    return;
  } 

  const pageArticles = pageArticle.checked
  const banners = banner.checked
  const linkAccounts = linkAccount.checked
  const artikels = artikel.checked
  const proxyC = proxyCheckBox.checked
  const proxys = proxy.value
  const desktops = desktop.checked
  const androids = android.checked
  const iphones = iphone.checked
  const randoms = random.checked
  const whoers = whoer.checked
  const view = headlessCheckbox.checked ? false : 'new';
  const recentPosts = recentPost.checked
  const loops = loop.value
  const scrollmins = scrollmin.value
  const scrollmaxs = scrollmax.value
  const scrollminAdss = scrollminAds.value
  const scrollmaxAdss = scrollmaxAds.value
  
  ipcRenderer.send('button-click', keywordFilePath, pageArticles, banners, linkAccounts, artikels, proxyC, proxys, desktops, androids, iphones, randoms, whoers, view, recentPosts, loops, scrollmins, scrollmaxs, scrollminAdss, scrollmaxAdss);
});
stopButton.addEventListener('click', () => {
  if (confirm("Realy want to stop the proccess ?") == true) {
      ipcRenderer.send('stop');
  }
});

reload.addEventListener('click', () => {
  ipcRenderer.send('reload')
})

ipcRenderer.on('log', (event, logs) => {
  const logTextarea = document.getElementById('log');
  logTextarea.value = logs;
  logTextarea.scrollTop = logTextarea.scrollHeight;
});


const all =[
pageArticle,
banner,
linkAccount,
artikel,
keywordFileInput,
proxyCheckBox,
proxy,
desktop,
android,
iphone,
random,
whoer,
headlessCheckbox,
recentPost,
loop,
scrollmin,
scrollmax,
scrollminAds,
scrollmaxAds,
]

ipcRenderer.on('run',()=>{
  all.forEach((e)=>{
    e.disabled=true
  })
})
ipcRenderer.on('foor',()=>{
  all.forEach((e)=>{
    e.disabled=false
  })
})