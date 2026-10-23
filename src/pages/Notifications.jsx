
import { useNavigate } from "react-router-dom";
import { Bell, Gift, Coffee, ArrowRight } from "lucide-react";
import BottomNav from "../components/BottomNav";

const notifications = [
  { title: "Welcome to Coffee Bliss!", details: "Discover your favorite coffee and enjoy every sip.", time: "Just now", icon: Bell },
  { title: "Special Coffee Offer", details: "Enjoy special offers on your favorite coffee.", time: "2 hours ago", icon: Gift },
  { title: "Freshly Brewed for You", details: "Your next cup of happiness is waiting for you.", time: "Yesterday", icon: Coffee },
];

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[440px] overflow-x-clip bg-[#F9F9F9] pb-32 text-[#2F2D2C]">
      <header className="h-[153px] rounded-b-3xl bg-[#131313] px-6 pt-[65px] text-white">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="mt-2 text-[13px] text-gray-300">
          Updates and offers for you
        </p>
      </header>

      <section className="space-y-4 px-6 py-6">
        {notifications.map(({ title, details, time, icon: Icon }) => (
          <article
            key={title}
            className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F5E8DF] text-[#C67C4E]">
              <Icon size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="break-words text-sm font-semibold">{title}</h2>
              <p className="mt-1 break-words text-xs leading-5 text-gray-500">
                {details}
              </p>
              <p className="mt-2 text-[10px] text-gray-400">{time}</p>
            </div>
          </article>
        ))}

        <button
          onClick={() => navigate("/home")}
          className="flex h-[55px] w-full items-center justify-center gap-2 rounded-xl bg-[#C67C4E] text-[15px] font-medium text-white"
        >
          Continue shopping <ArrowRight size={18} />
        </button>
      </section>

      <div className="fixed bottom-0 left-1/2 z-50 h-[99px] w-full max-w-[440px] -translate-x-1/2 rounded-t-3xl bg-white px-4 pb-[34px] pt-5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <BottomNav />
      </div>
    </main>
  );
}
