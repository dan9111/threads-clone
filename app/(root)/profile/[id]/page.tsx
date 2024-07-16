import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async ({params}: {params: {id: string}}) => {

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(params.id);

    const currentUserInfo = await fetchUser(user.id);
    if (!currentUserInfo?.onboarded) redirect("/onboarding");

    return (
        <section>
            <ProfileHeader
            accountId={userInfo.id}
            accountObjectId={userInfo._id}
            authUserId={user.id}
            currentUserId={currentUserInfo._id}
            name={userInfo.name}
            username={userInfo.username}
            imgUrl={userInfo.image}
            bio={userInfo.bio}
            type="User"
            following={userInfo.following}
            followers={userInfo.followers}
            />

            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                <Image src={tab.icon} alt={tab.label} width={24} height={24} />
                                <p className="max-sm:hidden">{tab.label}</p>

                                {tab.label === "Threads" && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        {userInfo?.threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.map((tab) => (
                        <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1">
                            <ThreadsTab
                            currentUserId={currentUserInfo._id}
                            accountId={userInfo.id}
                            accountType="User"
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}

export default Page