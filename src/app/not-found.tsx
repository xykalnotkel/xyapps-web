import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap section">
      <h2>Tidak ketemu</h2>
      <p className="sub">Halaman atau app itu tidak ada di mockup ini.</p>
      <Link className="btn solid" href="/apps">
        Ke katalog
      </Link>
    </div>
  );
}
