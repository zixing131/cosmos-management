import request from "superagent";
import wechat from "../config/wechat";
import axios from "axios";
import moment from "moment";
import AliOSS from "ali-oss";
import config from "../config/default";

const aliyunConfig = config.aliyun;

const client = new AliOSS({
  region: aliyunConfig.OSSREGION, // Redis port
  accessKeyId: aliyunConfig.ACCESSKEYID, // Redis host
  accessKeySecret: aliyunConfig.ACCESSKEYSECRET, // 4 (IPv4) or 6 (IPv6)
  bucket: aliyunConfig.OSSBUCKET
});

const urlEncode = (param, key, encode) => {
  if (param == null) return "";
  var paramStr = "";
  var t = typeof param;
  if (t == "string" || t == "number" || t == "boolean") {
    paramStr +=
      "&" +
      key +
      "=" +
      (encode == null || encode ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k =
        key == null
          ? i
          : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};

const getBindQrcode = async (redirectPath, scene = {}) => {
  let { accessTokenUrl, getWxaCodeUnlimit, appId, secret } = wechat;
  let query = urlEncode(scene);
  if (query[0] && query[0] == "&") query = query.substr(1, query.length);
  return new Promise((resolve, reject) => {
    request
      .get(accessTokenUrl)
      .query({
        appId,
        grant_type: "client_credential",
        secret
      })
      .end((err, res) => {
        if (err) {
          reject(err);
        }
        let { errcode, errmsg, access_token, expires_in } = JSON.parse(
          res.text
        );
        if (errcode && errmsg) {
          reject(errmsg);
        }
        if (access_token) {
          request
            .post(getWxaCodeUnlimit + "?access_token=" + access_token)
            .set("Content-Type", "application/json")
            .send({
              path: redirectPath || "pages/index/index",
              scene: query
            })
            .end((error, resp) => {
              if (error) {
                reject(error);
              }
              console.log(error);
              if (resp && resp.text) {
                const isError = resp.text.indexOf("errcode") >= 0;
                let { errmsg } = JSON.parse(resp.text);
                reject(errmsg);
              } else {
                const imagePrefix = "data:image/jpeg;base64,";
                // console.log(imagePrefix)
                // console.log(resp.body)
                // const buffer = new Buffer(resp.body)
                const image = imagePrefix + resp.body.toString("base64");
                // console.log(image)
                // resolve(image);
                resolve({
                  path: redirectPath,
                  qrcode: image,
                  scene: query
                });
              }
            });
        }
      });
  });
};

const getQrcode = async (redirectPath, scene = "") => {
  const { accessTokenUrl, getWxaCodeUnlimit, appId, secret } = wechat;
  const info = await request.get(accessTokenUrl).query({
    appId,
    grant_type: "client_credential",
    secret
  });

  let { access_token } = JSON.parse(info.text);
  // if (!access_token) {
  //   // ctx.logger.error(qrcodeInfo.errmsg);
  //   ctx.throw(405, "获取二维码失败");
  // }
  const res = await axios({
    method: "post",
    url: getWxaCodeUnlimit + "?access_token=" + access_token,
    data: JSON.stringify({
      page: 'pages/tips/index',
      scene
    }),
    responseType: "arraybuffer"
  });
  /**
   * 错误处理
   */

  const date = moment();
  const time = "" + date.format("YYYY") + date.format("MM") + date.format("DD");
  const filePath =
    "qrcode/" +
    time +
    "/" +
    Math.random()
      .toString(36)
      .substring(2);
  const newfile = filePath + ".png";

  const buffer = Buffer.from(res.data, "utf-8");
  const base64Str = buffer.toString("base64");

  const uploadInfo = await client.put(newfile, new Buffer(base64Str, "base64"));

  return {
    path: redirectPath,
    qrcode: "/" + newfile,
    url: uploadInfo.url,
    scene
  };
};

module.exports = {
  getBindQrcode: getQrcode
};
