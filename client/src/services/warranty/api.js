import { stringify } from 'qs';
import { request } from 'umi';

export async function queryWarranty(params) {
  return request(`/api/warranty?${stringify(params)}`);
}

export async function addWarranty(params) {
  return request('/api/warranty/create', {
    method: 'POST',
    data: params,
  });
}

export async function updateWarranty(params) {
  return request(`/api/warranty/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function updateWarrantyStatus({ id, status }) {
  return request(`/api/warranty/status/${id}`, {
    method: 'PUT',
    data: {
      status
    },
  });
}

export async function removeWarranty(id) {
  return request(`/api/warranty/${id}`, {
    method: 'DELETE',
  });
}
