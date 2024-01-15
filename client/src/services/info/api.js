import { stringify } from 'qs';
import { request } from 'umi';

export async function queryInfo(params) {
  return request(`/api/info?${stringify(params)}`);
}

export async function addInfo(params) {
  return request('/api/info', {
    method: 'POST',
    body: params,
  });
}

export async function updateInfo(params) {
  return request(`/api/info/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function removeInfo(id) {
  return request(`/api/info/${id}`, {
    method: 'DELETE',
  });
}
