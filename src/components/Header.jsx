import { Signal, Wifi } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const darkIcons = ["/detail", "/order", "/delivery"].includes(pathname);

  return (
    <header className={`absolute inset-x-0 top-0 z-[9999] h-[44px] w-full ${
      darkIcons ? "text-[#2F2D2C]" : "text-white"
    }`}>
      <div className="relative h-full w-full">
        <span className="absolute left-3 top-3 flex h-[21px] w-[52px] items-center justify-center text-[15px] font-semibold leading-[21px]">
          9:41
        </span>

        <div className="absolute right-3 top-[17px] flex h-3 items-center gap-[3px]">
          <Signal className="h-[11px] w-[17px] shrink-0" strokeWidth={2.5} />
          <Wifi className="h-[11px] w-[15px] shrink-0" strokeWidth={2.5} />
          <div className="flex shrink-0 items-center">
            <div className="h-[11px] w-[24px] rounded-[2px] border border-current p-[1.5px]">
              <div className="h-full w-full rounded-[1px] bg-current" />
            </div>
            <div className="ml-px h-1 w-[2px] rounded-r-sm bg-current" />
          </div>
        </div>
      </div>
    </header>
  );
}
