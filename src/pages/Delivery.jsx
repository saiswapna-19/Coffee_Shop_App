import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Bike,LocateFixed, Phone } from "lucide-react";

export default function Delivery() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const address =
    typeof state?.address === "string"
      ? state.address
      : state?.address?.details || "Jl. Kpg Sutoyo";
  return (
    <main className="relative mx-auto h-[100dvh] min-h-[700px] max-w-[375px] overflow-hidden bg-white text-[#171717]">
      <section className="absolute inset-x-0 top-0 h-[70%] overflow-hidden bg-[#E8E5DF]">
        <img
          src="/assets/deliverymap.png"
          alt="Delivery map"
          className="h-full w-full object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          aria-label="Back to home"
          className="absolute left-6 top-[84px] z-10 flex h-14 w-14 items-center justify-center rounded-[20px] bg-white shadow-sm"
        >
          <ArrowLeft size={22} />
        </button>
        <button
          arial-label="Current location"
          className="absolute right-6  top-[84px] z-10 flex h-14 w-14 items-center justify-center rounded-[20px] bg-white shadow-sm"
        >
          <LocateFixed size={24} strokeWidth={1.8} />
        </button>
      </section>
      {/* Delivery panel */}
      <section className="absolute inset-x-0 bottom-0 z-20 h-[402px] rounded-t-[32px] bg-white px-6 pt-[15px]">
        <div className="mx-auto h-[5px] w-[112px] rounded-full bg-[#E0E0E0]" />
        <div className="mt-[35px] text-center">
          <h1 className="text-[20px] font-semibold leading-[26px]">
            10 minutes left
          </h1>
          <p className="mt-2 text-[14px] text-[#A2A2A2]">
            Delivery to{" "}
            <span className="font-semibold text-[#171717]">{address}</span>
          </p>
        </div>
        {/* Progress bars */}
        <div className="mt-[27px] flex gap-3">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-[5px] flex-1 rounded-full ${
                step <= 3 ? "bg-[#2BC982]" : "bg-[#E0E0E0]"
              }`}
            />
          ))}
        </div>
        {/* Delivery status */}
        <div className="mt-[29px] flex min-h-[101px] items-center gap-[15px] rounded-[17px] border border-[#E2E2E2] px-[15px] py-2">
          <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[20px] border border-[#E2E2E2]">
            <Bike size={32} className="text-[#C67C4E]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[16px] font-semibold">
              Delivered your order
            </h2>
            <p className="mt-2 text-[14px] leading-[21px] text-[#A2A2A2]">
              We will deliver your goods to you in the shortest possible time.
            </p>
          </div>
        </div>
        {/* Courier details */}
        <div className="mt-5 flex items-center gap-[15px]">
          <img
            src="/assets/courier.png"
            alt="Brooklyn Simmons"
            className="h-[70px] w-[70px] shrink-0 rounded-[20px] object-cover"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-[16px] font-semibold">
              Brooklyn Simmons
            </h2>
            <p className="mt-2 text-[14px] text-[#A2A2A2]">
              Personal Courier
            </p>
          </div>
          <a
            href="tel:"
            aria-label="Call courier"
            className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-[20px] border border-[#E2E2E2]"
          >
            <Phone size={25} strokeWidth={1.8} />
          </a>
        </div>
      </section>
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 z-30 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-black" />
    </main>
  );
}
