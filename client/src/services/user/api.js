import { stringify } from 'qs';
import { request } from 'umi';

export async function queryUser(params) {
  return request(`/api/user?${stringify(params)}`);
}

export async function addUser(params) {
  return request('/api/user', {
    method: 'POST',
    body: params,
  });
}

export async function updateUser(params) {
  return request(`/api/user/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function removeUser(id) {
  return request(`/api/user/${id}`, {
    method: 'DELETE',
  });
}
