import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import CartComponent from "@/components/cart/CartComponent";
import { ReduxProvider } from "@/redux/ReduxProvider";

export const metadata: Metadata = {
  title: "Challenge CROSS up",
  description: "Prueba Tecnica Semi Señor - Ramiro Arce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans bg-background text-foreground">
        <ReduxProvider>
          <div className="flex flex-col min-h-screen">
            <header className="p-4 bg-secondary text-secondary-foreground flex justify-between items-center">
              <h1 className="text-2xl font-bold">Challenge CROSS up</h1>
              <div className="flex items-center space-x-4">
                <CartComponent />
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-grow p-4">{children}</main>
            <footer className="p-4 bg-muted text-muted-foreground">
              <p>© 2024 Ramiro Arce</p>
            </footer>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
