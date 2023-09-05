import { Link } from "react-router-dom";
const Rightbar = ({ children }) => {
  return (
    <div className="flex lg:flex lg:min-w-[300px] lg:w-[300px]">
      {children}
    </div>
  );
};

export default Rightbar;
