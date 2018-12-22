import axios from 'axios';

// 携带 cookie
axios.defaults.withCredentials = true;

/*
  ajax 请求封装模块
 */
export default function ajax(method, url, data = {}) {
  return new Promise(async (resolve, reject) => {
    // axios response 对象
    let response;
    try {
      switch (method) {
        case 'GET':
          // 发送 get
          response = await axios({
            method,
            url,
            params: data
          });
          break;
        case 'POST':
          // 发送 post
          response = await axios({
            method,
            url,
            data
          });
          break;
        case 'PUT':
          // 发送 delete
          response = await axios({
            method,
            url,
            data
          });
          break;
        case 'DELETE':
          // 发送 delete
          response = await axios({
            method,
            url,
            data
          });
          break;
        default:
          console.log(`ajax request method error: ${method}`);
      }
      resolve(response.data);
    } catch (e) {
      reject(e);
    }
  });
}
