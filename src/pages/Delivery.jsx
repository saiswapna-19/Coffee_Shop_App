import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Bike, LocateFixed, Phone } from "lucide-react";

export default function Delivery() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const address = typeof state?.address === "string"
    ? state.address
    : state?.address?.details || "Jl. Kpg Sutoyo";

  return (
    <main className="relative mx-auto min-h-dvh w-full max-w-[375px] overflow-hidden bg-white text-[#171717]">
      {/* Map */}
      <section className="absolute inset-x-0 top-0 h-[52dvh] min-h-[300px] max-h-[700px] overflow-hidden bg-[#E8E5DF]">
        <img src="/assets/deliverymap.png" alt="Delivery map" className="h-full w-full object-cover" />
        <button onClick={() => navigate(-1)} aria-label="Go back" className="absolute left-4 top-[60px] grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm">
          <ArrowLeft size={22} />
        </button>
        <button aria-label="Current location" className="absolute right-4 top-[60px] grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm">
          <LocateFixed size={23} strokeWidth={1.8} />
        </button>
      </section>

      {/* Delivery panel */}
      <section className="absolute inset-x-0 bottom-0 z-20 flex max-h-[68dvh] min-h-[370px] w-full flex-col overflow-y-auto rounded-t-[28px] bg-white px-4 pb-[42px] pt-[15px]">
        <div className="mx-auto h-[5px] w-[112px] shrink-0 rounded-full bg-[#E0E0E0]" />

        <div className="mt-6 shrink-0 text-center">
          <h1 className="text-xl font-semibold leading-[26px]">10 minutes left</h1>
          <p className="mt-2 break-words text-sm text-[#A2A2A2]">
            Delivery to <span className="font-semibold text-[#171717]">{address}</span>
          </p>
        </div>

        <div className="mt-6 flex shrink-0 gap-2">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className={`h-[5px] min-w-0 flex-1 rounded-full ${step <= 3 ? "bg-[#2BC982]" : "bg-[#E0E0E0]"}`} />
          ))}
        </div>

        {/* Delivery status */}
        <div className="mt-6 flex min-h-[101px] shrink-0 items-center gap-3 rounded-[17px] border border-[#E2E2E2] px-3 py-3">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#E2E2E2]">
            <Bike size={30} className="text-[#C67C4E]" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold">Delivered your order</h2>
            <p className="mt-1 text-xs leading-[18px] text-[#A2A2A2]">
              We will deliver your goods to you in the shortest possible time.
            </p>
          </div>
        </div>

        {/* Courier */}
        <div className="mt-4 flex min-w-0 shrink-0 items-center gap-3">
          <img src="/assets/courier.png" alt="Brooklyn Simmons" className="h-14 w-14 shrink-0 rounded-[17px] object-cover" />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-[15px] font-semibold">Brooklyn Simmons</h2>
            <p className="mt-1 text-[13px] text-[#A2A2A2]">Personal Courier</p>
          </div>
          <a href="tel:" aria-label="Call courier" className="grid h-11 w-11 shrink-0 place-items-center rounded-[15px] border border-[#E2E2E2]">
            <Phone size={22} strokeWidth={1.8} />
          </a>
        </div>
      </section>

      {/* Home indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex h-[34px] items-end justify-center bg-white/90 pb-[8px]">
        <div className="h-[5px] w-[134px] max-w-[40%] rounded-full bg-black" />
      </div>
    </main>
  );
}
