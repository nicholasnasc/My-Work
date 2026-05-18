import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource/dela-gothic-one";
import "@fontsource/noto-sans-jp";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import InitialLoader from "@/components/InitialLoader";
import AnimatedLayout from "@/components/AnimatedLayout";
import { MusicProvider } from "@/components/MusicContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nicholas Nasc. | Portfolio",
  description: "A special corner created by a slacker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MusicProvider audioSrc="/audio/notion.mp3">
          <CustomCursor />
          <InitialLoader />
          <AnimatedLayout>{children}</AnimatedLayout>
        </MusicProvider>
      </body>
    </html>
  );
}
