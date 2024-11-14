import "../../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <div>{children}</div>
      <Toaster />
      <Footer />
    </div>
  );
}
