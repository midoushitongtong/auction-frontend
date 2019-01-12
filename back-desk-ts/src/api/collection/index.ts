import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 收藏品相关接口
 *
 */
export default {
  // 获取多条记录
  selectCollectionList(data: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/collection`,
      data
    );
  },
  // 获取单条记录
  selectCollectionById(id: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/collection/${id}`
    );
  },
  // 新增
  insertCollection(data: any): object {
    return ajax(
      'POST',
      `${config.API_ROOT}/collection`,
      data
    );
  },
  // 修改
  updateCollectionById(id: any, data: any): object {
    return ajax(
      'PUT',
      `${config.API_ROOT}/collection/${id}`,
      data
    );
  },
  // 删除
  deleteCollectionById(id: any): object {
    return ajax(
      'DELETE',
      `${config.API_ROOT}/collection/${id}`
    );
  }
};
