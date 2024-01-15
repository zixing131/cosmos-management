import { stringify } from 'qs';
import { request } from 'umi';

export async function queryWarranty(params) {
  return request(`/api/warranty?${stringify(params)}`);
}

export async function addWarranty(params) {
  return request('/api/warranty', {
    method: 'POST',
    body: params,
  });
}

export async function updateWarranty(params) {
  return request(`/api/warranty/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function removeWarranty(id) {
  return request(`/api/warranty/${id}`, {
    method: 'DELETE',
  });
}
