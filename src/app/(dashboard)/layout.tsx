import Menu from "@/components/layouts/Menu";
import Navbar from "@/components/layouts/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* TOASTER GLOBAL DO DASHBOARD */}
      <Toaster
        position="top-right"
        richColors
        closeButton
      />

      <div className="h-screen flex">
        {/* LEFT */}
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 border-r bg-white">
          <Link
            href="/"
            className="flex items-center justify-center lg:justify-start gap-2 mb-6"
          >
            <Image src="/logo-ETHOS.png" alt="logo" width={32} height={32} />
            <span className="hidden lg:block font-bold">
              ETHOS CPAC
            </span>
          </Link>

          <Menu />
        </div>

        {/* RIGHT */}
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-y-auto flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
