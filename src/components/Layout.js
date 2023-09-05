import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col h-[100vh] pt-[56px]">
      <Header />
      <div className="container mx-auto flex flex-[1_0_auto]">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
