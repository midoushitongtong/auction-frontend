const OSS = require('ali-oss');
const Base64 = require('js-base64').Base64;
const config = require('../config');

module.exports = {
  /**
   * 获取 oss token
   *
   * @param ctx
   */
  async selectStsToken(ctx) {
    let STS = OSS.STS;
    let sts = new STS({
      accessKeyId: config.ossAccountInfo.accessKeyId,
      accessKeySecret: config.ossAccountInfo.accessKeySecret,
    });

    try {
      // 请求阿里云获取临时的 token
      const stsToken = await sts.assumeRole(
        config.ossAccountInfo.roleArn,
        null,
        60 * 15,
        'sts-token');

      const responseData = {
        // 将 region 和 bucket 一并返回
        region: config.ossAccountInfo.region,
        bucket: config.ossAccountInfo.bucket,
        // 将 sts token 返回
        accessKeyId: stsToken.credentials.AccessKeyId,
        accessKeySecret: stsToken.credentials.AccessKeySecret,
        expiration: stsToken.credentials.Expiration,
        securityToken: stsToken.credentials.SecurityToken
      };

      // 返回 base64 数据
      ctx.body = {
        code: 0,
        data: Base64.encodeURI(JSON.stringify(responseData))
      };
    } catch (e) {
      ctx.body = {
        code: 1,
        data: e
      };
    }
  }
};
