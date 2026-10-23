import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <main className="min-h-dvh w-full overflow-x-clip bg-black text-white">
      <section className="relative mx-auto h-dvh min-h-[600px] w-full max-w-[480px] overflow-hidden bg-black">
        {/* Coffee Image */}
        <div className="absolute inset-x-0 top-0 h-[66%] overflow-hidden">
          <img
            src="/assets/ImageOnboarding.png"
            alt="Coffee cup"
            className="absolute left-1/2 top-[-20.44%] h-[130.97%] w-[124.8%] max-w-none -translate-x-1/2 object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
        {/* Status Bar */}
        <Header />
        {/* Bottom Content */}
        <div className="absolute inset-x-0 bottom-[34px] z-10 flex h-[44.33%] min-h-[290px] flex-col items-center bg-black px-6 pt-6">
          <h1 className="text-center text-2xl font-bold leading-tight">
            Fall in Love with
            <br />
            Coffee in Blissful
            <br />
            Delight!
          </h1>
          <p className="mt-3 max-w-[327px] text-center text-xs leading-5 text-gray-400">
            Welcome to our cozy coffee corner, where every cup is a delightful
            journey for you.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="mt-auto mb-6 flex h-14 w-full shrink-0 items-center justify-center rounded-2xl bg-[#C67C4E] px-5 font-semibold text-white transition hover:bg-[#b86b40]"
          >
            Get Started
          </button>
        </div>
        {/* Home Indicator */}
        <div className="absolute inset-x-0 bottom-0 z-40 flex h-[34px] items-center justify-center bg-black">
          <div className="h-[5px] w-[134px] max-w-[40%] rounded-full bg-white" />
        </div>
      </section>
    </main>
  );
}
