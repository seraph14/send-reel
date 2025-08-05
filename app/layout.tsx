import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Head from "next/head";
import Link from "next/link";
import { Calendar, House, Video } from "lucide-react";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Send Reel",
  description: "Create attention grabbing short form videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 text-gray-900 flex flex-col`}
      >
        <Head>
          <title>SendReel</title>
        </Head>

        <div className="flex min-h-screen bg-gray-100">
          {/* Left Sidebar */}
          <aside className="w-16 md:w-64 bg-[#EEEFE8] border-r border-gray-200 shadow-md p-4 flex flex-col gap-6">
            <div className="flex items-center space-x-2 pb-6 mb-6 border-b border-gray-200">
              <svg
                className="h-8 w-8 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zM12 4.09L19.46 8.05L12 11.91L4.54 8.05L12 4.09zM4 9.61L11.5 13.48v6.94L4 16.54V9.61zM12.5 20.42v-6.94L20 9.61v6.93L12.5 20.42z" />
              </svg>
              <span className="text-lg font-bold hidden md:block">
                SendReel
              </span>
            </div>

            <nav className="flex flex-col gap-4 w-full">
              <Link
                href="/"
                className="flex items-center gap-3 text-gray-600 hover:text-black"
              >
                <House className="w-5 h-5" />
                <span className="hidden md:inline">Home</span>
              </Link>

              <Link
                href="/create"
                className="flex items-center gap-3 text-gray-600 hover:text-black"
              >
                <Video className="w-5 h-5" />
                <span className="hidden md:inline">Hook + Video</span>
              </Link>

              <Link
                href="/create"
                className="flex items-center gap-3 text-gray-600 hover:text-black"
              >
                <Calendar className="w-5 h-5" />
                <span className="hidden md:inline">Schedule</span>
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-y-auto">
            {children}
            <Toaster />
          </main>
        </div>
      </body>
    </html>
  );
}
