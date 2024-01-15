import { stringify } from 'qs';
import { request } from 'umi';

export async function queryCases(params) {
  return request(`/api/cases?${stringify(params)}`);
}

export async function addCases(params) {
  return request('/api/cases', {
    method: 'POST',
    body: params,
  });
}

export async function updateCases(params) {
  return request(`/api/cases/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function removeCases(id) {
  return request(`/api/cases/${id}`, {
    method: 'DELETE',
  });
}
