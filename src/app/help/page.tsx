"use client";

import { useState } from "react";
import { Sym } from "@/components/Icon";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Kenapa unduhan lewat tiket, bukan tombol biasa?",
    a: "Tiket adalah gerbang resmi: unduhan berjalan lewat jalur aman supaya tautan asal tidak pernah muncul. Tiket aktif selama 10 menit.",
  },
  {
    q: "Kenapa ada app yang tombolnya Terkunci?",
    a: "App berbayar belum dibuka penjualannya. Kami sengaja menampilkan status jujur — tidak ada tombol palsu.",
  },
  {
    q: "Rating dan ulasan ini asli?",
    a: "Rating hanya muncul dari pengguna sungguhan. App yang belum rilis tidak pernah diberi rating palsu.",
  },
  {
    q: "Data saya disimpan di mana?",
    a: "Data kamu — sesi, library, wishlist, dan ulasan — tersimpan di perangkatmu sendiri.",
  },
  {
    q: "Console di mana?",
    a: "Console untuk developer sedang disiapkan. Developer akan mendapat akses lewat akun resmi.",
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
          kami akan balas secepatnya.
        </p>
      </div>
    </div>
  );
}
