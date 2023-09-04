import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="flex min-w-[164px] py-4 w-[164px]">
      <div className="text-[13px] text-gray-500 w-full">
        <nav className="w-full">
          <ol className="w-full">
            <li className="p-1 pl-2 w-full">
              <a href="/" className="w-full">
                <div>
                  <div>Home</div>
                </div>
              </a>
            </li>

            <li className="w-full">
              <ol className="w-full">
                <li className="mt-4 ml-2 mb-1">Public</li>

                <li className="w-full">
                  <a
                    href="/questions"
                    className="m-2 flex bg-gray-100 border-r-4 border-yellow-500 p-2 mr-0 text-black font-bold"
                  >
                    <svg
                      className="inline mr-1"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <path d="M9 1C4.64 1 1 4.64 1 9c0 4.36 3.64 8 8 8 4.36 0 8-3.64 8-8 0-4.36-3.64-8-8-8ZM8 15.32a6.46 6.46 0 0 1-4.3-2.74 6.46 6.46 0 0 1-.93-5.01L7 11.68v.8c0 .88.12 1.32 1 1.32v1.52Zm5.72-2c-.2-.66-1-1.32-1.72-1.32h-1v-2c0-.44-.56-1-1-1H6V7h1c.44 0 1-.56 1-1V5h2c.88 0 1.4-.72 1.4-1.6v-.33a6.45 6.45 0 0 1 3.83 4.51 6.45 6.45 0 0 1-1.51 5.73v.01Z"></path>
                    </svg>{" "}
                    <span>Questions</span>
                  </a>
                </li>
              </ol>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
