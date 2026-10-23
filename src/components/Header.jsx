import { Signal, Wifi } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const dark = ["/detail", "/order", "/delivery"].includes(pathname);

  return (
    <header className={`absolute inset-x-0 top-0 z-[9999] h-11 w-full ${dark ? "text-[#2F2D2C]" : "text-white"}`}>
      <span className="absolute left-3 top-3 flex h-[21px] w-[52px] items-center justify-center text-[15px] font-semibold leading-[21px]">9:41</span>
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-[3px]">
        <Signal className="h-[11px] w-4 shrink-0" strokeWidth={2}/>
        <Wifi className="h-[11px] w-[15px] shrink-0" strokeWidth={2}/>
        <div className="flex shrink-0 items-center">
          <div className="h-[11px] w-[22px] rounded-[3px] border border-current p-[1.5px]">
            <div className="h-full w-full rounded-[1px] bg-current"/>
          </div>
          <div className="ml-px h-1 w-[2px] rounded-r-sm bg-current"/>
        </div>
      </div>
    </header>
  );
}
