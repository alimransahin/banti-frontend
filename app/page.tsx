import HomePage from "@/components/home/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "হোম",
};

export default function Page() {
  return <HomePage />;
}