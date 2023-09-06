import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSiteInfo } from "../helper";

const Header = () => {
  const [searchParams] = useSearchParams();

  const [text, setText] = useState(searchParams.get("q") || "");

  const navigate = useNavigate();
  const siteInfo = getSiteInfo();

  const onChange = (event) => {
    setText(event.target.value);
  };

  const onSubmit = (e) => {
    navigate(`/search?q=${text}`);
  };

  return (
    <div className="fixed top-0 border-b w-full items-center h-[56px] border-t-[3px] border-t-yellow-500 bg-white">
      <div className="container mx-auto flex w-full items-center h-[56px] gap-2 text-gray-500 px-2">
        <a href="/" className="flex items-center gap-1">
          <img
            width="32"
            height="37"
            src={
              process.env.PUBLIC_URL + `/images/site_icon_${siteInfo["id"]}.png`
            }
            alt={siteInfo["name"]}
          />
          <div className="">
            <span className="font-bold text-black">{siteInfo["name"]}</span>
          </div>
        </a>
        <div className="flex flex-1">
          <form className="flex w-full relative" onSubmit={onSubmit}>
            <input
              name="q"
              type="text"
              value={text}
              onChange={onChange}
              autoFocus
              className="border flex-1 p-1 px-2 rounded text-[13px] pl-8"
            />
            <svg
              className="absolute top-[6px] left-[8px]"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
            </svg>
          </form>
        </div>
        <a href="/sites">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M15 1H3a2 2 0 0 0-2 2v2h16V3a2 2 0 0 0-2-2ZM1 13c0 1.1.9 2 2 2h8v3l3-3h1a2 2 0 0 0 2-2v-2H1v2Zm16-7H1v4h16V6Z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Header;
