"use client";

import { useState } from "react";
import { Sym } from "@/components/Icon";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Kenapa unduhan lewat tiket, bukan tombol biasa?",
    a: "Tiket itu gerbang resmi: file di-stream dari dl.xystudio.my.id supaya URL asal (misal GitHub) tidak pernah muncul di browser. Tiket punya masa aktif 10 menit.",
  },
  {
    q: "Kenapa ada app yang tombolnya Terkunci?",
    a: "App berbayar belum dibuka penjualannya. Kami sengaja menampilkan status jujur — tidak ada tombol palsu.",
  },
  {
    q: "Rating dan ulasan ini asli?",
    a: "Sekarang masih mock untuk menguji alur UI. App yang belum rilis tidak diberi rating palsu.",
  },
  {
    q: "Data saya disimpan di mana?",
    a: "Semua masih lokal di browser (localStorage): sesi, library, wishlist, ulasan. Belum ada server.",
  },
  {
    q: "Console di mana?",
    a: "XyConsole proyek terpisah: console.xystudio.my.id (aktif setelah DNS). Tidak lagi numpang di toko.",
  },
];

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="wrap page-inner stack-16">
      <p className="kicker">Bantuan</p>
      <h1 className="page-title">Yang sering ditanya</h1>
      <div className="stack-10">
        {FAQ.map((f, i) => {
          const on = open === i;
          return (
            <div key={f.q} className="panel faq">
              <button
                type="button"
                className="faq-q"
                aria-expanded={on}
                onClick={() => setOpen(on ? null : i)}
              >
                <Sym name="question_mark" size={17} className="faq-ic" />
                <span className="grow">{f.q}</span>
                <Sym name={on ? "expand_less" : "expand_more"} size={18} />
              </button>
              {on && <p className="faq-a">{f.a}</p>}
            </div>
          );
        })}
      </div>
      <div className="panel stack-10">
        <p className="sub">
          <Sym name="support_agent" size={16} /> Masih buntu?
        </p>
        <p>
          Kirim email ke studio@xystudio.my.id. Balasan belum otomatis — masih
          mock, tapi alurnya sudah disiapkan.
        </p>
      </div>
    </div>
  );
}
