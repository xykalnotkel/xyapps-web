import { SYM, type SymName } from "@/lib/symbols";

type Props = {
  name: SymName;
  size?: number;
  fill?: boolean;
  weight?: number;
  className?: string;
};

/**
 * Icon Material Symbols Rounded (self-host, subset 92KB).
 * Satu glyph bisa dua versi lewat sumbu FILL:
 * fill=true -> versi penuh (aktif), fill=false -> versi outline.
 */
export function Sym({ name, size = 22, fill = false, weight = 400, className = "" }: Props) {
  return (
    <span
      aria-hidden
      className={`msym ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${fill ? 500 : weight}, 'opsz' ${
          size >= 32 ? 40 : 24
        }`,
      }}
    >
      {SYM[name]}
    </span>
  );
}
