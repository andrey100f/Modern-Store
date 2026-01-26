import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { useStateContext } from "../../contexts/ContextProvider.tsx";

function Navbar() {
  const { setActiveMenu, screenSize, setScreenSize } = useStateContext();

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

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <TooltipComponent content="Menu" position="BottomCenter">
        <button type="button" onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} style={{ color: "blue" }} className="relative text-xl rounded-full p-3 hover:bg-gray-50">
          <AiOutlineMenu />
        </button>
      </TooltipComponent>
    </div>
  );
}

export default Navbar;