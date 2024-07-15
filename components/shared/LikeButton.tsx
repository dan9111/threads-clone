"use client"
import { useState } from "react"
import { likeThread } from "@/lib/actions/thread.actions"

import Image from "next/image"
import { formatCount } from "@/lib/utils"
import { set } from "mongoose"

interface LikeButtonProps {
  threadId: string;
  userId: string;
  likedBy: string[];
}

const LikeButton = ({
  threadId,
  userId,
  likedBy
}: LikeButtonProps) => {
  const [liked, setliked] = useState(likedBy.includes(userId))

  let [likeCount, setLikeCount] = useState(likedBy.length)

  const handleLike = async () => {
      setliked(!liked)
      setLikeCount(liked ? likeCount - 1 : likeCount + 1)
      await likeThread(threadId, userId).catch(() => {
        setliked(liked);
        setLikeCount(likeCount);
      })
  }

  return (
    <a onClick={handleLike}>
      <div className="flex items-center gap-1">
      <Image src={liked ? `/assets/heart-filled.svg` : `/assets/heart-gray.svg`} alt="heart" width={24} height={24} className="cursor-pointer object-contain"/>
      {likeCount > 0 && (<p className="text-subtle-medium text-light-4">{formatCount(likeCount)}</p>)}
      </div>
    </a>
  )
}

export default LikeButton