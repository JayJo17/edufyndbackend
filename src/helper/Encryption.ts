import * as crypto from "crypto";
import * as Config from "../config/Enviornment";
import * as CryptoJS from "crypto-js";

let password = "1234";
let conversionOutput: string;


export let hashPassword = async (text) => {
  console.log(text)
  return await new Promise((resolve, reject) => {
    const hash = crypto.createHmac("sha256", Config.SERVER.SALT);
    hash.update(text.toString());
    resolve(hash.digest("hex"));
  });
};

export let encrypt = (textToConvert) => {
  console.log("balan", textToConvert)
  return (conversionOutput = CryptoJS.AES.encrypt(
    textToConvert.trim(),
    password.trim()
  ).toString());
  console.log("ddf",conversionOutput)
};


export let decrypt = (textToConvert) => {
  console.log("decryp balan", textToConvert)
  return (conversionOutput = CryptoJS.AES.decrypt(
    textToConvert.trim(),
    password.trim()
  ).toString(CryptoJS.enc.Utf8));
};

