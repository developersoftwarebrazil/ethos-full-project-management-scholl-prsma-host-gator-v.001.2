// src/app/(public)/layout.tsx
import LandingHeader from "@/components/landing/header/LandingHeader";
import LandingFooter from "@/components/landing/footer/LandingFooter";
import WhatsAppFloating from "@/components/ui/whatsapp/WhatsAppFloating";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingHeader />
      <WhatsAppFloating />
      <main>{children}</main>
      <LandingFooter />
    </>
  );
}
