"use client";

import { useState } from "react";
import { Sym } from "@/components/Icon";
import type { SymName } from "@/lib/symbols";

type Notif = {
  id: string;
  icon: SymName;
  tone: "ok" | "lilac" | "indigo";
  title: string;
  text: string;
  time: string;
};

const NOTIFS: Notif[] = [
  {
    id: "n1",
    icon: "download_done",
    tone: "ok",
    title: "Northroom 1.4.2 siap diunduh",
    text: "Tiket unduh baru dibuat untuk perangkat ini (mock).",
    time: "Baru saja",
  },
  {
    id: "n2",
    icon: "shield",
    tone: "lilac",
    title: "Audit Vaultline bersih",
    text: "0 anomali pada brankas internal, kunci tetap aktif.",
    time: "2 jam lalu",
  },
  {
    id: "n3",
    icon: "update",
    tone: "indigo",
    title: "Field Notes 0.3.0 dirilis",
    text: "Editor markdown dan pencarian teks penuh.",
    time: "1 hari lalu",
  },
  {
    id: "n4",
    icon: "security",
    tone: "ok",
    title: "Ulasan kamu tampil di katalog",
    text: "Ulasan Northroom kamu sudah dihitung (mock lokal).",
    time: "2 hari lalu",
  },
];

export default function NotificationsPage() {
  const [read, setRead] = useState(false);

  function markAll() {
    setRead(true);
    try {
      localStorage.setItem("xyapps.nread", "1");
    } catch {
      /* abaikan */
    }
  }

  return (
    <div className="wrap page-inner stack-16">
      <div className="notif-head">
        <div>
          <h1 className="page-title">Notifikasi</h1>
          <p className="sub">
            {read ? "Semua dibaca" : `${NOTIFS.length} belum dibaca`}
          </p>
        </div>
        {!read && (
          <button type="button" className="text-btn" onClick={markAll}>
            Tandai semua dibaca
          </button>
        )}
      </div>
      <div className="stack-10">
        {NOTIFS.map((n) => (
          <div key={n.id} className={`panel notif ${read ? "read" : ""}`}>
            <span className={`notif-icon ${n.tone}`}>
              <Sym name={n.icon} size={19} />
            </span>
            <span className="notif-body">
              <strong>{n.title}</strong>
              <p>{n.text}</p>
              <em>{n.time}</em>
            </span>
          </div>
        ))}
      </div>
      <p className="meta-line">
        Notifikasi masih mock — nanti dari sistem ingest dan tiket unduh sungguhan.
      </p>
    </div>
  );
}
