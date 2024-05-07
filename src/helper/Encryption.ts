import * as crypto from "crypto";
import * as Config from "../config/Enviornment";
import * as CryptoJS from "crypto-js";

let password = "1234";
let conversionOutput: string;

/**
 * @author Ponjothi S  
 * @date  14-11-2022
 * @description This function return password encryption.
 * @param {String} text
 */
export let hashPassword = async (text) => {
  console.log(text)
  return await new Promise((resolve, reject) => {
    const hash = crypto.createHmac("sha256", Config.SERVER.SALT);
    hash.update(text.toString());
    resolve(hash.digest("hex"));
  });
};

/**
 * @author Ponjothi S
 * @date  14-11-2022
 * @description This function return decrypted item for given encryption using cryptojs
 * @param {String} encrypted
 */
export let encrypt = (textToConvert) => {
  console.log("balan", textToConvert)
  return (conversionOutput = CryptoJS.AES.encrypt(
    textToConvert.trim(),
    password.trim()
  ).toString());
  console.log("ddf",conversionOutput)
};

/**
 * @author Ponjothi S
 * @date  14-11-2022
 * @description This function return encrypted item for given string using cryptojs
 * @param {String} text
 */
export let decrypt = (textToConvert) => {
  console.log("decryp balan", textToConvert)
  return (conversionOutput = CryptoJS.AES.decrypt(
    textToConvert.trim(),
    password.trim()
  ).toString(CryptoJS.enc.Utf8));
};

