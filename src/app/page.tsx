import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import {
  Banner,
  Navbar,
  RecommendedProduct,
  AllProduct,
  Footer,
} from "@/components";

export const metadata: Metadata = {
  title: "WMART | Homepage",
};

export default function Home() {
  return (
    <div className="w-[80%] xl:w-[95%] lg:w-full mx-auto overflow-x-hidden">
      <Navbar />
      <main className="py-8 lg:py-0">
        <Banner />
        <RecommendedProduct />
        <AllProduct />
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}
