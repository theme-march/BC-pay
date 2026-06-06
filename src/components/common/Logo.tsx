import Image from "next/image";

export function Logo() {
  return (
    <div className="site-logo">
      <Image
        src="/logo/brain-code.png"
        alt="Brain Code Multi-Transfer"
        width={198}
        height={74}
        className="site-logo-image"
        priority
      />
    </div>
  );
}
