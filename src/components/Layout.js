import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <div className="container mx-auto flex flex-[1_0_auto]">
        <Sidebar />
        <div className="border-l-[0.5px]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
