import { formatCount, formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "../shared/LikeButton";

interface ThreadCardProps {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
        username: string;
    }
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        }
    }[];
   isComment?: boolean;
   isOwner?: boolean;
   likedBy: string[];
}

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
    isOwner,
    likedBy
}: ThreadCardProps) => {

   return (
      <article className={`flex w-full flex-col rounded-xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
         <div className="flex items-start justify-between">
            <div className="flex w-full flex-1 flex-row gap-4">
               <div className="flex flex-col items-center">
                  <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                     <Image
                     src={author.image}
                     alt="Profile Image"
                     fill
                     className="cursor-pointer rounded-full"
                     />
                  </Link>

                  <div className="thread-card_bar"/>
               </div>

               <div className="flex w-full flex-col">
                  <Link href={`/profile/${author.id}`} className="w-fit flex flex-col md:flex-row gap-1 md:gap-2 items-start md:items-center justify-start md:justify-center">
                     <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                     <h5 className="cursor-pointer text-subtle-medium text-gray-1">{`@${author.username}`}</h5>
                     <p className="hidden md:flex items-center text-subtle-medium text-gray-1">•</p>
                     <p className="flex items-center text-subtle-medium text-gray-1">{formatDateString(createdAt)}</p>
                  </Link>

                  <p className="mt-4 md:mt-2 text-small-regular text-light-2">{content}</p>

                  <div className={`mt-5 flex flex-col gap-3 ${isComment && 'mb-10'}`}>
                     <div className="flex gap-3.5">
                        <LikeButton
                           threadId={JSON.parse(JSON.stringify(id))}
                           userId={currentUserId}
                           likedBy={likedBy}
                        />
                        <Link href={`/thread/${id}`} className="flex items-center justify-center gap-1">
                           <Image src={`/assets/reply.svg`} alt="reply" width={24} height={24} className="cursor-pointer object-contain"/>
                           {comments.length > 0 && (
                           <p className="text-subtle-medium text-light-4">{formatCount(comments.length)}</p>
                           )}
                        </Link>
                        <Image src={`/assets/repost.svg`} alt="repost" width={24} height={24} className="cursor-pointer object-contain"/>
                        <Image src={`/assets/share.svg`} alt="share" width={24} height={24} className="cursor-pointer object-contain"/>
                     </div>

                  </div>
               </div>
            </div>

            {/* Delete thread */}
            {/* Show comment logo */}


         </div>
         {!isComment && comments.length > 0 && (
            <Link href={`/thread/${id}`} className="flex items-center justify-start">
               {/* Add member images here */}
               {comments.slice(0, 3).map((member, index) => (
               <Image
                  key={index}
                  src={member.author.image}
                  alt={`user_${index}`}
                  width={18}
                  height={18}
                  className={`${
                     index !== 0 && "-ml-2"
                  } rounded-full object-cover mt-3`}
               />
               ))}
               <p className="mt-3 text-subtle-medium text-gray-1 ml-2">{comments.length} replies</p>
            </Link>
         )}

         {!isComment && community && (
               <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
                  <p className="text-subtle-medium text-gray-1">
                     {community.name} Community
                  </p>

                  <Image
                  src={community.image}
                  alt={community.name}
                  width={14}
                  height={14}
                  className="ml-1 rounded-full object-cover"
                  />
               </Link>
            )}
      </article>
   )
}

export default ThreadCard;