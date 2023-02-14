const request = require('request-promise')

const verifyRecaptcha = async (response) => {
  const options = {
    method: 'POST',
    uri: 'https://www.google.com/recaptcha/api/siteverify',
    formData: {
      secret: process.env.SECRET_KEY,
      response
    },
    json: true
  }

  try {
    const response = await request(options)
    return response.success
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports.verifyRecaptcha = verifyRecaptcha
