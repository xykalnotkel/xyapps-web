import type { Metadata } from "next";
import { Sym } from "@/components/Icon";

export const metadata: Metadata = { title: "XyConsole" };

/**
 * Console DIPISAH dari toko. Halaman ini cuma penunjuk arah:
 * XyConsole adalah proyek sendiri dengan subdomain sendiri.
 */
export default function ConsolePage() {
  return (
    <div className="wrap page-inner stack-16">
      <p className="kicker">Proyek terpisah</p>
      <h1 className="page-title">XyConsole pindah rumah</h1>
      <p className="sub">
        Console tidak lagi numpang di web toko. Ini proyek sendiri dengan subdomain
        sendiri, sesuai rencana: rapat, gelap, plus 2FA.
      </p>
      <div className="panel stack-14">
        <p className="moved-row">
          <Sym name="link" size={18} />
          console.xystudio.my.id
        </p>
        <p>
          Domain menyusul aktif setelah DNS diarahkan. Sampai saat itu, console tetap
          di plan — bukan di repo ini.
        </p>
        <a
          className="lbtn solid"
          href="https://console.xystudio.my.id"
          target="_blank"
          rel="noreferrer"
        >
          Buka console.xystudio.my.id
          <Sym name="open_in_new" size={15} />
        </a>
      </div>
      <p className="meta-line">
        Repo console terpisah dari repo toko supaya izin, secret, dan alur rilisnya
        tidak campur.
      </p>
    </div>
  );
}
