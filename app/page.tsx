import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight max-w-3xl">
        Create <span className="text-[#1C1C1A]">UGC Videos</span> Faster Than
        Ever
      </h1>

      <p className="text-base md:text-lg text-gray-700 mb-10 max-w-xl">
        Upload your clip, generate AI-powered hooks, auto-captions, and export
        clean, cinematic content — ready to post in minutes.
      </p>

      <Link href="/create" passHref>
        <button className="bg-[#1C1C1A] hover:bg-black text-white font-semibold py-3 px-8 rounded-full shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#1C1C1A]/30">
          Start Creating
        </button>
      </Link>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-2">
        <div className="bg-[#E6E6E1] p-6 rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition duration-300">
          <h3 className="text-lg font-semibold text-[#1C1C1A] mb-2">
            🔥 Instant AI Hooks
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Generate scroll-stopping video intros using AI — built for virality
            and retention.
          </p>
        </div>

        <div className="bg-[#E6E6E1] p-6 rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition duration-300">
          <h3 className="text-lg font-semibold text-[#1C1C1A] mb-2">
            🎬 Seamless Trimming & Composition
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Trim your clip, stitch in the hook, and auto-compose the final scene
            — no editing tools needed.
          </p>
        </div>

        <div className="bg-[#E6E6E1] p-6 rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition duration-300">
          <h3 className="text-lg font-semibold text-[#1C1C1A] mb-2">
            💬 Auto-Captions
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Add dynamic, high-contrast captions synced with your audio for
            maximum engagement and accessibility.
          </p>
        </div>
      </div>
    </section>
  );
}
