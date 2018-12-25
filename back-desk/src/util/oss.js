import { notification } from 'antd';
import { Base64 } from 'js-base64';
import api from '../api';

export default {
  /**
   * 查询 oss sts token
   *
   * @returns {Promise<void>}
   */
  async selectOssSTSToken() {
    let result = await api.oss.selectOssSTSToken();
    if (result.code === 0) {
      // 返回 base64 解码的数据
      return JSON.parse(Base64.decode(result.data));
    } else {
      notification.open({
        message: '获取 oss token 出错 请查看控制台错误信息',
        duration: 20,
        placement: 'bottomLeft'
      });
      console.error(result);
      return {};
    }
  }
}
