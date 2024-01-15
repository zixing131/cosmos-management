/**
 * template config
 * @param filename api
 * @param directory client/src/services/<%= identity %>
 */
import { stringify } from 'qs';
import { request } from 'umi';

export async function query<%= Identity %>(params) {
  return request(`/api/<%= identity %>?${stringify(params)}`);
}

export async function add<%= Identity %>(params) {
  return request('/api/<%= identity %>', {
    method: 'POST',
    body: params,
  });
}

export async function update<%= Identity %>(params) {
  return request(`/api/<%= identity %>/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function remove<%= Identity %>(id) {
  return request(`/api/<%= identity %>/${id}`, {
    method: 'DELETE',
  });
}
