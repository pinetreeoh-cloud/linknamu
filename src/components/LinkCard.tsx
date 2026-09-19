import type { LinkItem } from "@/types/link";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl border border-white/70 bg-white/40 px-6 py-4 text-center text-[15px] font-medium text-stone-800 shadow-[0_8px_28px_-10px_rgba(190,110,50,0.25)] backdrop-blur-xl transition duration-200 hover:bg-white/60 hover:shadow-[0_12px_32px_-10px_rgba(190,110,50,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 active:bg-white/50 motion-reduce:transition-none"
    >
      {link.title}
    </a>
  );
}
