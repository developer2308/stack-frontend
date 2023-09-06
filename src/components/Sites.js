import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { formatCount, setSiteInfo } from "../helper";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Sites = () => {
  const navigate = useNavigate();

  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSites = async () => {
      setIsLoading(true);
      const url = `${process.env.REACT_APP_API_HOST}/sites`;
      console.log(url, process.env.NODE_ENV);
      const res = await fetch(url);
      const json = await res.json();
      setIsLoading(false);
      setSites(json);
    };

    fetchSites();
  }, []);

  const goToSite = (site) => {
    setSiteInfo(site);
    navigate("/");
  };

  return (
    <div className="m-8">
      <div className="text-[22px] font-bold border-b-[0.5px] pb-1">
        <h2>Choose a Site</h2>
      </div>
      {!sites || !sites.length ? (
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
            <div className="mt-3">We couldn't find anything</div>
          </div>
        </div>
      ) : (
        <div>
          {sites.map((site, index) => (
            <div key={index} className="flex flex-col lg:flex-row gap-4 p-2 border-b-[0.5px] md:border-0">
              <div className="flex flex-1">
                <a href={site["Url"]}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/images/site_icon_${site["Id"]}.png`
                    }
                    alt={site["Name"]}
                    height="70"
                    width="70"
                  />
                </a>
                <div className="details flex-1">
                  <h2 className="text-[18px] text-sky-500">
                    <a href={site["Url"]}>{site["Name"]}</a>
                  </h2>
                  <p className="text-[13px] text-gray-500">{site["Tagline"]}</p>
                </div>
              </div>
              <div className="flex flex-1 items-center">
                <div className="stats flex flex-1 items-end">
                  <div className="flex flex-col flex-1">
                    <span className="text-[22px] text-sky-500">
                      {formatCount(site["TotalQuestions"])}
                    </span>
                    <span className="text-[12px] text-gray-500">questions</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[22px] text-sky-500">
                      {formatCount(site["TotalAnswers"])}
                    </span>
                    <span className="text-[12px] text-gray-500">answers</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[22px] text-sky-500">
                      {formatCount(site["TotalComments"])}
                    </span>
                    <span className="text-[12px] text-gray-500">comments</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[22px] text-sky-500">
                      {formatCount(site["TotalTags"])}
                    </span>
                    <span className="text-[12px] text-gray-500">tags</span>
                  </div>
                </div>
                <div className="text-[12px] text-gray-500">
                  <span
                    onClick={() => goToSite(site)}
                    className="hover:cursor-pointer"
                  >
                    visit site <FaArrowRight className="inline" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default Sites;
