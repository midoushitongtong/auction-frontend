import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 用户相关接口
 *
 */
interface Api {
  // 获取多条记录
  selectPersonList: (data: any) => {},
  // 获取单条记录
  selectPersonById: (id: any) => {},
  // 新增
  insertPerson: (data: any) => {},
  // 修改
  updatePersonById: (id: any, data: any) => {}
  // 删除
  deletePersonById: (id: any) => {}
}

/**
 * 用户相关接口实现
 *
 */
const api: Api = {
  selectPersonList(data: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/person`,
      data
    );
  },
  selectPersonById(id: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/person/${id}`
    );
  },
  insertPerson(data: any): object {
    return ajax(
      'POST',
      `${config.API_ROOT}/person`,
      data
    );
  },
  updatePersonById(id: any, data: any): object {
    return ajax(
      'PUT',
      `${config.API_ROOT}/person/${id}`,
      data
    );
  },
  deletePersonById(id: any): object {
    return ajax(
      'DELETE',
      `${config.API_ROOT}/person/${id}`
    );
  }
};

export default api;
