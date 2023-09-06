import { useEffect, useState } from "react";
import avatar from "../images/avatar.png";
import Loading from "./Loading";
import Rightbar from "./Rightbar";
import { formatDateTime, formatNumber, getSiteInfo, titleStr } from "../helper";
import { useSearchParams } from "react-router-dom";

const ORDER_BY = ["relevance", "newest", "active", "score"];
const PAGE_SIZE = [15, 30, 50];
const PAGE_BUTTON_COUNT = 5;
const ELLIPSIS_MARK = "...";

const List = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState(ORDER_BY[0]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE[0]);
  const [showTip, setShowTip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!query) {
        return;
      }
      setIsLoading(true);
      const siteInfo = getSiteInfo();
      const url = `${process.env.REACT_APP_API_HOST}/posts/search?site=${siteInfo["id"]}&q=${query}&tab=${order}&pagesize=${pageSize}&page=${page}`;
      console.log(url, process.env.NODE_ENV);
      const res = await fetch(url);
      const json = await res.json();
      console.log(json);
      setIsLoading(false);
      setPosts(json["data"]);
      setTotal(json["meta"]["total"]);
      setLastPage(Math.ceil(json["meta"]["total"] / pageSize));
    };

    fetchPosts();
  }, [query, order, pageSize, page]);

  useEffect(() => {
    setPage(1);
  }, [query, pageSize]);

  const getTagList = (tags) => {
    let list = (tags || "").match(/<[a-zA-Z0-9]*>/g) || [];
    list = list.map((tag) => tag.substring(1, tag.length - 1));
    return list;
  };

  const highlight = (body) => {
    let result = body || "";
    const removePatterns = [/<\/?[^>]+(>|$)/gi];
    removePatterns.forEach((pattern) => {
      result = result.replace(pattern, "");
    });

    return result;
  };

  const getPageList = () => {
    const pages = [];

    let start = page - Math.floor(PAGE_BUTTON_COUNT / 2);
    let end = page + Math.floor(PAGE_BUTTON_COUNT / 2);

    if (end >= lastPage) {
      start = lastPage - PAGE_BUTTON_COUNT + 1;
    }
    if (start <= 1) {
      start = 1;
    }

    for (
      let i = start;
      i <= Math.min(start + PAGE_BUTTON_COUNT - 1, lastPage);
      i++
    ) {
      pages.push(i);
    }

    if (pages[0] > 1) {
      if (pages[0] > 2) {
        pages.unshift(ELLIPSIS_MARK);
      }
      pages.unshift(1);
    }

    if (pages[pages.length - 1] < lastPage) {
      if (pages[pages.length - 1] < lastPage - 1) {
        pages.push(ELLIPSIS_MARK);
      }
      pages.push(lastPage);
    }
    return pages;
  };

  const isAnswer = (post) => {
    return post["PostTypeId"] === 2;
  };

  const postUrl = (post) => {
    let url = `/questions/${post["Id"]}/${titleStr(post["Title"])}`;
    if (isAnswer(post)) {
      url = `/questions/${post["parent"]["Id"]}/${titleStr(
        post["parent"]["Title"]
      )}/${post["Id"]}`;
    }
    return url;
  };

  return (
    <div className="flex flex-1 w-full flex-wrap lg:flex-nowrap ">
      <div className="m-4 flex-1">
        <div className="flex justify-between flex-wrap items-center mb-3">
          <h1 className="text-[27px]">Search Results </h1>
          <div
            className="text-sky-400 hover:cursor-pointer hidden"
            onClick={() => setShowTip(!showTip)}
          >
            Advanced Search Tips
          </div>
        </div>
        <div className="text-[12px] mb-3">
          <div className="mb-1">Results for {query}</div>
          <div>
            Search options <span className="font-bold">not deleted</span>
          </div>
        </div>
        {showTip && (
          <table className="text-[13px] mb-8 w-full">
            <thead>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Search type</th>
                <th className="text-left p-1 border-t-[0.5px]">
                  Search syntax
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Tags</th>
                <td className="text-left p-1 border-t-[0.5px]">[tag]</td>
              </tr>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Exact</th>
                <td className="text-left p-1 border-t-[0.5px]">"words here"</td>
              </tr>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Author</th>
                <td className="text-left p-1 border-t-[0.5px]">
                  user:1234
                  <br />
                  user:me <span className="text-gray-400">(yours)</span>
                </td>
              </tr>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Score</th>
                <td className="text-left p-1 border-t-[0.5px]">
                  score:3 <span className="text-gray-400">(3+)</span>
                  <br />
                  score:0 <span className="text-gray-400">(none)</span>
                </td>
              </tr>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Answers</th>
                <td className="text-left p-1 border-t-[0.5px]">
                  answers:3 <span className="text-gray-400">(3+)</span>
                  <br />
                  answers:0 <span className="text-gray-400">(none)</span>
                  <br />
                  isaccepted:yes
                  <br />
                  hasaccepted:no
                  <br />
                  inquestion:1234
                </td>
              </tr>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Views</th>
                <td className="text-left p-1 border-t-[0.5px]">views:250</td>
              </tr>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Code</th>
                <td className="text-left p-1 border-t-[0.5px]">
                  code:"if (foo != bar)"
                </td>
              </tr>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Sections</th>
                <td className="text-left p-1 border-t-[0.5px]">
                  title:apples
                  <br />
                  body:"apples oranges"
                </td>
              </tr>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">URL</th>
                <td className="text-left p-1 border-t-[0.5px]">
                  url:"*.example.com"
                </td>
              </tr>

              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Saves</th>
                <td className="text-left p-1 border-t-[0.5px]">in:saves</td>
              </tr>

              <tr>
                <th className="text-left p-1 border-t-[0.5px]">
                  Staging Ground
                </th>
                <td className="text-left p-1 border-t-[0.5px]">
                  staging-ground:1
                  <br />
                  sg:1
                </td>
              </tr>

              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Status</th>
                <td className="text-left p-1 border-t-[0.5px]">
                  closed:yes
                  <br />
                  duplicate:no
                  <br />
                  migrated:no
                  <br />
                  wiki:no
                </td>
              </tr>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Types</th>
                <td className="text-left p-1 border-t-[0.5px]">
                  is:question
                  <br />
                  is:answer
                  <br />
                  is:article
                </td>
              </tr>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Exclude</th>
                <td className="text-left p-1 border-t-[0.5px]">
                  -[tag]
                  <br />
                  -apples
                </td>
              </tr>
              <tr>
                <th className="text-left p-1 border-t-[0.5px]">Collective</th>
                <td className="text-left p-1 border-t-[0.5px]">
                  collective:"Name"
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="flex flex-wrap gap-2 items-center mb-3 border-b-[0.5px] pb-2">
          <div className="flex-1 font-bold mr-2 text-[13px]">
            {formatNumber(total)} results
          </div>

          <div className="ml-auto">
            <div className="flex text-[13px]">
              {ORDER_BY.map((item, index) => (
                <div
                  key={index}
                  className={`p-2 text-gray-400 border-[0.5px] capitalize border-gray-200 hover:cursor-pointer 
                ${index === 0 ? "rounded-l" : ""}
                ${index === ORDER_BY.length - 1 ? "rounded-r" : ""}
                ${order === item ? "bg-gray-300" : ""}`}
                  onClick={() => setOrder(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {!posts || !posts.length ? (
          <div className="page-description p-6 m-0">
            <div className="flex flex-col items-center">
              <svg
                className="fc-black-200 svg-spot spotSearchLg"
                width="96"
                height="96"
                viewBox="0 0 96 96"
              >
                <path
                  d="M60.38 76.15a6.2 6.2 0 1 1 8.77-8.77l17.78 17.79a6.2 6.2 0 0 1-8.76 8.76L60.38 76.15Z"
                  opacity=".2"
                ></path>
                <path d="M52.17 13.27a1.5 1.5 0 0 0-1.5 2.6A25.5 25.5 0 0 1 63 32.97a1.5 1.5 0 1 0 2.94-.59 28.5 28.5 0 0 0-13.77-19.1ZM36.64 11c0-.84.67-1.5 1.5-1.5 1.8 0 3.59.19 5.35.53a1.5 1.5 0 1 1-.58 2.95 25.5 25.5 0 0 0-4.78-.48 1.5 1.5 0 0 1-1.5-1.5ZM38 1.5a36.5 36.5 0 1 0 22.3 65.4 6.47 6.47 0 0 0 1.9 4.48l19.15 19.15a6.5 6.5 0 0 0 9.18-9.18L71.38 62.2a6.47 6.47 0 0 0-4.48-1.9A36.5 36.5 0 0 0 38 1.5ZM4.5 38a33.5 33.5 0 1 1 67 0 33.5 33.5 0 0 1-67 0Zm59.83 31.26a3.5 3.5 0 0 1 4.93-4.93l19.15 19.14a3.5 3.5 0 1 1-4.94 4.94L64.33 69.26Z"></path>
              </svg>
              <div className="mt-3">
                We couldn't find anything for <b>{query}</b>
              </div>
              <div className="mt-1 text-[13px]">
                <strong>Search options:</strong>
                not deleted
              </div>

              <div className="mt-1 text-[13px] text-gray-500">
                Try different or less specific keywords.
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="">
              {posts.map((post, index) => (
                <div
                  className="flex lg:flex-row flex-col border-b p-[16px] gap-4 text-[13px]"
                  key={index}
                >
                  <div className="flex lg:flex-col lg:items-end items-center gap-1 min-w-[108px] mt-[3px]">
                    <div className="flex gap-1">
                      <span className="font-[500]">
                        {formatNumber(post["Score"]) || 0}
                      </span>
                      <span>votes</span>
                    </div>
                    {!isAnswer(post) && (
                      <>
                        <div
                          className={`flex items-center ${
                            post["AcceptedAnswerId"]
                              ? "bg-green-800 text-white"
                              : "text-green-800 border-green-800 border-[1px]"
                          }  rounded p-[1px] gap-1 px-2`}
                        >
                          {post["AcceptedAnswerId"] && (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              className="inline fill-white"
                            >
                              <path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path>
                            </svg>
                          )}
                          <span>{post["AnswerCount"]}</span>
                          <span>answers</span>
                        </div>
                        <div className="flex gap-1 text-red-700">
                          <span className="font-[500]">
                            {formatNumber(post["ViewCount"])}
                          </span>
                          <span>views</span>
                        </div>
                      </>
                    )}
                    {isAnswer(post) &&
                      post["Id"] === post["parent"]["AcceptedAnswerId"] && (
                        <div className="flex items-center bg-green-800 text-white rounded p-[1px] gap-1 px-2">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            className="inline fill-white"
                          >
                            <path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path>
                          </svg>
                          <span>accepted</span>
                        </div>
                      )}
                  </div>
                  <div>
                    <h3 className="mb-1">
                      <span>
                        <svg
                          width="18"
                          height="18"
                          className="inline mb-1"
                          viewBox="0 0 18 18"
                        >
                          <path d="m4 15-3 3V4c0-1.1.9-2 2-2h12c1.09 0 2 .91 2 2v9c0 1.09-.91 2-2 2H4Zm7.75-3.97c.72-.83.98-1.86.98-2.94 0-1.65-.7-3.22-2.3-3.83a4.41 4.41 0 0 0-3.02 0 3.8 3.8 0 0 0-2.32 3.83c0 1.29.35 2.29 1.03 3a3.8 3.8 0 0 0 2.85 1.07c.62 0 1.2-.11 1.71-.34.65.44 1 .68 1.06.7.23.13.46.23.7.3l.59-1.13a5.2 5.2 0 0 1-1.28-.66Zm-1.27-.9a5.4 5.4 0 0 0-1.5-.8l-.45.9c.33.12.66.29.98.5-.2.07-.42.11-.65.11-.61 0-1.12-.23-1.52-.68-.86-1-.86-3.12 0-4.11.8-.9 2.35-.9 3.15 0 .9 1.01.86 3.03-.01 4.08Z"></path>
                        </svg>
                      </span>
                      <a
                        href={postUrl(post)}
                        className="text-sky-400 text-[17px] ml-1"
                      >
                        {isAnswer(post)
                          ? post["parent"]["Title"]
                          : post["Title"]}
                        {post["ClosedDate"] ? " [closed]" : ""}
                      </a>
                    </h3>
                    <div
                      className="text-[13px] mb-2 line-clamp-2 break-all"
                      dangerouslySetInnerHTML={{
                        __html: highlight(post["Body"]),
                      }}
                    ></div>
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <div>
                        <ul className="flex gap-2">
                          {getTagList(post["Tags"]).map((tag, index) => (
                            <li key={index}>
                              <span className="rounded bg-sky-200 py-1 px-2 text-[12px] text-sky-600">
                                {tag}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 items-center text-[12px] justify-end ml-auto">
                        <div>
                          <img
                            src={avatar}
                            alt={post["DisplayName"]}
                            width="16"
                            height="16"
                          />
                        </div>

                        <div className="flex gap-2">
                          <div>
                            <span className="text-sky-400">
                              {post["DisplayName"]}
                            </span>
                          </div>

                          <ul>
                            <li>
                              <span className="font-bold">
                                {post["Reputation"]}
                              </span>
                            </li>
                          </ul>
                        </div>

                        <time>
                          {!isAnswer(post) ? "asked" : "answered"}
                          <span className="ml-1">
                            {formatDateTime(post["CreationDate"])}
                          </span>
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {total > pageSize && (
              <div className="flex flex-wrap my-4 gap-4 text-[13px] justify-between">
                <div className="flex gap-1 items-center">
                  {page > 1 && (
                    <button
                      className="p-1 px-2 rounded border-gray border-[0.5px]"
                      onClick={() => setPage(page - 1)}
                    >
                      Prev
                    </button>
                  )}
                  {getPageList().map((p, index) => (
                    <div key={index}>
                      {p === ELLIPSIS_MARK ? (
                        <div className="mx-2">{p}</div>
                      ) : (
                        <button
                          className={`p-1 px-2 rounded ${
                            p === page
                              ? "bg-yellow-500 text-white"
                              : "border-gray border-[0.5px] hover:cursor-pointer "
                          }`}
                          onClick={() => setPage(p)}
                        >
                          {p}
                        </button>
                      )}
                    </div>
                  ))}
                  {page < lastPage && (
                    <button
                      className="p-1 px-2 rounded border-gray border-[0.5px]"
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  {PAGE_SIZE.map((size, index) => (
                    <div
                      key={index}
                      onClick={() => setPageSize(size)}
                      className={`p-1 px-2 rounded hover:cursor-pointer ${
                        pageSize === size
                          ? "bg-yellow-500 text-white"
                          : "border-gray border-[0.5px]"
                      }`}
                    >
                      {size}
                    </div>
                  ))}
                  <span className="px-2">per page</span>
                </div>
              </div>
            )}
          </>
        )}

        {isLoading && <Loading />}
      </div>
      <Rightbar />
    </div>
  );
};

export default List;
