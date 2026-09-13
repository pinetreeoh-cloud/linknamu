import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import { profile, links } from "@/data/profile";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-10 sm:py-16">
      <main className="flex w-full max-w-xs flex-col items-center gap-10 rounded-[2.5rem] border border-gray-300 bg-white px-6 py-10">
        <ProfileHeader profile={profile} />
        <LinkList links={links} />
      </main>
    </div>
  );
}
