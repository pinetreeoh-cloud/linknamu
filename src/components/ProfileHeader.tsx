import AvatarCarousel from "@/components/AvatarCarousel";
import type { Profile } from "@/types/link";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="relative h-32 w-32 overflow-hidden rounded-full bg-orange-100 ring-4 ring-white/80 shadow-[0_18px_36px_-12px_rgba(190,100,40,0.45),0_4px_10px_-2px_rgba(190,100,40,0.2)] sm:h-36 sm:w-36">
        {profile.avatarUrls?.length ? (
          <AvatarCarousel urls={profile.avatarUrls} alt={profile.name} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-orange-300">
            {profile.name.charAt(0)}
          </div>
        )}
        {/* 위쪽은 하이라이트, 아래쪽은 그림자로 살짝 볼록한 느낌을 준다 */}
        <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_3px_6px_rgba(255,255,255,0.45),inset_0_-8px_14px_rgba(120,60,20,0.16)]" />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-stone-800">
          {profile.name}
        </h1>
        <p className="whitespace-nowrap text-[13px] text-stone-600 sm:text-sm">
          {profile.bio}
        </p>
      </div>
    </div>
  );
}
