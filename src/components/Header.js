import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="border-b w-full items-center h-[56px]">
      <div className="container mx-auto flex border-b w-full items-center h-[56px] gap-2 text-gray-500 px-2">
        <Link to="/" className="flex items-center gap-1">
          <svg aria-hidden="true" width="32" height="37" viewBox="0 0 32 37">
            <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path>
            <path
              d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
              fill="#F48024"
            ></path>
          </svg>
          <span className="">stack</span><span className="font-bold text-black">overflow</span>
        </Link>
        <div className="flex w-full relative">
          <input
            name="q"
            type="text"
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
        </div>
      </div>
    </div>
  );
};

export default Header;
