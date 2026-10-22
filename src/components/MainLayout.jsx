import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import BottomSafeArea from "./BottomSafeArea";

export default function MainLayout() {
  const { pathname } = useLocation();

  const hideHeader = [
    "/saved",
    "/notifications",
    "/cart",
    "/delivery",
  ].includes(pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <Outlet />
      <BottomSafeArea />
    </>
  );
}
