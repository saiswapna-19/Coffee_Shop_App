import { useLocation } from "react-router-dom";

const hidden = ["/", "/saved", "/cart", "/notifications", "/delivery"];

export default function BottomSafeArea() {
  const { pathname } = useLocation();

  if (hidden.includes(pathname)) return null;

  return (
    <div className="pointer-events-none absolute bottom-0 left-0 z-[60] h-[34px] w-full bg-white">
      <div className="absolute bottom-[8px] left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-black" />
    </div>
  );
}