import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function AcmeLogo(props: { scrolled: boolean }) {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Acme</p> */}
      <Image
        src={
          props.scrolled
            ? "/logo-zazira-movers-black.png"
            : "/logo-zazira-movers-white.png"
        }
        width={100}
        height={100}
        alt="zazira-movers"
      />
    </div>
  );
}
