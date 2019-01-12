import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 用户相关接口
 *
 */
export default {
  // 获取多条记录
  selectPersonList(data: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/person`,
      data
    );
  },
  // 获取单条记录
  selectPersonById(id: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/person/${id}`
    );
  },
  // 新增
  insertPerson(data: any): object {
    return ajax(
      'POST',
      `${config.API_ROOT}/person`,
      data
    );
  },
  // 修改
  updatePersonById(id: any, data: any): object {
    return ajax(
      'PUT',
      `${config.API_ROOT}/person/${id}`,
      data
    );
  },
  // 删除
  deletePersonById(id: any): object {
    return ajax(
      'DELETE',
      `${config.API_ROOT}/person/${id}`
    );
  }
};
