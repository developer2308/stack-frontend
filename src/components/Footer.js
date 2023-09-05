import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-600">
      <div className="container mx-auto flex flex-wrap gap-4 text-[13px] text-gray-400 py-8 px-2">
        <div className="hidden sm:flex flex-[0_0_64px]">
          <a href="https://stackoverflow.com">
            <svg aria-hidden="true" width="32" height="37" viewBox="0 0 32 37">
              <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path>
              <path
                d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
                fill="#F48024"
              ></path>
            </svg>
          </a>
        </div>
        <nav className="flex flex-wrap flex-col sm:flex-row gap-4 flex-[2_1_auto]">
          <div className="flex-[1_0_auto]">
            <h5 className="font-bold uppercase text-white">
              <a href="https://stackoverflow.com">Stack Overflow</a>
            </h5>
            <ul>
              <li>
                <a href="/questions">Questions</a>
              </li>
              <li>
                <a href="/help">Help</a>
              </li>
            </ul>
          </div>
          <div className="flex-[1_0_auto]">
            <h5 className="font-bold uppercase text-white">
              <a href="https://stackoverflow.co/">Products</a>
            </h5>
            <ul>
              <li>
                <a href="https://stackoverflow.co/teams/">Teams</a>
              </li>
              <li>
                <a href="https://stackoverflow.co/advertising/">Advertising</a>
              </li>
            </ul>
          </div>
          <div className="flex-[1_0_auto]">
            <div>
              <h5 className="font-bold uppercase text-white">
                <a href="https://stackexchange.com">Stack Exchange Network</a>
              </h5>
              <ul>
                <li>
                  <a href="https://stackexchange.com/sites#technology">
                    Technology
                  </a>
                </li>

                <li>
                  <a href="https://api.stackexchange.com/">API</a>
                </li>

                <li>
                  <a href="https://data.stackexchange.com/">Data</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="flex flex-col flex-[1_1_150px] text-[11px]">
          <ul className="flex flex-1 gap-5">
            <li>
              <a href="https://stackoverflow.blog?blb=1">Blog</a>
            </li>
            <li>
              <a href="https://www.facebook.com/officialstackoverflow/">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com/stackoverflow">Twitter</a>
            </li>
            <li>
              <a href="https://linkedin.com/company/stack-overflow">LinkedIn</a>
            </li>
            <li>
              <a href="https://www.instagram.com/thestackoverflow">Instagram</a>
            </li>
          </ul>

          <p className="">
            Site design / logo © 2023 Stack Exchange Inc; user contributions
            licensed under{" "}
            <span>
              <a href="https://stackoverflow.com/help/licensing">CC BY-SA</a>
            </span>
            . <span>rev&nbsp;2023.9.4.43608</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
