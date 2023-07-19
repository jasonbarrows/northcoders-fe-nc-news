const baseUrl = 'https://nc-news-t20n.onrender.com/api';

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
