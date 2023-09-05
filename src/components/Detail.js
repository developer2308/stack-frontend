import { useContext, useEffect, useState } from "react";
import avatar from "../images/avatar.png";
import Rightbar from "./Rightbar";
import Loading from "./Loading";
import { Link, useParams } from "react-router-dom";
import { formatDateTime, formatNumber, fromNow } from "../helper";

const Detail = () => {
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const url = `${process.env.REACT_APP_API_HOST}/posts/${id}`;
      console.log(url, process.env.NODE_ENV);
      const res = await fetch(url);
      const json = await res.json();
      console.log(json);
      setIsLoading(false);
      setPost(json);
    };

    fetchPost();
  }, [id]);

  const getTagList = (tags) => {
    let list = (tags || "").match(/<[a-zA-Z0-9]*>/g) || [];
    list = list.map((tag) => tag.substring(1, tag.length - 1));
    return list;
  };

  if (!post) {
    return;
  }

  return (
    <div className="flex flex-1 w-full">
      <div className="m-4 flex-1">
        <div className="flex flex-col border-b-[0.5px]">
          <h1 className="text-[27px]">{post["Title"]}</h1>
          <div className="flex flex-wrap gap-2 text-[13px] text-gray-600">
            <div className="nowrap mr-4 mb-2">
              <span className="text-gray-400 mr-1">Asked</span>
              <time>{fromNow(post["CreationDate"])}</time>
            </div>
            <div className="nowrap mr-4 mb-2">
              <span className="text-gray-400 mr-1">Modified</span>
              <span>{fromNow(post["LastEditDate"])}</span>
            </div>
            <div className="nowrap mb-2">
              <span className="text-gray-400 mr-1">Viewed</span>
              {formatNumber(post["ViewCount"])} times
            </div>
          </div>
        </div>
        <div className="flex flex-wrap my-2 gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <button
                className="rounded-full p-2 border-[0.5px] border-gray-400"
                data-te-toggle="tooltip"
                title="This question shows research effort; it is useful and clear"
              >
                <svg
                  aria-hidden="true"
                  className="svg-icon iconArrowUp"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M1 12h16L9 4l-8 8Z"></path>
                </svg>
              </button>
              <div className="p-2 text-[19px]">{post["Score"]}</div>
              <button
                className="rounded-full p-2 border-[0.5px] border-gray-400"
                data-te-toggle="tooltip"
                title="This question does not show any research effort; it is unclear or not useful"
              >
                <svg
                  aria-hidden="true"
                  className="svg-icon iconArrowDown"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M1 6h16l-8 8-8-8Z"></path>
                </svg>
              </button>

              <button
                className="p-2"
                type="button"
                data-te-toggle="tooltip"
                title="Save this question."
              >
                <svg
                  className="js-saves-btn-unselected svg-icon iconBookmarkAlt"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="m9 10.6 4 2.66V3H5v10.26l4-2.66ZM3 17V3c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v14l-6-4-6 4Z"></path>
                </svg>
              </button>

              <button
                className="p-2"
                data-te-toggle="tooltip"
                title="Show activity on this post."
              >
                <svg
                  aria-hidden="true"
                  className="mln2 mr0 svg-icon iconHistory"
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                >
                  <path d="M3 9a8 8 0 1 1 3.73 6.77L8.2 14.3A6 6 0 1 0 5 9l3.01-.01-4 4-4-4h3L3 9Zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5Z"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-col">
              <div
                className="text-[13px] mb-2 p-body"
                dangerouslySetInnerHTML={{ __html: post["Body"] }}
              ></div>
              <div className="flex flex-col gap-2">
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

                <div className="mt-4 flex flex-wrap justify-end pt-1 mb-4 text-[12px]">
                  <div className="flex gap-2">
                    <div className="flex flex-col p-1">
                      <div className="text-sky-400">
                        edited
                        <span className="ml-1">
                          {formatDateTime(post["LastEditDate"])}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="gravatar-wrapper-32">
                          <img
                            src={avatar}
                            alt="John Smith's user avatar"
                            width="32"
                            height="32"
                            className="bar-sm"
                          />
                        </div>
                        <div className="user-details">
                          <span className="text-sky-400">
                            {post["editor"]?.["DisplayName"]}
                          </span>
                          <div className="flex gap-1">
                            <span className="font-bold">
                              {post["editor"]?.["Reputation"]}
                            </span>
                            {post["editor"]?.["Badges"][1] && (
                              <span>
                                <span className="text-yellow-500">●</span>
                                <span className="ml-1">
                                  {post["editor"]["Badges"][1]}
                                </span>
                              </span>
                            )}
                            {post["editor"]?.["Badges"][2] && (
                              <span>
                                <span className="text-gray-500">●</span>
                                <span className="ml-1">
                                  {post["editor"]["Badges"][2]}
                                </span>
                              </span>
                            )}
                            {post["editor"]?.["Badges"][3] && (
                              <span>
                                <span className="text-orange-500">●</span>
                                <span className="ml-1">
                                  {post["editor"]["Badges"][3]}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col bg-sky-100 rounded p-1">
                      <div className="text-sky-400">
                        asked
                        <span className="ml-1">
                          {formatDateTime(post["CreationDate"])}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="gravatar-wrapper-32">
                          <img
                            src={avatar}
                            alt="John Smith's user avatar"
                            width="32"
                            height="32"
                            className="bar-sm"
                          />
                        </div>
                        <div className="user-details">
                          <span className="text-sky-400">
                            {post["owner"]?.["DisplayName"]}
                          </span>
                          <div className="flex gap-1">
                            <span className="font-bold">
                              {post["owner"]?.["Reputation"]}
                            </span>
                            {post["owner"]?.["Badges"][1] && (
                              <span>
                                <span className="text-yellow-500">●</span>
                                <span className="ml-1">
                                  {post["owner"]["Badges"][1]}
                                </span>
                              </span>
                            )}
                            {post["owner"]?.["Badges"][2] && (
                              <span>
                                <span className="text-gray-500">●</span>
                                <span className="ml-1">
                                  {post["owner"]["Badges"][2]}
                                </span>
                              </span>
                            )}
                            {post["owner"]?.["Badges"][3] && (
                              <span>
                                <span className="text-orange-500">●</span>
                                <span className="ml-1">
                                  {post["owner"]["Badges"][3]}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Rightbar>
            <div className="module sidebar-linked">
              <h4 className="mb-5">Linked</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <div className="bg-green-300 rounded w-[38px] items-center justify-center text-white py-1 flex text-[12px]">
                    94
                  </div>
                  <Link
                    to="https://stackoverflow.com/questions/4159950/how-do-i-delete-a-remote-branch-in-git?noredirect=1&amp;lq=1"
                    className="text-[13px]"
                  >
                    How do I delete a remote branch in Git?
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-gray-300 rounded w-[38px] items-center justify-center text-white py-1 flex text-[12px]">
                    94
                  </div>
                  <Link
                    to="https://stackoverflow.com/questions/4159950/how-do-i-delete-a-remote-branch-in-git?noredirect=1&amp;lq=1"
                    className="text-[13px]"
                  >
                    How do I delete a remote branch in Git?
                  </Link>
                </div>
              </div>
            </div>
          </Rightbar>
        </div>
      </div>

      {isLoading && <Loading />}
    </div>
  );
};

export default Detail;
