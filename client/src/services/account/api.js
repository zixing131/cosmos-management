import { stringify } from 'qs';
import { request } from 'umi';

export async function queryAccount(params) {
  return request(`/api/account?${stringify(params)}`);
}

export async function addAccount(params) {
  return request('/api/account', {
    method: 'POST',
    body: params,
  });
}

export async function updateAccount(params) {
  return request(`/api/account/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function removeAccount(id) {
  return request(`/api/account/${id}`, {
    method: 'DELETE',
  });
}
