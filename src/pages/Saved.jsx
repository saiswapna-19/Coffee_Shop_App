import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, Coffee, ArrowLeft } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { coffees } from "../data/coffeeData";

export default function Saved() {
  const navigate = useNavigate();

  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedCoffees")) || [];
    } catch {
      return [];
    }
  });

  const savedCoffees = coffees.filter((coffee) =>
    savedIds.includes(coffee.id)
  );

  const removeSaved = (id) => {
    const updated = savedIds.filter((savedId) => savedId !== id);
    setSavedIds(updated);
    localStorage.setItem("savedCoffees", JSON.stringify(updated));
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-[375px] bg-white pb-[125px] text-[#171717]">
      <header className="flex h-[153px] flex-col justify-end bg-[#171717] px-[25px] pb-[28px] text-white">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/home")} aria-label="Go back">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-[24px] font-bold">My Favorites</h1>
        </div>
        <p className="mt-[10px] text-[14px] text-gray-300">
          Your favorite coffee collection
        </p>
      </header>
      <section className="space-y-[15px] px-[25px] pt-[20px]">
        {savedCoffees.length > 0 ? (
          savedCoffees.map((coffee) => (
            <article
              key={coffee.id}
              className="flex min-h-[112px] items-center gap-[15px] rounded-[17px] border border-[#E8E8E8] p-[12px]"
            >
              <button
                onClick={() => navigate("/detail", { state: { coffee } })}
                className="h-[85px] w-[85px] shrink-0 overflow-hidden rounded-[12px] bg-[#F9E9DF]"
              >
                <img
                  src={coffee.image}
                  alt={coffee.name}
                  className="h-full w-full object-cover"
                />
              </button>
              <div className="min-w-0 flex-1">
                <h2 className="text-[15px] font-semibold">{coffee.name}</h2>
                <p className="mt-1 text-[12px] text-gray-500">
                  {coffee.category || coffee.type || "Coffee"}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[12px]">
                  <Star size={14} className="fill-[#C67C4E] text-[#C67C4E]" />
                  {coffee.rating || "4.8"}
                </div>
                <p className="mt-1 text-[14px] font-semibold text-[#C67C4E]">
                  ${Number(coffee.price).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeSaved(coffee.id)}
                aria-label={`Remove ${coffee.name}`}
                className="shrink-0 text-[#C67C4E]"
              >
                <Heart size={22} className="fill-[#C67C4E]" />
              </button>
            </article>
          ))
        ) : (
          <div className="flex flex-col items-center py-[55px] text-center">
            <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#F9E9DF] text-[#C67C4E]">
              <Coffee size={30} />
            </div>
            <h2 className="mt-4 text-[17px] font-semibold">
              No favorites yet
            </h2>
            <p className="mt-2 text-[13px] text-gray-500">
              Tap the heart on a coffee to save it here.
            </p>
          </div>
        )}
        <button
          onClick={() => navigate("/home")}
          className="h-[60px] w-full rounded-[12px] bg-[#C67C4E] text-[18px] font-medium text-white"
        >
          Continue shopping
        </button>
      </section>
      <div className="fixed bottom-0 left-1/2 z-50 h-[99px] w-full max-w-[375px] -translate-x-1/2 rounded-t-[24px] border-t border-[#EEEEEE] bg-white px-[25px] pb-[25px] pt-[20px]">
        <BottomNav />
      </div>
    </main>
  );
}