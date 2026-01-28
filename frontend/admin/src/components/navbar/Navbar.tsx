import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { useStateContext } from "../../contexts/ContextProvider.tsx";
import {CiLogout} from "react-icons/ci";
import {useNavigate} from "react-router-dom";

function Navbar() {
  const { setActiveMenu, screenSize, setScreenSize } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <TooltipComponent content="Menu" position="BottomCenter">
        <button type="button" onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} style={{ color: "blue" }} className="relative text-xl rounded-full p-3 hover:bg-blue-100">
          <AiOutlineMenu />
        </button>
      </TooltipComponent>

      <TooltipComponent content="Logout" position="BottomCenter">
        <button
          onClick={handleLogout}
          style={{ color: "red" }} className="flex gap-2 items-center relative text-xl rounded-full p-3 hover:bg-red-100">
          <CiLogout />
          Logout
        </button>
      </TooltipComponent>
    </div>
  );
}

export default Navbar;