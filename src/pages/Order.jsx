import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {ArrowLeft,ChevronDown,ChevronRight,Pencil,FileText,Minus,Plus,BadgePercent,Wallet,} from "lucide-react";
import { coffees } from "../data/coffeeData";

export default function Order() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const coffee = state?.coffee || coffees[0];

  const [type, setType] = useState("Deliver");
  const [qty, setQty] = useState(1);
  const [discount, setDiscount] = useState(false);
  const [payment, setPayment] = useState("Cash/Wallet");

  const [address, setAddress] = useState({
    title: "Jl. Kpg Sutoyo",
    details: "Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.",
  });

  const [deliveryNote, setDeliveryNote] = useState("");

  const unitPrice = Number(state?.price ?? coffee?.price ?? 4.53);
  const price = unitPrice * qty;
  const fee = type === "Deliver" ? 1 : 0;
  const discountAmount = discount ? 0.5 : 0;
  const total = price + fee - discountAmount;

  const money = (amount) => `$ ${amount.toFixed(2)}`;

  const editAddress = () => {
    const title = prompt("Enter address title", address.title);
    if (title === null) return;

    const details = prompt("Enter full address", address.details);
    if (details === null) return;

    setAddress({ title, details });
  };

  const addNote = () => {
    const note = prompt("Enter a delivery note", deliveryNote);
    if (note !== null) setDeliveryNote(note);
  };

  const placeOrder = () => {
    navigate("/delivery", {
      state: {
        coffee,
        quantity: qty,
        price: total,
        orderType: type,
        payment,
        address,
        deliveryNote,
      },
    });
  };

  return (
    <main className="relative mx-auto min-h-[812px] w-full max-w-[375px] overflow-hidden bg-[#F9F9F9] pb-[34px] text-[#2F2D2C]">

      {/* Header */}
      <header className="absolute left-6 top-[64px] flex h-[44px] w-[188px] items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold">
          Order
        </h1>
      </header>
      {/* Delivery / Pickup Toggle */}
      <div className="absolute left-6 top-[132px] flex h-[43px] w-[327px] rounded-xl bg-[#EDEDED] p-1">
        {["Deliver", "Pick Up"].map((value) => (
          <button
            key={value}
            onClick={() => setType(value)}
            className={`flex-1 rounded-lg text-sm ${
              type === value
                ? "bg-[#C67C4E] font-semibold text-white"
                : ""
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      {/* Address */}
      <section className="absolute left-6 top-[199px] h-[121px] w-[327px]">
        <h2 className="text-sm font-bold">
          {type === "Deliver" ? "Delivery Address" : "Pickup Location"}
        </h2>
        <p className="mt-4 text-sm font-bold">{address.title}</p>
        <p className="mt-1 text-[11px] text-[#A2A2A2]">
          {address.details}
        </p>
        <div className="mt-3 flex gap-2 text-[11px]">
          <button
            onClick={editAddress}
            className="flex items-center gap-1 rounded-full border border-[#EAEAEA] bg-white px-2 py-1"
          >
            <Pencil size={12} />
            Edit Address
          </button>
          <button
            onClick={addNote}
            className="flex items-center gap-1 rounded-full border border-[#EAEAEA] bg-white px-2 py-1"
          >
            <FileText size={12} />
            Add Note
          </button>
        </div>
        {deliveryNote && (
          <p className="mt-1 truncate text-[10px] text-[#A2A2A2]">
            Note: {deliveryNote}
          </p>
        )}
        <div className="mt-3 h-px bg-[#EAEAEA]" />
      </section>
      {/* Coffee Item and Quantity */}
      <section className="absolute left-6 top-[352px] flex h-[54px] w-[327px] items-center gap-3">
        <img
          src={coffee?.image || "/assets/caffe Mocha.png"}
          alt={coffee?.name || "Coffee"}
          className="h-12 w-12 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-bold">
            {coffee?.name || "Caffe Mocha"}
          </h2>
          <p className="text-xs text-[#A2A2A2]">Deep Foam</p>
        </div>
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          aria-label="Decrease quantity"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#EAEAEA]"
        >
          <Minus size={14} />
        </button>
        <span className="w-4 text-center text-xs">{qty}</span>
        <button
          onClick={() => setQty(qty + 1)}
          aria-label="Increase quantity"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#EAEAEA]"
        >
          <Plus size={14} />
        </button>
      </section>
      {/* Discount */}
      <button
        onClick={() => setDiscount(!discount)}
        className="absolute left-6 top-[442px] flex h-[56px] w-[327px] items-center justify-between rounded-2xl border border-[#F0F0F0] bg-white px-4"
      >
        <span className="flex items-center gap-3 text-[13px] font-semibold">
          <BadgePercent size={19} className="text-[#C67C4E]" />
          {discount ? "Discount Applied" : "1 Discount is Applies"}
        </span>
        <span className="flex items-center gap-2">
          {discount && (
            <>
              <span className="text-[14px] leading-[21px] text-[#A2A2A2] line-through">
                $20
              </span>
              <span className="text-[14px] font-semibold leading-[21px] text-[#C67C4E]">
                $10
              </span>
            </>
          )}
          <ChevronRight size={20} />
        </span>
      </button>
      {/* Payment Summary */}
      <section className="absolute left-6 top-[522px] w-[327px]">
        <h2 className="mb-4 text-sm font-bold">Payment Summary</h2>

        <div className="mb-2 flex justify-between text-sm">
          <span>Price</span>
          <b>{money(price)}</b>
        </div>
        <div className="flex justify-between text-sm">
          <span>Delivery Fee</span>
          <b>{money(fee)}</b>
        </div>
        {discount && (
          <div className="mt-2 flex justify-between text-sm text-[#C67C4E]">
            <span>Discount</span>
            <b>- {money(discountAmount)}</b>
          </div>
        )}
      </section>
      {/* Bottom Payment Panel */}
      <footer className="absolute left-0 top-[647px] z-40 flex h-[165px] w-full flex-col gap-2 rounded-t-2xl bg-white px-6 pb-[46px] pt-4">
        <button
          onClick={() =>
            setPayment(
              payment === "Cash/Wallet" ? "Wallet" : "Cash/Wallet"
            )
          }
          className="flex h-[38px] w-full items-center justify-between"
        >
          <span className="flex items-center gap-3">
            <Wallet size={22} className="text-[#C67C4E]" />
            <span>
              <b className="block text-[13px]">{payment}</b>
              <b className="text-xs text-[#C67C4E]">{money(total)}</b>
            </span>
          </span>
          <ChevronDown size={19} />
        </button>
        <button
          onClick={placeOrder}
          className="mt-2 h-[50px] w-full rounded-2xl bg-[#C67C4E] text-sm font-semibold text-white"
        >
          Order
        </button>
      </footer>
    </main>
  );
}