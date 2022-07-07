const express = require('express')
const app = express()
const puppeteer = require('puppeteer')
const port = process.env.PORT || 8085
const delay = require('delay')

app.get('/', function (req, res) {
  ;(async () => {
    var urlToActivate = 'https://www.instagram.com/accounts/login/'

    console.log('Lunching: ' + urlToActivate)
    const browser = await puppeteer.launch({
      // Chrome
      //   executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome',

      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    })

    const page = await browser.newPage()
    await page.goto(urlToActivate, {
      waitUntil: 'networkidle2',
    })
    console.log('getting logging in page')
    await delay(5000)
    await page.waitForSelector("[name='username']")
    await page.type("[name='username']", 'your-username')

    await delay(5000)

    // password

    await page.keyboard.down('Tab')
    await page.keyboard.type('your-password')

    await delay(5000)

    console.log('logging to amr_aboras')

    await page.evaluate(() => {
      const btns = [...document.querySelector('.HmktE').querySelectorAll('button')]
      btns.forEach(function (btn) {
        if (btn.innerText === 'Log In') {
          btn.click()
        }
      })
    })

    await delay(15000)
  })()
})
app.listen(port, function () {
  console.log('App listening on port ' + port)
})
