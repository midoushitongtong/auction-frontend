import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 用户相关接口
 *
 */
export default {
  // 获取用户
  selectPersonList(data) {
    return ajax(
      'GET',
      `${config.API_ROOT}/person`,
      data
    );
  },
  // 获取详情
  selectPersonById(id) {
    return ajax(
      'GET',
      `${config.API_ROOT}/person/${id}`
    );
  },
  // 新增
  insertPerson(data) {
    return ajax(
      'POST',
      `${config.API_ROOT}/person`,
      data
    );
  },
  // 修改
  updatePersonById(id, data) {
    return ajax(
      'PUT',
      `${config.API_ROOT}/person/${id}`,
      data
    );
  },
  // 删除
  deletePersonById(id) {
    return ajax(
      'DELETE',
      `${config.API_ROOT}/person/${id}`
    );
  }
};
