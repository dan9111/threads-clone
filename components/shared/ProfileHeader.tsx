"use client"

import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { followUser } from "@/lib/actions/user.actions";

interface ProfileHeaderProps {
  accountId: string;
  accountObjectId: string;
  authUserId: string;
  currentUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: 'User' | 'Community';
  following: string[];
  followers: string[];
}

const ProfileHeader = ({
  accountId,
  accountObjectId,
  authUserId,
  currentUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  following,
  followers
}: ProfileHeaderProps) => {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(followers.includes(currentUserId));

  let [followersCount, setFollowersCount] = useState(followers.length);

  const handleFollow = async () => {
      setIsFollowing(!isFollowing);
      setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1)

      await followUser(currentUserId, accountObjectId).catch(() => {
        setIsFollowing(isFollowing);
        setFollowersCount(followersCount);
      })
  }

  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex flex-col sm:flex-row items-start max-sm:gap-4 gap-2 sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
            src={imgUrl}
            alt="profile"
            width={96}
						height={96}
						priority
						className="rounded-full object-cover aspect-square"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>

        </div>
        {type === 'User' && 
          (authUserId !== accountId ? (
            <Button onClick={handleFollow} className={`rounded-full ${isFollowing ? "bg-dark-1 border border-primary-500" : "bg-primary-500"} `}>{isFollowing ? `Following` : `Follow`}</Button>
          ) : (
            <Button onClick={() => router.push('/edit-profile')} className={`rounded-full bg-dark-1 border border-primary-500 flex gap-2`}>
              <Image src="/assets/edit.svg" alt="edit" width={16} height={16} />
              <p>Edit Profile</p>
            </Button>
          ))
        }

        {/* Community Profile */}
      </div>
      {type === 'User' && (
        <div className="mt-4 text-small-medium text-gray-1 flex gap-4">
          <p><span className="text-light-1">{following.length > 0 ? `${following.length} ` : `0 `}</span>Following</p>
          <p><span className="text-light-1">{followersCount > 0 ? `${followersCount} ` : `0 `}</span>{followersCount === 1 ? `Follower` : `Followers`}</p>
        </div>
      )}
      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
      <div className="mt-12 h-0.5 w-full bg-dark-3"></div>
    </div>
  )
}

export default ProfileHeader;