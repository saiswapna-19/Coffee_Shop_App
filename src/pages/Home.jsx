
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, ChevronDown, Star, Heart } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { categories, coffees } from "../data/coffeeData";

const locations = ["Bilzen, Tanjungbalai", "Guntur, Andhra Pradesh", "Hyderabad, Telangana", "Bangalore, Karnataka"];

export default function Home() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All Coffee");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(locations[0]);
  const [showLocations, setShowLocations] = useState(false);
  const [savedIds, setSavedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("savedCoffees") || "[]"); }
    catch { return []; }
  });

  const filtered = coffees.filter(c =>
    (category === "All Coffee" || c.category === category) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = c => {
    const ids = savedIds.includes(c.id)
      ? savedIds.filter(id => id !== c.id)
      : [...savedIds, c.id];
    setSavedIds(ids);
    localStorage.setItem("savedCoffees", JSON.stringify(ids));
  };

  const addToCart = c => {
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem("coffeeCart") || "[]"); }
    catch {}
    const item = cart.find(i => i.id === c.id);
    localStorage.setItem("coffeeCart", JSON.stringify(
      item
        ? cart.map(i => i.id === c.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i)
        : [...cart, { id: c.id, price: Number(c.price), quantity: 1 }]
    ));
    navigate("/cart");
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[440px] overflow-x-clip bg-[#F9F9F9] pb-[120px] text-[#2F2D2C]">
      <header className="relative h-[280px] bg-[#131313] text-white">
        <div className="absolute left-6 right-6 top-[68px] z-30">
          <p className="text-xs text-[#B7B7B7]">Location</p>
          <button onClick={() => setShowLocations(v => !v)} className="mt-1 flex max-w-full items-center gap-1 text-sm font-semibold">
            <span className="truncate">{location}</span>
            <ChevronDown size={16} className={showLocations ? "rotate-180" : ""} />
          </button>
          {showLocations && (
            <div className="absolute top-12 z-50 w-[230px] max-w-full rounded-xl bg-white py-1 text-sm text-[#2F2D2C] shadow-xl">
              {locations.map(l => (
                <button key={l} onClick={() => { setLocation(l); setShowLocations(false); }} className="block w-full px-4 py-3 text-left hover:bg-gray-100">{l}</button>
              ))}
            </div>
          )}
        </div>

        <div className="absolute left-6 right-6 top-[135px] flex h-[52px] gap-3 sm:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-[#313131] px-3 sm:px-4">
            <Search size={20} className="shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search coffee" className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-[#B7B7B7]" />
          </div>
          <button onClick={() => setCategory("All Coffee")} aria-label="Reset filter" className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-[#C67C4E]">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </header>

      <section className="relative z-20 mx-6 -mt-[69px] h-[140px] overflow-hidden rounded-2xl">
        <img src="/assets/Banner 1.png" alt="Coffee promotion" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute left-4 top-[13px] text-white">
          <span className="rounded bg-[#ED5151] px-2 py-1 text-sm font-semibold">Promo</span>
          <p className="mt-5 w-fit bg-black px-1 text-[clamp(20px,6vw,24px)] font-semibold leading-none">Buy one get</p>
          <p className="mt-1 w-fit bg-black px-1 text-[clamp(20px,6vw,24px)] font-semibold leading-none">one Free</p>
        </div>
      </section>

      <section className="w-full px-4 pb-6 pt-6">
        <div className="flex h-9 gap-3 overflow-x-auto whitespace-nowrap [scrollbar-width:none]">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`shrink-0 rounded-lg px-3 text-sm font-semibold ${category === c ? "bg-[#C67C4E] text-white" : ""}`}>{c}</button>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {filtered.map(c => (
            <article key={c.id} className="min-w-0 rounded-2xl bg-white p-2 pb-3 shadow-sm">
              <div className="relative aspect-[1.1/1] overflow-hidden rounded-xl bg-[#EDEDED]">
                <button onClick={() => navigate("/detail", { state: { coffee: c } })} className="h-full w-full" aria-label={`View ${c.name}`}>
                  <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
                </button>
                <span className="absolute right-1 top-1 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
                  <Star size={12} fill="#FBBF24" stroke="#FBBF24" />{c.rating}
                </span>
                <button onClick={() => toggleFavorite(c)} aria-label={`Save ${c.name}`} className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Heart size={17} fill={savedIds.includes(c.id) ? "#C67C4E" : "none"} stroke="#C67C4E" />
                </button>
              </div>
              <h3 className="mt-2 truncate text-sm font-semibold">{c.name}</h3>
              <p className="mt-0.5 truncate text-xs text-[#9B9B9B]">{c.description}</p>
              <div className="mt-2 flex items-center justify-between gap-1">
                <p className="truncate text-base font-bold"><span className="text-[#C67C4E]">$</span>{Number(c.price).toFixed(2)}</p>
                <button onClick={() => addToCart(c)} aria-label={`Add ${c.name} to cart`} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C67C4E] text-xl text-white">+</button>
              </div>
            </article>
          ))}
        </div>
        {!filtered.length && <p className="mt-8 text-center text-sm text-gray-500">No coffee found.</p>}
      </section>

      <div className="fixed bottom-0 left-1/2 z-40 h-[99px] w-full max-w-[440px] -translate-x-1/2 rounded-t-[24px] bg-white px-4 pb-[34px] pt-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <BottomNav />
      </div>
    </main>
  );
}
