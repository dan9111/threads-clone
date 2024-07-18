import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

const Page = async () => {

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // get activity
  const {likedIds, replies} = await getActivity(userInfo._id);

  return (
    <section>
      <Tabs defaultValue="reply" className="w-full">
        <TabsList className="tab">
          <TabsTrigger value="reply" className="tab">
            <Image src={`/assets/reply.svg`} alt="reply" width={24} height={24} />
            <p className="max-sm:hidden">Replies</p>
            <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
              {replies.length > 0 ? replies.length : 0}
            </p>
          </TabsTrigger>
          <TabsTrigger value="like" className="tab">
            <Image src={`/assets/heart-gray.svg`} alt="like" width={24} height={24} />
            <p className="max-sm:hidden">Likes</p>
            <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
              {likedIds.length > 0 ? likedIds.length : 0}
            </p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reply" className="mt-10 flex flex-col gap-5">
        {replies.length > 0 ? (
          <>
           {replies.map((replies) => (
            <Link key={replies._id} href={`/thread/${replies.parentId}`}>
              <article className="activity-card">
                <div className="relative w-[20px] h-[20px]">
                <Image
                src={replies.author.image}
                alt="Profile picture"
                fill
                className="rounded-full object-cover"
                />
                </div>
                <p className="!text-small-regular text-light-1">
                  <span className="mr-1 text-primary-500">
                    {replies.author.name}
                  </span>{" "}
                  replied to your thread
                </p>
              </article>
            </Link>
           ))}
          </>
        ): <p className="!text-base-regular text-light-3">No activity yet</p>}
      </TabsContent>
      <TabsContent value="like" className=" flex flex-col gap-5">
        {replies.length > 0 ? (
          <>
           {replies.map((replies) => (
            <Link key={replies._id} href={`/thread/${replies.parentId}`}>
              <article className="activity-card">
                <div className="relative w-[20px] h-[20px]">
                <Image
                src={replies.author.image}
                alt="Profile picture"
                fill
                className="rounded-full object-cover"
                />
                </div>
                <p className="!text-small-regular text-light-1">
                  <span className="mr-1 text-primary-500">
                    {replies.author.name}
                  </span>{" "}
                  replied to your thread
                </p>
              </article>
            </Link>
           ))}
          </>
        ): <p className="!text-base-regular text-light-3">No activity yet</p>}
      </TabsContent>
      </Tabs>

      
    </section>
  )
}

export default Page