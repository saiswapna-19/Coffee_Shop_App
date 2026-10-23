
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronRight, Pencil, FileText, Minus, Plus, BadgePercent, Wallet } from "lucide-react";
import { coffees } from "../data/coffeeData";

export default function Order() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const coffee = state?.coffee || coffees[0];
  const [type, setType] = useState("Deliver");
  const [qty, setQty] = useState(state?.quantity || 1);
  const [discount, setDiscount] = useState(false);
  const [payment, setPayment] = useState("Cash/Wallet");
  const [address, setAddress] = useState({ title: "Jl. Kpg Sutoyo", details: "Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai." });
  const [note, setNote] = useState("");
  const unitPrice = Number(state?.unitPrice ?? state?.price ?? coffee?.price ?? 4.53);
  const price = unitPrice * qty, fee = type === "Deliver" ? 1 : 0;
  const discountAmount = discount ? 0.5 : 0, total = Math.max(0, price + fee - discountAmount);
  const money = n => `$ ${n.toFixed(2)}`;

  const edit = (key, label) => {
    const value = prompt(`Enter ${label}`, key === "note" ? note : address[key]);
    if (value !== null) key === "note" ? setNote(value) : setAddress({ ...address, [key]: value });
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[440px] overflow-x-clip bg-[#F9F9F9] px-6 pb-48 pt-[68px] text-[#2F2D2C]">
      <div className="mx-auto w-full max-w-[364px]">
        <header className="relative flex h-11 items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back"><ArrowLeft size={22}/></button>
          <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold">Order</h1>
          <div className="h-11 w-11"/>
        </header>

        <div className="mt-6 flex h-[43px] rounded-xl bg-[#EDEDED] p-1">
          {["Deliver", "Pick Up"].map(v => <button key={v} onClick={() => setType(v)} className={`min-w-0 flex-1 rounded-lg text-sm ${type === v ? "bg-[#C67C4E] font-semibold text-white" : ""}`}>{v}</button>)}
        </div>

        <section className="mt-6">
          <h2 className="text-sm font-bold">{type === "Deliver" ? "Delivery Address" : "Pickup Location"}</h2>
          <p className="mt-4 break-words text-sm font-bold">{address.title}</p>
          <p className="mt-1 break-words text-[11px] leading-4 text-[#A2A2A2]">{address.details}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <button onClick={() => edit("title", "address title")} className="flex items-center gap-1 rounded-full border bg-white px-3 py-2"><Pencil size={12}/> Edit Address</button>
            <button onClick={() => edit("note", "delivery note")} className="flex items-center gap-1 rounded-full border bg-white px-3 py-2"><FileText size={12}/> Add Note</button>
          </div>
          {note && <p className="mt-2 break-words text-[10px] text-[#A2A2A2]">Note: {note}</p>}
          <div className="mt-4 h-px bg-[#EAEAEA]"/>
        </section>

        <section className="mt-7 flex min-w-0 items-center gap-2">
          <img src={coffee?.image || "/assets/caffe Mocha.png"} alt={coffee?.name || "Coffee"} className="h-12 w-12 shrink-0 rounded-lg object-cover"/>
          <div className="min-w-0 flex-1"><h2 className="truncate text-sm font-bold">{coffee?.name || "Caffe Mocha"}</h2><p className="text-xs text-[#A2A2A2]">Deep Foam</p></div>
          <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border bg-white"><Minus size={14}/></button>
          <span className="w-4 text-center text-xs">{qty}</span>
          <button onClick={() => setQty(q => q + 1)} aria-label="Increase quantity" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border bg-white"><Plus size={14}/></button>
        </section>

        <button onClick={() => setDiscount(v => !v)} className="mt-7 flex min-h-14 w-full items-center justify-between gap-2 rounded-2xl border border-[#F0F0F0] bg-white px-3">
          <span className="flex min-w-0 items-center gap-2 text-xs font-semibold"><BadgePercent size={19} className="shrink-0 text-[#C67C4E]"/><span className="truncate">{discount ? "Discount Applied" : "1 Discount is Applies"}</span></span>
          <span className="flex shrink-0 items-center gap-2">{discount && <span className="text-sm font-semibold text-[#C67C4E]">-{money(discountAmount)}</span>}<ChevronRight size={20}/></span>
        </button>

        <section className="mt-6">
          <h2 className="mb-4 text-sm font-bold">Payment Summary</h2>
          <div className="mb-3 flex justify-between gap-3 text-sm"><span>Price</span><b>{money(price)}</b></div>
          <div className="flex justify-between gap-3 text-sm"><span>Delivery Fee</span><b>{money(fee)}</b></div>
          {discount && <div className="mt-3 flex justify-between text-sm text-[#C67C4E]"><span>Discount</span><b>- {money(discountAmount)}</b></div>}
        </section>
      </div>

      <footer className="fixed bottom-[34px] left-1/2 z-40 w-full max-w-[440px] -translate-x-1/2 rounded-t-2xl bg-white px-6 pb-3 pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex w-full max-w-[364px] flex-col gap-2">
          <button onClick={() => setPayment(v => v === "Cash/Wallet" ? "Wallet" : "Cash/Wallet")} className="flex min-h-[42px] w-full items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-3"><Wallet size={22} className="shrink-0 text-[#C67C4E]"/><span className="min-w-0 text-left"><b className="block truncate text-[13px]">{payment}</b><b className="text-xs text-[#C67C4E]">{money(total)}</b></span></span>
            <ChevronDown size={19} className="shrink-0"/>
          </button>
          <button onClick={() => navigate("/delivery", { state: { coffee, quantity: qty, price: total, orderType: type, payment, address, deliveryNote: note } })} className="h-[50px] w-full rounded-2xl bg-[#C67C4E] text-sm font-semibold text-white">Order</button>
        </div>
      </footer>
    </main>
  );
}
