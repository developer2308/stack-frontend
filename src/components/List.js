import { useContext, useEffect, useState } from "react";
import avatar from "../images/avatar.png";
import Moment from "moment";
import { SearchContext } from "../App";
import Loading from "./Loading";
import Rightbar from "./Rightbar";
import { Link } from "react-router-dom";
import { formatDateTime, formatNumber } from "../helper";

const ORDER_BY = ["relevance", "newest", "active", "score"];
const PAGE_SIZE = [15, 30, 50];
const PAGE_BUTTON_COUNT = 5;
const ELLIPSIS_MARK = "...";

const List = () => {
  const { query } = useContext(SearchContext);

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
      const url = `${process.env.REACT_APP_API_HOST}/posts/search?q=${query}&tab=${order}&pagesize=${pageSize}&page=${page}`;
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
    let result = body;
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

  return (
    <div className="flex flex-1 w-full">
      <div className="m-4 flex-1">
        <div className="flex justify-between flex-wrap items-center mb-3">
          <h1 className="text-[27px]">Search Results </h1>
          <div
            className="text-sky-400 hover:cursor-pointer"
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
        {(showTip || !posts.length) && (
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
        <div className="flex flex-wrap gap-2 items-center mb-3">
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

        <div className="border-t">
          {posts.map((post, index) => (
            <div
              className="flex lg:flex-row flex-col border-b p-[16px] gap-4 text-[13px]"
              key={index}
            >
              <div className="flex lg:flex-col lg:items-end items-center gap-1">
                <div className="flex gap-1">
                  <span className="font-[500]">{formatNumber(post["VoteCount"]) || 0}</span>
                  <span>votes</span>
                </div>
                <div className="flex items-center bg-green-800 text-white rounded p-1 gap-1 px-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    className="inline text-white"
                  >
                    <path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path>
                  </svg>{" "}
                  <span>{post["AnswerCount"]}</span>
                  <span>answers</span>
                </div>
                <div className="flex gap-1 text-red-700">
                  <span className="font-[500]">{formatNumber(post["ViewCount"])}</span>
                  <span>views</span>
                </div>
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
                  <Link
                    to={`/questions/${post["Id"]}/${post["Title"]
                      .toLowerCase()
                      .replace("'", "")
                      .split(" ")
                      .join("-")}`}
                    className="text-sky-400 text-[17px] ml-1"
                  >
                    {post["Title"]}
                  </Link>
                </h3>
                <div
                  className="text-[13px] mb-2 line-clamp-2 break-all"
                  dangerouslySetInnerHTML={{ __html: highlight(post["Body"]) }}
                ></div>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <ul className="flex gap-2">
                      {getTagList(post["Tags"]).map((tag, index) => (
                        <li key={index}>
                          <a
                            href="/questions/tagged/java"
                            className="rounded bg-sky-200 py-1 px-2 text-[12px] text-sky-600"
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center text-[12px] justify-end ml-auto">
                    <a href="/users/87234/gmannickg">
                      <div>
                        <img
                          src={avatar}
                          alt="GManNickG's user avatar"
                          width="16"
                          height="16"
                        />
                      </div>
                    </a>

                    <div className="flex gap-2">
                      <div>
                        <a
                          href="/users/87234/gmannickg"
                          className="text-sky-400"
                        >
                          {post["DisplayName"]}
                        </a>
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
                      asked <span>{formatDateTime(post["CreationDate"])}</span>
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
              {getPageList().map((p) => (
                <>
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
                </>
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

        {isLoading && <Loading />}
      </div>
      <Rightbar />
    </div>
  );
};

export default List;
