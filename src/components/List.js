import avatar from '../images/avatar.png';

const List = () => {
  return (
    <div className="m-4">
      <div className="flex justify-between flex-wrap items-center mb-3">
        <h1 className="text-[27px]">Search Results </h1>
        <div>
          <div className="text-sky-400">
            <a href="/">Advanced Search Tips</a>
          </div>
        </div>
      </div>
      <div className="text-[12px] mb-3">
        <div className="mb-1">Results for array sort</div>
        <div>
          Search options <span className="font-bold">not deleted</span>
        </div>
      </div>
      <div className="flex items-center mb-3">
        <div className="flex-1 font-bold mr-2 text-[13px]">
          176,818 results{" "}
        </div>

        <div>
          <div className="flex text-[13px]">
            <a
              className="p-2 bg-gray-300 rounded-l text-gray-500 border-[0.5px] border-gray-200"
              href="/search?tab=relevance&amp;q=array%20sort&amp;searchOn=3"
            >
              Relevance
            </a>
            <a
              href="/search?tab=newest&amp;q=array%20sort&amp;searchOn=3"
              className="p-2 text-gray-500 border-[0.5px] border-gray-200"
            >
              Newest
            </a>
            <a
              href="/search?tab=newest&amp;q=array%20sort&amp;searchOn=3"
              className="p-2 text-gray-500 border-[0.5px] border-gray-200"
            >
              Active
            </a>
            <a
              href="/search?tab=newest&amp;q=array%20sort&amp;searchOn=3"
              className="p-2 rounded-r text-gray-500 border-[0.5px] border-gray-200"
            >
              Score
            </a>
          </div>
        </div>
      </div>
      <div className="border-t">
        {Array(1).fill(0).map((item, index) => (
          <div className="flex border-b p-[16px] gap-4 text-[13px]" key={index}>
            <div className="flex flex-col items-end gap-1">
              <div className="flex gap-1">
                <span className="font-[500]">27072</span>
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
                <span>25</span>
                <span>answers</span>
              </div>
              <div className="flex gap-1 text-red-700">
                <span className="font-[500]">1.8m</span>
                <span>views</span>
              </div>
            </div>
            <div>
              <h3 className="mb-1">
                <span>
                  <svg
                    width="18"
                    height="18"
                    className="inline"
                    viewBox="0 0 18 18"
                  >
                    <path d="m4 15-3 3V4c0-1.1.9-2 2-2h12c1.09 0 2 .91 2 2v9c0 1.09-.91 2-2 2H4Zm7.75-3.97c.72-.83.98-1.86.98-2.94 0-1.65-.7-3.22-2.3-3.83a4.41 4.41 0 0 0-3.02 0 3.8 3.8 0 0 0-2.32 3.83c0 1.29.35 2.29 1.03 3a3.8 3.8 0 0 0 2.85 1.07c.62 0 1.2-.11 1.71-.34.65.44 1 .68 1.06.7.23.13.46.23.7.3l.59-1.13a5.2 5.2 0 0 1-1.28-.66Zm-1.27-.9a5.4 5.4 0 0 0-1.5-.8l-.45.9c.33.12.66.29.98.5-.2.07-.42.11-.65.11-.61 0-1.12-.23-1.52-.68-.86-1-.86-3.12 0-4.11.8-.9 2.35-.9 3.15 0 .9 1.01.86 3.03-.01 4.08Z"></path>
                  </svg>
                </span>
                <a
                  href="/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array?r=SearchResults"
                  className="text-sky-400 text-[17px]"
                >
                  Why is processing a sorted array faster than processing an
                  unsorted array?
                </a>
              </h3>
              <div className="text-[13px] mb-2 line-clamp-2">
                (Sorting itself takes more time than this one pass over the{" "}
                <span className="font-bold">array</span>, so it's not actually
                worth doing if we needed to calculate this for an unknown{" "}
                <span className="font-bold">array</span>.) … Why is processing a
                sorted <span className="font-bold">array</span> faster than
                processing an unsorted <span className="font-bold">array</span>?
                The code is summing up some independent terms, so the order
                should not matter. …
              </div>
              <div>
                <div>
                  <ul className="flex gap-2">
                    <li>
                      <a
                        href="/questions/tagged/java"
                        className="rounded bg-sky-200 py-1 px-2 text-[12px] text-sky-600"
                      >
                        java
                      </a>
                    </li>
                    <li>
                      <a
                        href="/questions/tagged/c%2b%2b"
                        className="rounded bg-sky-200 py-1 px-2 text-[12px] text-sky-600"
                      >
                        c++
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-2 items-center text-[12px] justify-end">
                  <a href="/users/87234/gmannickg">
                    {" "}
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
                      <a href="/users/87234/gmannickg" className="text-sky-400">
                        GManNickG
                      </a>
                    </div>

                    <ul>
                      <li>
                        <span className="font-bold">494k</span>
                      </li>
                    </ul>
                  </div>

                  <time>
                    asked <span>Jun 27, 2012 at 13:51</span>
                  </time>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex my-4 text-[13px] justify-between">
        <div className="flex gap-1 items-center">
          <div className="p-1 px-2 rounded bg-yellow-500 text-white">1</div>
          <a
            className="p-1 px-2 rounded border-gray border-[0.5px]"
            href="/search?page=2&amp;tab=Relevance&amp;pagesize=15&amp;q=array%20sort&amp;searchOn=3"
          >
            2
          </a>
          <a
            className="p-1 px-2 rounded border-gray border-[0.5px]"
            href="/search?page=3&amp;tab=Relevance&amp;pagesize=15&amp;q=array%20sort&amp;searchOn=3"
          >
            3
          </a>
          <a
            className="p-1 px-2 rounded border-gray border-[0.5px]"
            href="/search?page=4&amp;tab=Relevance&amp;pagesize=15&amp;q=array%20sort&amp;searchOn=3"
          >
            4
          </a>
          <a
            className="p-1 px-2 rounded border-gray border-[0.5px]"
            href="/search?page=5&amp;tab=Relevance&amp;pagesize=15&amp;q=array%20sort&amp;searchOn=3"
          >
            5
          </a>
          <div className="">…</div>
          <a
            className="p-1 px-2 rounded border-gray border-[0.5px]"
            href="/search?page=11788&amp;tab=Relevance&amp;pagesize=15&amp;q=array%20sort&amp;searchOn=3"
          >
            11788
          </a>
          <a
            className="p-1 px-2 rounded border-gray border-[0.5px]"
            href="/search?page=2&amp;tab=Relevance&amp;pagesize=15&amp;q=array%20sort&amp;searchOn=3"
          >
            {" "}
            Next
          </a>
        </div>
        <div className="flex items-center gap-1">
          <a
            href="/search?tab=Relevance&amp;pagesize=15&amp;q=array%20sort&amp;searchOn=3"
            className="p-1 px-2 rounded bg-yellow-500 text-white"
          >
            15
          </a>
          <a
            href="/search?tab=Relevance&amp;pagesize=30&amp;q=array%20sort&amp;searchOn=3"
            className="p-1 px-2 rounded border-gray border-[0.5px]"
          >
            30
          </a>
          <a
            href="/search?tab=Relevance&amp;pagesize=50&amp;q=array%20sort&amp;searchOn=3"
            className="p-1 px-2 rounded border-gray border-[0.5px]"
          >
            50
          </a>
          <span className="px-2">per page</span>
        </div>
      </div>
    </div>
  );
};

export default List;
