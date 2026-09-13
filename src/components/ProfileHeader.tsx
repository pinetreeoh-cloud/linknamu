import Image from "next/image";
import type { Profile } from "@/types/link";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-200 sm:h-36 sm:w-36">
        {profile.avatarUrl ? (
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            fill
            sizes="144px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-gray-500">
            {profile.name.charAt(0)}
          </div>
        )}
      </div>
      <h1 className="text-lg font-bold text-gray-900">{profile.name}</h1>
      <p className="text-sm text-gray-500">{profile.bio}</p>
    </div>
  );
}
