const baseUrl = 'https://nc-news-t20n.onrender.com/api';

export const getAllTopics = () => {
  return apiGet('/topics');
};

export const getAllArticles = () => {
  return apiGet('/articles');
};

export const getArticleById = (article_id) => {
  return apiGet(`/articles/${article_id}`);
};

export const getAllCommentsByArticleId = (article_id) => {
  return apiGet(`/articles/${article_id}/comments`);
};

export const getUserByUsername = (username) => {
  return apiGet(`/users/${username}`);
};

export const updateArticleById = (article_id, body) => {
  return apiPatch(`/articles/${article_id}`, body);
};

export const addUserCommentToArticle = (article_id, body) => {
  return apiPost(`/articles/${article_id}/comments`, body);
};

const api = (url, options = {}) => {
  return fetch(`${baseUrl}${url}`, { ...options })
    .then((response) => {
      if (response.ok) {
        return response.status !== 204 ? response.json() : { success: true };
      } else {
        return response.json().then((body) => {
          return Promise.reject({ status: response.status, message: body.message });
        })
      }
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
