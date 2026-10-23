
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Star } from "lucide-react";

const features = [
  ["Quality Bean", "/assets/icons/bean.png"],
  ["Fast Delivery", "/assets/icons/fast delivery.png"],
  ["Extra Milk", "/assets/icons/milk.png"],
];
const sizes = ["S", "M", "L"];
const description =
  "A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk. It combines rich espresso with steamed milk for a smooth, creamy taste.";

export default function DetailItem() {
  const navigate = useNavigate();
  const coffee = useLocation().state?.coffee;
  const [size, setSize] = useState("M");
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedCoffees") || "[]").includes(coffee?.id);
    } catch {
      return false;
    }
  });

  const price = Number(coffee?.price || 0) + (size === "M" ? 0.5 : size === "L" ? 1 : 0);

  const toggleFavorite = () => {
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem("savedCoffees") || "[]"); }
    catch {}
    const updated = favorite
      ? saved.filter(id => id !== coffee.id)
      : [...new Set([...saved, coffee.id])];
    localStorage.setItem("savedCoffees", JSON.stringify(updated));
    setFavorite(!favorite);
  };

  if (!coffee) {
    return (
      <main className="mx-auto min-h-dvh w-full max-w-[440px] px-6 pt-[68px]">
        <button onClick={() => navigate("/home")} className="flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Home
        </button>
        <p className="mt-4 text-sm text-gray-500">Please select a coffee from the home page.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[440px] overflow-x-clip bg-white px-6 pb-44 pt-[68px] text-[#2F2D2C]">
      <div className="mx-auto w-full max-w-[364px]">
        <header className="flex h-11 items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="grid h-11 w-11 place-items-center rounded-xl bg-[#F9F9F9]">
            <ArrowLeft size={22} />
          </button>
          <h1 className="font-semibold">Detail</h1>
          <button onClick={toggleFavorite} aria-label="Toggle favorite" className="grid h-11 w-11 place-items-center rounded-xl bg-[#F9F9F9]">
            <Heart size={22} fill={favorite ? "#C67C4E" : "none"} stroke={favorite ? "#C67C4E" : "currentColor"} />
          </button>
        </header>

        <div className="mt-6 aspect-[327/202] overflow-hidden rounded-2xl bg-[#F9F9F9]">
          <img src={coffee.image} alt={coffee.name} className="h-full w-full object-cover" />
        </div>

        <section className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="break-words text-xl font-bold">{coffee.name}</h2>
            <p className="mt-1 text-xs text-[#9B9B9B]">{coffee.description || "Rich and smooth coffee"}</p>
            <p className="mt-3 flex items-center gap-1 text-sm">
              <Star size={17} fill="#FBBF24" stroke="#FBBF24" /> {coffee.rating ?? "4.8"}
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-3 gap-1.5">
            {features.map(([name, image]) => (
              <div key={name} title={name} className="grid h-9 w-9 place-items-center rounded-xl bg-[#F9F2ED]">
                <img src={image} alt={name} className="h-[22px] w-[22px] object-contain" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold">Description</h3>
          <p className="mt-2 text-sm leading-[21px] text-[#9B9B9B]">
            {expanded ? description : `${description.slice(0, 110)}...`}{" "}
            <button onClick={() => setExpanded(!expanded)} className="font-semibold text-[#C67C4E]">
              {expanded ? "Read Less" : "Read More"}
            </button>
          </p>
          <h3 className="mt-5 font-semibold">Size</h3>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {sizes.map(v => (
              <button key={v} onClick={() => setSize(v)} className={`h-[41px] rounded-xl border text-sm ${size === v ? "border-[#C67C4E] bg-[#FFF7F2] font-semibold text-[#C67C4E]" : "border-[#EAEAEA]"}`}>
                {v}
              </button>
            ))}
          </div>
        </section>
      </div>

      <footer className="fixed inset-x-0 bottom-[34px] z-40 mx-auto w-full max-w-[440px] bg-white px-6 pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex max-w-[364px] items-center gap-4 pb-3">
          <div className="w-[76px] shrink-0">
            <p className="text-xs text-[#9B9B9B]">Price</p>
            <p className="mt-1 text-lg font-bold text-[#C67C4E]">${price.toFixed(2)}</p>
          </div>
          <button onClick={() => navigate("/order", { state: { coffee, size, price, unitPrice: price } })} className="h-14 min-w-0 flex-1 rounded-2xl bg-[#C67C4E] px-3 font-semibold text-white">
            Buy Now
          </button>
        </div>
      </footer>
    </main>
  );
}
