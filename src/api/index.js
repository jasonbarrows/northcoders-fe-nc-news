const baseUrl = 'https://nc-news-t20n.onrender.com/api';

export const getAllArticles = () => {
  return apiGet('/articles');
};

const api = (url, options = {}) => {
  return fetch(`${baseUrl}${url}`, { ...options })
    .then((response) => {
      return response.status !== 204 ? response.json() : { success: true };
    })
};

const apiGet = (url, options = {}) => {
  const { query = null } = options;

  let queryStr = '';
  if (query) {
    queryStr = query.toString();
    queryStr = queryStr && `?${queryStr}`;
  }

  return api(`${url}${queryStr}`);
};

const apiPost = (url, body) => {
  return api(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
};

const apiPatch = (url, body) => {
  return api(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
};

const apiDelete = (url) => {
  return api(url, {
    method: 'DELETE',
  });
};
