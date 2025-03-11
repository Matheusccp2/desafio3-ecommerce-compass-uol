import Image from "next/image";

export default function BrandSection() {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-between items-center gap-8 md:gap-12">
          <Image
            src="/versace.svg"
            alt="Versace"
            width={100}
            height={40}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/zara.svg"
            alt="Zara"
            width={100}
            height={40}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/gucci.svg"
            alt="Gucci"
            width={100}
            height={40}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/prada.svg"
            alt="Prada"
            width={100}
            height={40}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/calvinclein.svg"
            alt="Calvin Klein"
            width={100}
            height={40}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </section>
  );
}
