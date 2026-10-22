import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[375px] bg-black text-white">
      <section className="relative h-[812px] w-full overflow-hidden">
        {/* Status Bar */}
        <Header />
        {/* Coffee Image */}
        <div className="absolute inset-x-0 top-0 z-0 h-[536px] overflow-hidden">
          <img
            src="/assets/ImageOnboarding.png"
            alt="Coffee cup"
            className="absolute left-[-47px] top-[-166px] h-[702px] w-[468px] max-w-none"
          />

          {/* Image Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
        {/* Bottom Content */}
        <div className="absolute inset-x-0 top-[452px] z-10 h-[360px] bg-black px-6 pt-6">
          <h1 className="text-center text-2xl font-bold leading-tight">
            Fall in Love with
            <br />
            Coffee in Blissful
            <br />
            Delight!
          </h1>
          <p className="mt-3 text-center text-xs leading-5 text-gray-400">
            Welcome to our cozy coffee corner, where
            every cup is a delightful journey for you.
          </p>
          {/* Get Started Button */}
          <button
            onClick={() => navigate("/home")}
            className="absolute left-[24px] top-[250px] flex h-[56px] w-[327px] items-center justify-center gap-[10px] rounded-[16px] bg-[#C67C4E] px-[20px] py-[16px] font-semibold text-white transition hover:bg-[#b86b40]"
          >
            Get Started
          </button>
        </div>
        {/* Home Indicator */}
        <div className="absolute inset-x-0 bottom-0 z-40 flex h-[34px] items-center justify-center bg-black">
          <div className="h-[5px] w-[134px] rounded-full bg-white" />
        </div>
      </section>
    </main>
  );
}