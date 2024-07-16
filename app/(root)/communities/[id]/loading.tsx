import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {

    return (
        <section>
            <div className="flex w-full flex-col justify-start">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-20 w-20 object-cover">
                    <Skeleton className="rounded-full object-cover aspect-square"/>
                  </div>

                  <div className="flex-1">
                    <Skeleton className="w-32 h-6"/>
                    {/* <h2 className="text-left text-heading3-bold text-light-1">{name}</h2> */}
                    <Skeleton className="w-32 h-2 mt-2"/>
                    {/* <p className="text-base-medium text-gray-1">@{username}</p> */}
                  </div>
                </div>

                {/* Community Profile */}
              </div>
            <Skeleton className="mt-6 max-w-lg h-24"/>
            {/* <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p> */}
            <div className="mt-12 h-0.5 w-full bg-dark-3"></div>
          </div>

            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {communityTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                <Image src={tab.icon} alt={tab.label} width={24} height={24} />
                                <p className="max-sm:hidden">{tab.label}</p>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {communityTabs.map((tab) => (
                        <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1">
                            <Skeleton className="flex w-full flex-col rounded-xl h-32 mt-4"/>
                            <Skeleton className="flex w-full flex-col rounded-xl h-32 mt-4"/>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}

export default Loading