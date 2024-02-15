
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ProgressBarProvider from "@/components/progress-bar-provider";
import AffiliatesSheet from "@/components/sheet/affiliates-sheet";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};
  
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgressBarProvider>
      <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
    <AffiliatesSheet />
    </ProgressBarProvider>
  );
}