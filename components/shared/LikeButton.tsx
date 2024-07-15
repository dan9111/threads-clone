"use client"
import { useState } from "react"
import { likeThread } from "@/lib/actions/thread.actions"
import { usePathname } from "next/navigation"

import Image from "next/image"

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
  const pathname = usePathname()
  const [liked, setliked] = useState(likedBy.includes(userId))

  const handleLike = async () => {
    try {
      await likeThread(threadId, userId, pathname)
      setliked(!liked)
    } catch (err) {
      console.error("Error while liking thread:", err)
    }
  }

  return (
    <a onClick={handleLike}>
      <div className="flex items-center gap-1">
      <Image src={liked ? `/assets/heart-filled.svg` : `/assets/heart-gray.svg`} alt="heart" width={24} height={24} className="cursor-pointer object-contain"/>
      {likedBy.length > 0 && (<p className="text-subtle-medium text-light-4">{likedBy.length}</p>)}
      </div>
    </a>
  )
}

export default LikeButton