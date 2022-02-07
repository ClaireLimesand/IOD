const axios = require('axios');

 const notifyWebhook = async (url, body) => {
    const res = await axios
      .post(url, body, {
        Accept: "application/json",
        "Content-Type": "application/json"
      })
}

module.exports  = notifyWebhook;