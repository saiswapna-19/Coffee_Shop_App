import { useLocation, useNavigate } from "react-router-dom";
import { House, Heart, ShoppingBag, Bell } from "lucide-react";

const items = [
  { label: "Home", icon: House, path: "/home" },
  { label: "Saved", icon: Heart, path: "/saved" },
  { label: "Cart", icon: ShoppingBag, path: "/cart" },
  { label: "Notification", icon: Bell, path: "/notifications" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="flex w-full items-center justify-around">
      {items.map(({ label, icon: Icon, path }) => {
        const active = pathname === path || (label === "Home" && pathname === "/") || (label === "Cart" && pathname === "/delivery");

        return (
          <button key={path} onClick={() => navigate(path)} aria-label={label} className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 ${active ? "text-[#C67C4E]" : "text-[#9B9B9B]"}`}>
            <Icon className="h-[22px] w-[22px] shrink-0" strokeWidth={active ? 2.5 : 1.8} />
            <span className="max-w-full truncate text-[10px]">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
