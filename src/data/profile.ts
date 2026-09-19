import type { LinkItem, Profile } from "@/types/link";

export const profile: Profile = {
  name: "피리부는 소년",
  bio: "음악과 미술과 프로그램 특히 AI에 관심이 많아요",
  avatarUrls: ["/profile_real.png", "/profile_ghibli.png"],
};

export const links: LinkItem[] = [
  {
    id: "facebook",
    title: "👍 Facebook",
    url: "https://www.facebook.com/jinyoung.oh.904",
  },
  {
    id: "instagram",
    title: "📸 Instagram",
    url: "https://www.instagram.com/flute_boy_jy/",
  },
  { id: "email", title: "📧 이메일", url: "mailto:flute_boy@naver.com" },
];
