import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface ThreadsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType
}: ThreadsTabProps) => {
  let result: any;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }
  // fetch profile threads

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard 
        key={thread._id}
        id={thread._id}
        currentUserId={currentUserId}
        parentId={thread.parentId}
        content={thread.text}
        author={accountType === "User" ? {
          name: result.name,
          image: result.image,
          username: result.username,
          id: accountId
        } : {
          name: thread.author.name,
          image: thread.author.image,
          username: thread.author.username,
          id: thread.author.id
        }}
        community={accountType === "User" ? thread.community : result}
        createdAt={thread.createdAt}
        comments={thread.children}
        likedBy={thread.likedBy}
         />
      ))}
    </section>
  )
}

export default ThreadsTab;