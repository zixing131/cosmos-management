import { stringify } from 'qs';
import { request } from 'umi';

export async function queryCaseImages(params) {
  return request(`/api/caseImages?${stringify(params)}`);
}

export async function addCaseImages(params) {
  return request('/api/caseImages', {
    method: 'POST',
    body: params,
  });
}

export async function updateCaseImages(params) {
  return request(`/api/caseImages/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function removeCaseImages(id) {
  return request(`/api/caseImages/${id}`, {
    method: 'DELETE',
  });
}
