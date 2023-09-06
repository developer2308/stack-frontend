import { useEffect, useState } from "react";
import avatar from "../images/avatar.png";
import Rightbar from "./Rightbar";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import {
  formatDateTime,
  formatNumber,
  fromNow,
  getSiteInfo,
  titleStr,
} from "../helper";
import Vote from "./Vote";
import Answer from "./Answer";
import Moment from "moment";

const SORT_BY_LIST = {
  scoredesc: "Highest score (default)",
  modifieddesc: "Date modified (newest first)",
  createdasc: "Date created (oldest first)",
};

const Detail = () => {
  const { id } = useParams();

  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("scoredesc");

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const siteInfo = getSiteInfo();

      const url = `${process.env.REACT_APP_API_HOST}/posts/${id}?site=${siteInfo["id"]}`;
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

  const sortedAnswers = () => {
    if (!post["answers"]) {
      return [];
    }
    const result = post["answers"].sort((a, b) => {
      if (sort === "modifieddesc") {
        return Moment(a["LastActivityDate"]).isAfter(b["LastActivityDate"])
          ? -1
          : 1;
      } else if (sort === "createdasc") {
        return Moment(a["CreationDate"]).isAfter(b["CreationDate"]) ? 1 : -1;
      } else {
        return b["Score"] - a["Score"];
      }
    });
    return result;
  };

  return (
    <div className="flex flex-1 w-full">
      {post && (
        <div className="m-8 flex-1">
          <div className="flex flex-col border-b-[0.5px]">
            <h1 className="text-[27px]">{post["Title"]}</h1>
            <div className="flex flex-wrap gap-2 text-[13px] text-gray-600">
              <div className="nowrap mr-4 mb-2">
                <span className="text-gray-400 mr-1">Asked</span>
                <time>{fromNow(post["CreationDate"])}</time>
              </div>
              <div className="nowrap mr-4 mb-2">
                <span className="text-gray-400 mr-1">Modified</span>
                <span>{fromNow(post["LastActivityDate"])}</span>
              </div>
              <div className="nowrap mb-2">
                <span className="text-gray-400 mr-1">Viewed</span>
                {formatNumber(post["ViewCount"])} times
              </div>
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap my-2 gap-4">
            <div className="flex gap-4">
              <div className="flex flex-col">
                <div className="flex gap-4">
                  <Vote score={post["Score"]} />
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
                              <span className="rounded bg-sky-200 py-1 px-2 text-[12px] text-sky-600">
                                {tag}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 flex flex-wrap justify-end pt-1 mb-4 text-[12px]">
                        <div className="flex gap-2">
                          {post["editor"] && (
                            <div className="flex flex-col p-1">
                              <div className="text-sky-400">
                                edited
                                <span className="ml-1">
                                  {formatDateTime(post["LastActivityDate"])}
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
                                        <span className="text-yellow-500">
                                          ●
                                        </span>
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
                                        <span className="text-orange-500">
                                          ●
                                        </span>
                                        <span className="ml-1">
                                          {post["editor"]["Badges"][3]}
                                        </span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
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

                <div className="answers-header py-[10px]">
                  <div className="flex">
                    <div className="answers-subheader flex items-center mb-2 flex-wrap justify-between w-full">
                      <div className="">
                        <h2 className="text-[19px]">
                          {post["answers"]?.length} Answers
                        </h2>
                      </div>
                      <div className="text-[12px]">
                        <div className="flex gap-1 items-center">
                          <div className="">
                            <label
                              className=""
                              htmlFor="answer-sort-dropdown-select-menu"
                            >
                              Sorted by:
                            </label>
                          </div>
                          <div className="">
                            <select
                              id="answer-sort-dropdown-select-menu"
                              className="border-[0.5px] p-2 rounded"
                              onChange={(e) => {
                                setSort(e.target.value);
                              }}
                            >
                              {Object.keys(SORT_BY_LIST).map(
                                (sortKey, index) => (
                                  <option key={index} value={sortKey}>
                                    {SORT_BY_LIST[sortKey]}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {sortedAnswers().map((answer, index) => (
                    <Answer answer={answer} key={index} />
                  ))}
                </div>
              </div>
            </div>
            <Rightbar>
              {!!post["linked"]?.length && (
                <div className="module sidebar-linked">
                  <h4 className="mb-5 text-[19px]">Linked</h4>
                  <div className="flex flex-col gap-2">
                    {post["linked"]?.map((linked, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="bg-green-600 rounded w-[38px] min-w-[38px] items-center justify-center text-white py-1 flex text-[12px]">
                          {linked["Score"]}
                        </div>
                        <a
                          href={`/questions/${linked["Id"]}/${titleStr(
                            linked["Title"]
                          )}`}
                          className="text-[13px] text-sky-500"
                        >
                          {linked["Title"]}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Rightbar>
          </div>
        </div>
      )}

      {isLoading && <Loading />}
    </div>
  );
};

export default Detail;
