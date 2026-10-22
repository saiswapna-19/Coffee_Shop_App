import { Signal, Wifi } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  // Dark icons only on pages with a white background
  const darkIcons = ["/detail", "/order", "/delivery"].includes(pathname);

  return (
    <header
      className={`fixed left-1/2 top-0 z-[9999] h-[44px] w-full max-w-[375px] -translate-x-1/2 bg-transparent ${
        darkIcons ? "text-[#2F2D2C]" : "text-white"
      }`}
    >
      {/* Time */}
      <div className="absolute left-[12px] top-[12px] flex h-[21px] w-[52px] items-center justify-center">
        <span className="text-[15px] font-semibold leading-[21px]">9:41</span>
      </div>

      {/* Status Icons */}
      <div className="absolute left-[283.67px] top-[17.33px] flex h-[11.34px] w-[66.66px] items-center gap-[2px]">
        <Signal className="h-[10.67px] w-[17px] shrink-0" strokeWidth={3} />
        <Wifi className="h-[10.97px] w-[15.27px] shrink-0" strokeWidth={3} />

        {/* Battery */}
        <div className="flex shrink-0 items-center">
          <div className="h-[11.33px] w-[24.33px] rounded-[2px] border border-current p-[1.5px]">
            <div className="h-full w-full rounded-[1px] bg-current" />
          </div>
          <div className="ml-[1px] h-[4px] w-[2px] rounded-r-sm bg-current" />
        </div>
      </div>
    </header>
  );
}
