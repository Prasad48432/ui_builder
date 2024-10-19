import "./globals.css";
import {Rubik, Montserrat} from "next/font/google";
import { Toaster } from "sonner";

const rubik = Rubik({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap"
});

export const metadata = {
  title: "UI Builder",
  description: "UI Builder for Server Driven UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${montserrat.variable} rubik`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
