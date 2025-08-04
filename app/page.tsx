import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight max-w-3xl">
        Create Stunning <span className="text-indigo-600">UGC Videos</span> in
        Minutes
      </h1>

      <p className="text-base md:text-lg text-gray-700 mb-10 max-w-xl">
        Combine AI-generated hooks with your own videos, add automatic captions,
        and export polished montages for social media in no time.
      </p>

      <Link href="/create" passHref>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50">
          Start Creating Your Video
        </button>
      </Link>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-2">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">
            AI Video Hooks
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Instantly grab attention with scroll-stopping, AI-generated video
            intros designed to boost engagement.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">
            Seamless Composition
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Easily merge your content with AI-generated intros and outros for a
            smooth, professional narrative.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">
            Automatic Captions
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Improve accessibility and viewer retention with smart, auto-synced
            captions.
          </p>
        </div>
      </div>
    </section>
  );
}
