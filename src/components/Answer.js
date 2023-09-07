import { formatDateTime } from "../helper";
import Vote from "./Vote";
import avatar from "../images/avatar.png";
import { useEffect, useRef } from "react";

const Answer = ({ answer, selected }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (selected) {
      window.scrollTo({
        top: ref.current.offsetTop - 56,
        behavior: "smooth",
      });
    }
  }, [selected]);

  return (
    <div
      className="flex flex-col items-center border-b-[0.5px] py-[16px]"
      ref={ref}
    >
      <div className="flex gap-4">
        <Vote score={answer["Score"]} />
        <div className="answer-body flex flex-col">
          <div
            className="text-[13px] mb-2 p-body"
            dangerouslySetInnerHTML={{ __html: answer["Body"] }}
          ></div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap justify-end pt-1 mb-4 text-[12px]">
              <div className="flex gap-2">
                <div className="flex flex-col p-1">
                  <div className="text-gray-400">
                    answered
                    <span className="ml-1">
                      {formatDateTime(answer["CreationDate"])}
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
                        {answer["owner"]?.["DisplayName"]}
                      </span>
                      <div className="flex gap-1">
                        <span className="font-bold">
                          {answer["owner"]?.["Reputation"]}
                        </span>
                        {answer["owner"]?.["Badges"][1] && (
                          <span>
                            <span className="text-yellow-500">●</span>
                            <span className="ml-1">
                              {answer["owner"]["Badges"][1]}
                            </span>
                          </span>
                        )}
                        {answer["owner"]?.["Badges"][2] && (
                          <span>
                            <span className="text-gray-500">●</span>
                            <span className="ml-1">
                              {answer["owner"]["Badges"][2]}
                            </span>
                          </span>
                        )}
                        {answer["owner"]?.["Badges"][3] && (
                          <span>
                            <span className="text-orange-500">●</span>
                            <span className="ml-1">
                              {answer["owner"]["Badges"][3]}
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
          <div className="flex flex-col">
            {answer["comments"].map((comment, index) => (
              <div
                className="comment-body border-t-[0.5px] p-[6px]"
                key={index}
              >
                <span
                  className="text-[13px] mb-2 p-body"
                  dangerouslySetInnerHTML={{ __html: comment["Text"] }}
                ></span>
                <div className="inline-flex text-[13px] px-[5px] text-sky-500">
                  –&nbsp;{comment["DisplayName"]}
                </div>
                <span className="text-gray-400 text-[13px]">
                  {formatDateTime(comment["CreationDate"])}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;
