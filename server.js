require('dotenv').config()
const express = require('express')
const app = express()
const verifyRecaptcha = require('./recaptcha').verifyRecaptcha

app.set('view engine', 'pug')
app.use(express.urlencoded())

app.get('/', (req, res) => {
  const recaptchSiteKey = process.env.SITE_KEY
  res.render('index', { recaptchSiteKey })
})

app.post('/submit-form', async (req, res) => {
  const recaptchaResponse = req.body['g-recaptcha-response']
  const isRecaptchaValid = await verifyRecaptcha(recaptchaResponse)
  if (!isRecaptchaValid) {
    return res.status(400).send('reCAPTCHA verification failed')
  } else {
    res.send('you are good to go')
  }
})

app.listen(8888, () => console.log('listening on 8888'))
