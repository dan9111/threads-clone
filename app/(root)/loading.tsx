import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

export default function Loading() {

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
      </Tabs>

      <section className="mt-9 flex flex-col gap-10">
        <Skeleton className="flex w-full flex-col rounded-xl h-32"/>
        <Skeleton className="flex w-full flex-col rounded-xl h-32"/>
        <Skeleton className="flex w-full flex-col rounded-xl h-32"/>
      </section>
    </div>
  )
}