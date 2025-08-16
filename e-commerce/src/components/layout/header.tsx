import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="bg-red-500 min-h-[10vh] flex flex-row items-center justify-between px-24">
      <div>Logo</div>
      <div className="flex gap-12 ">
        <Link href="/">Anasayfa</Link>
        <Link href="/products">Ürünler</Link>
        <Link href="/myCart">Sepet</Link>
      </div>
    </div>
  );
}
