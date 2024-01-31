import { stringify } from 'qs';
import { request } from 'umi';

export async function queryInfo(params) {
  return request(`/api/info?${stringify(params)}`);
}

export async function findByKeys(params) {
  return request(`/api/info/keys?${stringify(params)}`);
}

export async function addInfo(params) {
  return request('/api/info/create', {
    method: 'POST',
    data: params,
  });
}

export async function updateInfo(params) {
  return request(`/api/info/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function removeInfo(id) {
  return request(`/api/info/${id}`, {
    method: 'DELETE',
  });
}
