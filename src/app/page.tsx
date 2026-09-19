import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import { profile, links } from "@/data/profile";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16 sm:py-24">
      <main className="flex w-full max-w-sm flex-col items-center gap-12">
        <ProfileHeader profile={profile} />
        <LinkList links={links} />
      </main>
    </div>
  );
}
