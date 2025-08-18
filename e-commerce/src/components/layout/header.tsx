"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("header");

  const nextLocale = locale === "en" ? "tr" : "en";

  const segments = pathname.split("/");
  const pathWithoutLocale = "/" + segments.slice(2).join("/");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/myCart", label: t("cart") },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-100 to-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-12 lg:px-4 xl:px-0 h-[70px] flex items-center justify-between ">
        <div className="text-2xl font-extrabold text-gray-800 tracking-wide">
          <Link href="/">
            Kayra <span className="text-blue-500">Export</span>
          </Link>
        </div>

        <nav className="hidden sm:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-gray-700 font-medium transition 
              hover:text-blue-500
              after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all hover:after:w-full
              ${pathname === item.href ? "text-blue-500 after:w-full" : ""}`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href={pathWithoutLocale}
            locale={nextLocale}
            className="flex items-center gap-2 transition"
          >
            <Image
              src={locale === "tr" ? "/Tr.png" : "/Eng.png"}
              alt={locale === "tr" ? "Türkçe" : "English"}
              width={40}
              height={40}
              className="rounded-full border border-gray-300"
            />
          </Link>
        </nav>

        <button
          className="sm:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`sm:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center p-4 gap-4 bg-gray-100 border-t border-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-gray-700 font-medium transition hover:text-blue-500
                ${pathname === item.href ? "text-blue-500" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href={pathWithoutLocale}
            locale={nextLocale}
            className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-blue-100 transition"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src={locale === "tr" ? "/Tr.png" : "/Eng.png"}
              alt={locale === "tr" ? "Türkçe" : "English"}
              width={32}
              height={32}
              className="rounded-full border border-gray-300"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}
