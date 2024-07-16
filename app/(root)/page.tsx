import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

import { fetchFollowedPosts, fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
  

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1, 25);
  
  const followedResult = await fetchFollowedPosts(
    userInfo._id, searchParams.page ? +searchParams.page : 1, 25);



  return(
    <div>
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="tab">
          <TabsTrigger value="following" className="tab">
          <p className="">Following</p>
          </TabsTrigger>
          <TabsTrigger value="home" className="tab">
          <p className="">Home</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home" className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
              key={post._id}
              id={post._id}
              currentUserId={userInfo._id}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
              likedBy={post.likedBy}
               />
            ))}
          </>
        )}
      </TabsContent>
      <TabsContent value="following" className="flex flex-col gap-9">
        {followedResult.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {followedResult.posts.map((post) => (
              <ThreadCard
              key={post._id}
              id={post._id}
              currentUserId={userInfo._id}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
              likedBy={post.likedBy}
               />
            ))}
          </>
        )}
      </TabsContent>
      </Tabs>

      <Pagination
      path='/'
      pageNumber={searchParams.page ? +searchParams.page : 1}
      isNext={result.isNext}
      />
    </div>
  )
}