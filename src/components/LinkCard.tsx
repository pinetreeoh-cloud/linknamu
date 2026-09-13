import type { LinkItem } from "@/types/link";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-center font-medium text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
    >
      {link.title}
    </a>
  );
}
