import ajax from '../../util/ajax';
import config from '../../config';

/**
 * oss 相关接口
 *
 */
export default {
  // 查询 oss sts token
  selectOssStsToken(data) {
    return ajax(
      'GET',
      `${config.API_OSS_ROOT}/oss/stsToken`,
      data
    );
  }
};
