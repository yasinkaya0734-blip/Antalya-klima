import Image from 'next/image';

export default function PageLeadImage({ src, alt }: { src: string; alt: string }) {
  return <Image
    className="page-lead-image"
    src={src}
    alt={alt}
    width={1120}
    height={630}
    sizes="(max-width: 760px) calc(100vw - 32px), 1120px"
    loading="eager"
  />;
}
