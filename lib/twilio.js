const twilio = require('twilio');

let twilioClient = {
  /**
   * Establishes the connection to Twilio
   */
  getTwilioClient() {
    if (!this.client) {
      try {
        this.client = twilio(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_TOKEN,
          {
            lazyLoading: true,
          }
        );
      } catch (err) {
        console.log(`Can't connect to Twilio - ${err}`);
        process.exit(1);
      }
    }
  },

  /**
   * Sends a verification code to the provided phone number
   * @param  {String} phone
   * @return {Promise}
   */
  requestVerification(phone) {
    return this.client.verify
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: phone, channel: 'sms' })
      .then((verification) => console.log(verification.status));
  },

  /**
   * Verifies the code reached the correct phone number
   * @param  {String}  phone
   * @param  {Integer} code
   * @return {Promise}
   */
  verify(phone, code) {
    return this.client.verify
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: phone, code })
      .then((verification_check) => {
        console.log(verification_check.status);

        if (verification_check.status === 'approved') {
          return Promise.resolve(verification_check);
        } else {
          return Promise.reject({
            message: 'Verification code was not approved.',
          });
        }
      });
  },
};

twilioClient.getTwilioClient();
module.exports = twilioClient;
