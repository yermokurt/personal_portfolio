import { Suspense } from "react";
import Desktop from "@/components/os/Desktop";
import PortfolioShell from "@/components/os/PortfolioShell";

export default function Home() {
  return (
    <><Desktop /><Suspense fallback={null}><PortfolioShell /></Suspense></>
  );
}
