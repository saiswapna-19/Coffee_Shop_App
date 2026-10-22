import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, ChevronDown, Star, Heart } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { categories, coffees } from "../data/coffeeData";

const locations = [
  "Bilzen, Tanjungbalai",
  "Guntur, Andhra Pradesh",
  "Hyderabad, Telangana",
  "Bangalore, Karnataka",
];

export default function Home() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All Coffee");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(locations[0]);
  const [showLocations, setShowLocations] = useState(false);
  const [savedIds, setSavedIds] = useState(() =>
    JSON.parse(localStorage.getItem("savedCoffees") || "[]")
  );

  const filtered = coffees.filter(
    (c) =>
      (category === "All Coffee" || c.category === category) &&
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (coffee) => {
    const updated = savedIds.includes(coffee.id)
      ? savedIds.filter((id) => id !== coffee.id)
      : [...savedIds, coffee.id];
    setSavedIds(updated);
    localStorage.setItem("savedCoffees", JSON.stringify(updated));
  };

  const addToCart = (coffee) => {
    const cart = JSON.parse(localStorage.getItem("coffeeCart") || "[]");
    const existing = cart.find((item) => item.id === coffee.id);
    const updated = existing
      ? cart.map((item) =>
          item.id === coffee.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      : [...cart, { id: coffee.id, price: Number(coffee.price), quantity: 1 }];

    localStorage.setItem("coffeeCart", JSON.stringify(updated));
    navigate("/cart");
  };

  return (
    <main className="relative mx-auto min-h-[812px] max-w-[375px] overflow-x-hidden bg-[#F9F9F9] pb-[115px] text-[#2F2D2C]">
      {/* Header */}
      <header className="relative h-[280px] bg-[#131313] text-white">
        <div className="absolute left-6 top-[68px] z-30 w-[327px]">
          <p className="text-xs text-[#B7B7B7]">Location</p>
          <button
            onClick={() => setShowLocations(!showLocations)}
            className="mt-1 flex items-center gap-1 text-sm font-semibold"
          >
            {location}
            <ChevronDown
              size={16}
              className={`transition-transform ${showLocations ? "rotate-180" : ""}`}
            />
          </button>

          {showLocations && (
            <div className="absolute left-0 top-[48px] w-[230px] overflow-hidden rounded-xl bg-white py-1 text-[#2F2D2C] shadow-xl">
              {locations.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setLocation(item);
                    setShowLocations(false);
                  }}
                  className={`block w-full px-4 py-3 text-left text-sm hover:bg-[#F9E9DF] ${
                    location === item ? "font-semibold text-[#C67C4E]" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="absolute left-6 top-[135px] flex h-[52px] w-[327px] gap-4">
          <div className="flex w-[259px] items-center gap-2 rounded-xl bg-[#313131] p-4">
            <Search size={20} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coffee"
              aria-label="Search coffee"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#989898]"
            />
          </div>
          <button
            onClick={() => setCategory("All Coffee")}
            aria-label="Reset coffee filter"
            className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-[#C67C4E]"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </header>

      {/* Promotion */}
      <section className="absolute left-6 top-[211px] z-20 h-[140px] w-[327px] overflow-hidden rounded-2xl">
        <img src="/assets/Banner 1.png" alt="Coffee promotion" className="h-full w-full object-cover" />
        <div className="absolute left-6 top-[13px] text-white">
          <span className="rounded bg-[#ED5151] px-2 py-1 text-sm font-semibold">Promo</span>
          <div className="absolute left-[1px] top-[34px]">
            <h2 className="absolute left-0 top-[15px] flex h-[27px] w-[200px] items-center whitespace-nowrap bg-black px-1 text-[32px] font-semibold leading-none">
              <span className="-translate-y-[11px]">Buy one get</span>
            </h2>
            <p className="absolute left-0 top-[54px] flex h-[23px] w-[149px] items-center whitespace-nowrap bg-black px-1 text-[32px] font-semibold leading-none">
              <span className="-translate-y-[11px]">one Free</span>
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative mt-[95px] px-6 pb-6">
        <div className="flex h-[29px] gap-4 overflow-x-auto whitespace-nowrap [scrollbar-width:none]">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-lg px-3 text-sm font-semibold ${
                category === item ? "bg-[#C67C4E] text-white" : "text-[#2F2D2C]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Coffee Cards */}
        <div className="mt-5 grid grid-cols-2 gap-x-[15px] gap-y-4">
          {filtered.map((coffee) => (
            <article key={coffee.id} className="min-w-0 rounded-2xl bg-white p-2 pb-3 shadow-sm">
              <div className="relative h-[128px] w-full overflow-hidden rounded-xl bg-[#EDEDED]">
                <button onClick={() => navigate("/detail", { state: { coffee } })} className="h-full w-full">
                  <img src={coffee.image} alt={coffee.name} className="h-full w-full object-cover" />
                </button>
                <span className="absolute right-1 top-1 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
                  <Star size={12} fill="#FBBF24" stroke="#FBBF24" /> {coffee.rating}
                </span>
                <button
                  onClick={() => toggleFavorite(coffee)}
                  aria-label={`Save ${coffee.name}`}
                  className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                >
                  <Heart size={17} fill={savedIds.includes(coffee.id) ? "#C67C4E" : "none"} stroke="#C67C4E" />
                </button>
              </div>
              <h3 className="mt-2 truncate font-semibold">{coffee.name}</h3>
              <p className="mt-0.5 truncate text-xs text-[#9B9B9B]">{coffee.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-lg font-bold"><span className="text-[#C67C4E]">$</span>{Number(coffee.price).toFixed(2)}</p>
                <button onClick={() => addToCart(coffee)} aria-label={`Add ${coffee.name} to cart`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C67C4E] text-xl text-white">+</button>
              </div>
            </article>
          ))}
        </div>

        {!filtered.length && <p className="mt-8 text-center text-sm text-gray-500">No coffee found.</p>}
      </section>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 z-40 h-[99px] w-full max-w-[375px] -translate-x-1/2 rounded-t-[24px] bg-white px-6 pb-6 pt-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <BottomNav />
      </div>
    </main>
  );
}
