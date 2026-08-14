import type { Metadata } from "next";

export const metadata: Metadata = { title: "XyConsole" };

export default function ConsolePage() {
  return (
    <div className="wrap page-inner stack-16">
      <p className="kicker">console.xyapps.my.id</p>
      <h1 className="page-title">XyConsole</h1>
      <p className="sub">
        Beda sikap dari toko: rapat, gelap. Produksi nanti subdomain terpisah plus 2FA.
      </p>
      <div className="console-shell">
        <div className="console-bar">
          <span>scan queue · mock</span>
          <span>session 03:41</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Build</th>
              <th>Jenis</th>
              <th>XyScan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>northroom 1.4.2</td>
              <td>APK</td>
              <td>
                <span className="dot ok" />
                lulus
              </td>
              <td>published</td>
            </tr>
            <tr>
              <td>vaultline 0.9.1</td>
              <td>ZIP</td>
              <td>
                <span className="dot warn" />
                review
              </td>
              <td>pending</td>
            </tr>
            <tr>
              <td>field-notes 0.3.0</td>
              <td>AAB</td>
              <td>
                <span className="dot bad" />
                AAB · butuh APK
              </td>
              <td>blocked</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
