import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, Coffee, ArrowLeft } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { coffees } from "../data/coffeeData";

export default function Saved() {
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("savedCoffees")) || []; }
    catch { return []; }
  });

  const saved = coffees.filter(c => savedIds.includes(c.id));
  const removeSaved = id => {
    const ids = savedIds.filter(i => i !== id);
    setSavedIds(ids);
    localStorage.setItem("savedCoffees", JSON.stringify(ids));
  };

  return (
    <main className="min-h-dvh w-full overflow-x-clip bg-white pb-[140px] text-[#171717]">
      <header className="flex h-[153px] flex-col justify-end bg-[#171717] px-4 pb-7 text-white">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/home")} aria-label="Go back"><ArrowLeft size={22} /></button>
          <h1 className="text-2xl font-bold">My Favorites</h1>
        </div>
        <p className="mt-2 pl-[52px] text-sm text-gray-300">Your favorite coffee collection</p>
      </header>

      <section className="space-y-4 px-4 pt-5">
        {saved.length ? saved.map(c => (
          <article key={c.id} className="flex min-w-0 items-center gap-3 rounded-[17px] border border-[#E8E8E8] p-3">
            <button onClick={() => navigate("/detail", { state: { coffee: c } })} className="h-[68px] w-[68px] shrink-0 overflow-hidden rounded-xl bg-[#F9E9DF]">
              <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
            </button>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-[15px] font-semibold">{c.name}</h2>
              <p className="mt-1 truncate text-xs text-gray-500">{c.category || c.type || "Coffee"}</p>
              <div className="mt-2 flex items-center gap-1 text-xs"><Star size={14} className="fill-[#C67C4E] text-[#C67C4E]" />{c.rating || "4.8"}</div>
              <p className="mt-1 text-sm font-semibold text-[#C67C4E]">${Number(c.price).toFixed(2)}</p>
            </div>
            <button onClick={() => removeSaved(c.id)} aria-label={`Remove ${c.name}`} className="grid h-9 w-9 shrink-0 place-items-center text-[#C67C4E]">
              <Heart size={22} className="fill-[#C67C4E]" />
            </button>
          </article>
        )) : (
          <div className="flex flex-col items-center py-14 text-center">
            <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#F9E9DF] text-[#C67C4E]"><Coffee size={30} /></div>
            <h2 className="mt-4 text-[17px] font-semibold">No favorites yet</h2>
            <p className="mt-2 max-w-xs text-[13px] text-gray-500">Tap the heart on a coffee to save it here.</p>
          </div>
        )}
        <button onClick={() => navigate("/home")} className="h-14 w-full rounded-xl bg-[#C67C4E] text-base font-medium text-white">Continue shopping</button>
      </section>

      <div className="fixed bottom-0 left-1/2 z-50 h-[99px] w-full max-w-[375px] -translate-x-1/2 rounded-t-[24px] border-t border-[#EEEEEE] bg-white px-4 pb-[34px] pt-5">
        <BottomNav />
      </div>
    </main>
  );
}
