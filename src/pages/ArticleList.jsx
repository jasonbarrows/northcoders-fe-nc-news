import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import ArticleCard from "../components/ArticleCard";
import { useParams, useSearchParams } from "react-router-dom";
import { RadioGroup } from '@headlessui/react';

const ArticleList = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams;

    if (slug) {
      query.set('topic', slug);
    }

    const combinedQuery = new URLSearchParams({
      ...Object.fromEntries(query),
      ...Object.fromEntries(searchParams),
    });

    getAllArticles(combinedQuery).then(({ articles }) => {
      setArticles(articles);
    }).catch(() => {
      setHasLoadingError(true);
    }).finally(() => {
      setIsLoading(false);
    });

    scrollTo(0, 0);
  }, [slug, searchParams]);

  const applyFilter = (filter, value) => {
    if (searchParams.has(filter) && value === '') {
      searchParams.delete(filter);
      setSearchParams(searchParams);
    } else {
      searchParams.set(filter, value);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="mb-4 sm:my-8 sm:max-w-2xl mx-auto">
      <h2 className="my-2 mx-4 text-2xl sm:text-3xl font-medium">{
        slug || 'All Articles'
      }</h2>
      <div className="mx-4 sm:mx-0 flex items-center space-y-1 sm:space-y-0 justify-between sm:justify-end space-x-4">
        <div className="flex items-center">
          <label htmlFor="sort-by" className="text-sm text-neutral-500">Sort by</label>
          <select id="sort-by"
            className="ml-2 form-select py-1 text-sm border-gray-200 rounded"
            value={searchParams.get('sort_by') || ''}
            onChange={(e) => applyFilter('sort_by', e.target.value)}
          >
            <option value="">date</option>
            <option value="comment_count">comments</option>
            <option value="votes">votes</option>
          </select>
        </div>

        <RadioGroup
          className="flex items-center space-x-1"
          value={searchParams.get('order') || ''}
          onChange={(value) => applyFilter('order', value)}
        >
          <RadioGroup.Label className="mr-2 text-sm sm:text-base text-neutral-500">Order</RadioGroup.Label>
          <RadioGroup.Option value="asc">
            {({ checked }) => (
              <span className={`block p-1 border rounded ${checked ? 'ring-2 ring-rose-700 bg-rose-100' : 'bg-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M2 3.75A.75.75 0 012.75 3h11.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zM2 7.5a.75.75 0 01.75-.75h7.508a.75.75 0 010 1.5H2.75A.75.75 0 012 7.5zM14 7a.75.75 0 01.75.75v6.59l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 111.1-1.02l1.95 2.1V7.75A.75.75 0 0114 7zM2 11.25a.75.75 0 01.75-.75h4.562a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="desc">
            {({ checked }) => (
              <span className={`block p-1 border rounded ${checked ? 'ring-2 ring-rose-700 bg-rose-100' : 'bg-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M2 3.75A.75.75 0 012.75 3h11.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zM2 7.5a.75.75 0 01.75-.75h6.365a.75.75 0 010 1.5H2.75A.75.75 0 012 7.5zM14 7a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02l-1.95-2.1v6.59a.75.75 0 01-1.5 0V9.66l-1.95 2.1a.75.75 0 11-1.1-1.02l3.25-3.5A.75.75 0 0114 7zM2 11.25a.75.75 0 01.75-.75H7A.75.75 0 017 12H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </RadioGroup.Option>
        </RadioGroup>
      </div>
      <ul className="mt-2 flex flex-col space-y-2">
      {
        isLoading
        ? <li className="m-4">
          <p className="font-light">Loading...</p>
        </li>
        : hasLoadingError
          ? <li className="m-4">
            <span className="text-rose-700">There was an error loading the topics.</span>
          </li>
          : (
            articles.map((article) => {
              return (
                <li className="border-t-4 sm:border-t-0" key={article.article_id}>
                  <ArticleCard article={article} />
                </li>
              );
            })
          )
        }
      </ul>
    </div>
  );
};

export default ArticleList;
