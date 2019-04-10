import ajax from '../../util/ajax';
import config from '../../config';

/**
 * oss 相关接口
 *
 */
interface Api {
  // 查询 oss sts token
  selectOssStsToken: (data: any) => {}
}

/**
 * oss 相关接口实现
 *
 */
const api: Api = {
  // 查询 oss sts token
  selectOssStsToken(data: any): object {
    return ajax(
      'GET',
      `${config.API_OSS_ROOT}/oss/stsToken`,
      data
    );
  }
};

export default api;
