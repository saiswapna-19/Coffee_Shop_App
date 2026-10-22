import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Star } from "lucide-react";

const features = [
  { name: "Quality Bean", image: "/assets/icons/bean.png" },
  { name: "Fast Delivery", image: "/assets/icons/fast delivery.png" },
  { name: "Extra Milk", image: "/assets/icons/milk.png" },
];

const sizes = ["S", "M", "L"];

const description =
  "A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk. It combines rich espresso with steamed milk for a smooth, creamy taste.";

export default function DetailItem() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const coffee = state?.coffee;

  const [size, setSize] = useState("M");
  const [favorite, setFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const price =
    Number(coffee?.price || 0) +
    (size === "M" ? 0.5 : size === "L" ? 1 : 0);

  if (!coffee) {
    return (
      <main className="mx-auto min-h-[812px] w-full max-w-[375px] bg-white p-6 pt-[68px] text-[#2F2D2C]">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Please select a coffee from the home page.
        </p>
      </main>
    );
  }

  return (
    <main className="relative mx-auto min-h-[812px] w-full max-w-[375px] overflow-x-hidden bg-white pb-[170px] text-[#2F2D2C]">
      {/* Header */}
      <header className="absolute left-6 top-[68px] flex h-11 w-[327px] items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="grid h-11 w-11 place-items-center rounded-xl bg-[#F9F9F9]"
        >
          <ArrowLeft size={22} />
        </button>

        <h1 className="font-semibold">Detail</h1>

        <button
          onClick={() => setFavorite(!favorite)}
          aria-label="Toggle favorite"
          className="grid h-11 w-11 place-items-center rounded-xl bg-[#F9F9F9]"
        >
          <Heart
            size={22}
            fill={favorite ? "#C67C4E" : "none"}
            stroke={favorite ? "#C67C4E" : "currentColor"}
          />
        </button>
      </header>

      {/* Coffee Image */}
      <img
        src={coffee.image}
        alt={coffee.name}
        className="absolute left-6 top-[136px] h-[202px] w-[327px] rounded-2xl object-cover"
      />

      {/* Coffee Information */}
      <section className="absolute left-6 top-[354px] flex w-[327px] justify-between">
        <div className="w-[155px]">
          <h2 className="text-xl font-bold">{coffee.name}</h2>
          <p className="mt-1 text-xs text-[#9B9B9B]">
            {coffee.description || "Rich and smooth coffee"}
          </p>
          <p className="mt-3 flex items-center gap-1 text-sm">
            <Star size={17} fill="#FBBF24" stroke="#FBBF24" />
            {coffee.rating ?? "4.8"}
          </p>
        </div>

        <div className="flex w-[156px] justify-between">
          {features.map((feature) => (
            <div
              key={feature.name}
              title={feature.name}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F9F2ED]"
            >
              <img
                src={feature.image}
                alt={feature.name}
                className="h-[22px] w-[22px] object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Description and Size */}
      <section className="absolute left-6 top-[470px] w-[327px]">
        <h3 className="font-semibold">Description</h3>

        <p className="mt-2 text-sm leading-[21px] text-[#9B9B9B]">
          {expanded ? description : `${description.slice(0, 110)}...`}
          {" "}
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="inline font-semibold text-[#C67C4E]"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        </p>

        {/* Moves down automatically when description expands */}
        <div className="mt-5">
          <h3 className="font-semibold">Size</h3>

          <div className="mt-2 flex gap-3">
            {sizes.map((value) => (
              <button
                key={value}
                onClick={() => setSize(value)}
                className={`h-[41px] w-[96px] rounded-xl border text-sm ${
                  size === value
                    ? "border-[#C67C4E] bg-[#FFF7F2] text-[#C67C4E]"
                    : "border-[#EAEAEA]"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Price and Buy Now */}
      <footer className="absolute bottom-[34px] left-1/2 z-40 flex h-[118px] w-full max-w-[375px] -translate-x-1/2 items-start gap-[34px] bg-white px-6 pt-4">
        <div className="w-[76px] shrink-0">
          <p className="text-xs text-[#9B9B9B]">Price</p>
          <p className="mt-1 text-lg font-bold text-[#C67C4E]">
            ${price.toFixed(2)}
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/order", { state: { coffee, size, price } })
          }
          className="h-14 w-[217px] shrink-0 rounded-2xl bg-[#C67C4E] px-5 font-semibold text-white"
        >
          Buy Now
        </button>
      </footer>
    </main>
  );
}