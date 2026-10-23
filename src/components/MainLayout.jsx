import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import BottomSafeArea from "./BottomSafeArea";

const hiddenHeader = ["/saved", "/notifications", "/cart", "/delivery"];

export default function MainLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-dvh w-full overflow-x-clip bg-[#E8E8E8]">
      <div className="relative mx-auto min-h-dvh w-full max-w-[440px] overflow-x-clip bg-white shadow-xl">
        {!hiddenHeader.includes(pathname) && <Header />}
        <Outlet />
        <BottomSafeArea />
      </div>
    </div>
  );
}
