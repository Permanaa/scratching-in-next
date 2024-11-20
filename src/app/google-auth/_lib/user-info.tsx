"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/providers/AuthProvider";
import { CircleUserRound, Loader2 } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

const UserInfo: FC = () => {
  const { profile, isLoadingProfile, token } = useAuth();

  if (!token) {
    return (
      <div className="flex flex-col gap-3 items-center">
        <CircleUserRound className="h-[60px] w-[60px]" strokeWidth={1} />
        <div className="text-center">
          <p className="font-medium">Who Am I?</p>
          <p className="text-gray-500">Log in with google oauth 2.0</p>
        </div>
      </div>
    );
  }

  if (isLoadingProfile) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="w-[60px] h-[60px] rounded-full" />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src={profile?.picture || ""}
        alt={profile?.name || ""}
        width={60}
        height={60}
        className="rounded-full"
      />
      <div className="text-center">
        <p className="font-medium">{profile?.name}</p>
        <p className="text-gray-500">{profile?.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
