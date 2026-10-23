import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { coffees } from "../data/coffeeData";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("coffeeCart")) || []; }
    catch { return []; }
  });

  const updateCart = items => {
    setCart(items);
    localStorage.setItem("coffeeCart", JSON.stringify(items));
  };

  const changeQuantity = (id, amount) =>
    updateCart(cart.map(i => i.id === id ? { ...i, quantity: (i.quantity || 1) + amount } : i)
      .filter(i => i.quantity > 0));

  const items = cart.map(i => ({ ...i, coffee: coffees.find(c => c.id === i.id) }))
    .filter(i => i.coffee);
  const subtotal = items.reduce((sum, i) => sum + Number(i.price ?? i.coffee.price) * (i.quantity || 1), 0);
  const fee = items.length ? 1 : 0;
  const total = subtotal + fee;
  const money = n => `$${n.toFixed(2)}`;

  return (
    <main className="min-h-dvh w-full overflow-x-clip bg-white pb-[140px] text-[#171717]">
      <header className="flex h-[153px] flex-col justify-end bg-[#171717] px-4 pb-7 text-white">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/home")} aria-label="Go back"><ArrowLeft size={22} /></button>
          <h1 className="text-2xl font-bold">My Cart</h1>
        </div>
        <p className="mt-2 pl-[52px] text-sm text-gray-300">Your coffee, ready to enjoy</p>
      </header>

      <div className="px-4">
        <section className="space-y-4 pt-5">
          {items.length ? items.map(({ id, coffee, price, quantity }) => (
            <article key={id} className="flex min-w-0 items-center gap-2 rounded-[17px] border border-[#E8E8E8] p-3">
              <img src={coffee.image} alt={coffee.name} className="h-[68px] w-[68px] shrink-0 rounded-xl bg-[#F9E9DF] object-cover" />
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-[15px] font-semibold">{coffee.name}</h2>
                <p className="mt-1 truncate text-xs text-gray-500">{coffee.category || coffee.type || "Coffee"}</p>
                <p className="mt-2 text-sm font-semibold text-[#C67C4E]">{money(Number(price ?? coffee.price))}</p>
                <div className="mt-2 flex items-center gap-3">
                  <button onClick={() => changeQuantity(id, -1)} aria-label="Decrease quantity" className="grid h-7 w-7 place-items-center rounded-full border"><Minus size={13} /></button>
                  <span className="text-[13px]">{quantity || 1}</span>
                  <button onClick={() => changeQuantity(id, 1)} aria-label="Increase quantity" className="grid h-7 w-7 place-items-center rounded-full bg-[#C67C4E] text-white"><Plus size={13} /></button>
                </div>
              </div>
              <button onClick={() => updateCart(cart.filter(i => i.id !== id))} aria-label={`Remove ${coffee.name}`} className="grid h-9 w-8 shrink-0 place-items-center text-[#C67C4E]"><Trash2 size={19} /></button>
            </article>
          )) : (
            <div className="flex flex-col items-center py-11 text-center">
              <div className="grid h-[70px] w-[70px] place-items-center rounded-full bg-[#F9E9DF] text-[#C67C4E]"><ShoppingBag size={30} /></div>
              <h2 className="mt-4 text-[17px] font-semibold">Your cart is empty</h2>
              <p className="mt-2 text-[13px] text-gray-500">Add your favorite coffee to get started.</p>
            </div>
          )}
        </section>

        {items.length > 0 && <section className="mt-6 rounded-[17px] border border-[#E8E8E8] p-4">
          <h2 className="font-semibold">Order Summary</h2>
          {[["Subtotal", subtotal], ["Delivery Fee", fee]].map(([label, amount]) => (
            <div key={label} className="mt-4 flex justify-between text-[13px] text-gray-500"><span>{label}</span><span>{money(amount)}</span></div>
          ))}
          <div className="my-4 border-t border-dashed border-[#DDDDDD]" />
          <div className="flex justify-between text-[15px] font-semibold"><span>Total</span><span>{money(total)}</span></div>
          <button onClick={() => navigate("/order", { state: { coffee: items[0].coffee, price: items[0].price ?? items[0].coffee.price, cart: items, total } })} className="mt-5 h-[52px] w-full rounded-xl bg-[#C67C4E] font-medium text-white">Checkout</button>
        </section>}

        <button onClick={() => navigate("/home")} className="mt-5 h-[55px] w-full rounded-xl bg-[#C67C4E] font-medium text-white">Continue shopping</button>
      </div>

      <div className="fixed bottom-0 left-1/2 z-50 h-[99px] w-full max-w-[375px] -translate-x-1/2 rounded-t-[24px] border-t border-[#EEEEEE] bg-white px-4 pb-[34px] pt-5">
        <BottomNav />
      </div>
    </main>
  );
}
