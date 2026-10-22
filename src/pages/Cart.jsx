import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { coffees } from "../data/coffeeData";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("coffeeCart")) || [];
    } catch {
      return [];
    }
  });
  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("coffeeCart", JSON.stringify(updated));
  };
  const changeQuantity = (id, amount) => {
    updateCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 1) + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const removeItem = (id) => {
    updateCart(cart.filter((item) => item.id !== id));
  };
  const items = cart.map((item) => {
    const coffee = coffees.find((c) => c.id === item.id);
    return { ...item, coffee };
  }).filter((item) => item.coffee);
  const subtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.price ?? item.coffee.price) * (item.quantity || 1),
    0
  );
  const deliveryFee = items.length ? 1.0 : 0;
  const total = subtotal + deliveryFee;
  return (
    <main className="mx-auto min-h-screen w-full max-w-[375px] bg-white pb-[125px] text-[#171717]">
      {/* Header */}
      <header className="flex h-[153px] flex-col justify-end bg-[#171717] px-[25px] pb-[28px] text-white">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/home")} aria-label="Go back">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-[24px] font-bold">My Cart</h1>
        </div>
        <p className="mt-[10px] text-[14px] text-gray-300">
          Your coffee, ready to enjoy
        </p>
      </header>
      {/* Cart items */}
      <section className="space-y-[15px] px-[25px] pt-[20px]">
        {items.length > 0 ? (
          items.map(({ id, coffee, price, quantity }) => (
            <article
              key={id}
              className="flex items-center gap-[12px] rounded-[17px] border border-[#E8E8E8] p-[12px]"
            >
              <img
                src={coffee.image}
                alt={coffee.name}
                className="h-[85px] w-[85px] shrink-0 rounded-[12px] bg-[#F9E9DF] object-cover"
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-[15px] font-semibold">{coffee.name}</h2>
                <p className="mt-1 text-[12px] text-gray-500">
                  {coffee.category || coffee.type || "Coffee"}
                </p>
                <p className="mt-2 text-[14px] font-semibold text-[#C67C4E]">
                  ${Number(price ?? coffee.price).toFixed(2)}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() => changeQuantity(id, -1)}
                    aria-label="Decrease quantity"
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#E8E8E8]"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-[13px] font-medium">{quantity || 1}</span>
                  <button
                    onClick={() => changeQuantity(id, 1)}
                    aria-label="Increase quantity"
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#C67C4E] text-white"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(id)}
                aria-label={`Remove ${coffee.name}`}
                className="shrink-0 text-[#C67C4E]"
              >
                <Trash2 size={19} />
              </button>
            </article>
          ))
        ) : (
          <div className="flex flex-col items-center py-[45px] text-center">
            <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#F9E9DF] text-[#C67C4E]">
              <ShoppingBag size={30} />
            </div>
            <h2 className="mt-4 text-[17px] font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-[13px] text-gray-500">
              Add your favorite coffee to get started.
            </p>
          </div>
        )}
      </section>
      {/* Order summary */}
      {items.length > 0 && (
        <section className="mx-[25px] mt-[24px] rounded-[17px] border border-[#E8E8E8] p-[18px]">
          <h2 className="text-[16px] font-semibold">Order Summary</h2>
          <div className="mt-4 flex justify-between text-[13px] text-gray-500">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="mt-3 flex justify-between text-[13px] text-gray-500">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="my-4 border-t border-dashed border-[#DDDDDD]" />
          <div className="flex justify-between text-[15px] font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate("/order", { state: { cart: items, total } })}
            className="mt-5 h-[52px] w-full rounded-[12px] bg-[#C67C4E] text-[16px] font-medium text-white"
          >
            Checkout
          </button>
        </section>
      )}
      {/* Continue shopping */}
      <div className="px-[25px] pt-[20px]">
        <button
          onClick={() => navigate("/home")}
          className="h-[55px] w-full rounded-[12px] bg-[#C67C4E] text-[16px] font-medium text-white"
        >
          Continue shopping
        </button>
      </div>
      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-1/2 z-50 h-[99px] w-full max-w-[375px] -translate-x-1/2 rounded-t-[24px] border-t border-[#EEEEEE] bg-white px-[25px] pb-[25px] pt-[20px]">
        <BottomNav />
      </div>
    </main>
  );
}
