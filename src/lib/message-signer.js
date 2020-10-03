export default class MessageSigner {
  constructor(personalAPI) {
    this.personalAPI = personalAPI;
  }

  async sign(address, message) {
    return new Promise((resolve, reject) => {
      this.personalAPI.sign(message, address, async (error, signature) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(signature);
      });
    });
  }
}
