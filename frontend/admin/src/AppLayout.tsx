import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { useStateContext } from "./contexts/ContextProvider";

export function AppLayout() {
  const { activeMenu } = useStateContext();

  return (
    <>
      <div className="flex relative">
        {activeMenu ? (
          <div className="w-72 fixed sidebar bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0">
            <Sidebar />
          </div>
        )}

        <div className={`bg-main-bg min-h-screen w-full ${activeMenu ? "md:ml-72" : "flex-2"}`}>
          <div className="fixed md:static bg-main-bg navbar w-full">
            <Navbar />
          </div>

          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>

  );
}
