import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
        Create Stunning <span className="text-indigo-600">UGC Videos</span> in
        Minutes!
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl">
        Combine AI-generated video hooks with your own content, add automatic
        captions, and export professional-looking montages for social media.
      </p>
      <Link href="/create" passHref>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-75">
          Start Creating Your Video
        </button>
      </Link>

      {/* Optional: Add some illustrative images or features overview here */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">
            AI Video Hooks
          </h3>
          <p className="text-gray-600">
            Grab attention instantly with engaging, AI-generated video intros.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">
            Seamless Composition
          </h3>
          <p className="text-gray-600">
            Effortlessly merge your uploaded videos with AI hooks for a smooth
            flow.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">
            Automatic Captions
          </h3>
          <p className="text-gray-600">
            Boost accessibility and engagement with perfectly synchronized
            captions.
          </p>
        </div>
      </div>
    </section>
  );
}
