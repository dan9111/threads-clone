import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

const Loading = () => {
  return (
    <section>
      <Tabs defaultValue="reply" className="w-full">
        <TabsList className="tab">
          <TabsTrigger value="reply" className="tab">
            <Image src={`/assets/reply.svg`} alt="reply" width={24} height={24} />
            <p className="max-sm:hidden">Replies</p>
          </TabsTrigger>
          <TabsTrigger value="like" className="tab">
            <Image src={`/assets/heart-gray.svg`} alt="like" width={24} height={24} />
            <p className="max-sm:hidden">Likes</p>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <section className="mt-10 flex flex-col gap-5">
        {Array.from({ length: 6}).map((_, index) => (
          <Skeleton key={index} className="activity-card h-12"/>
        ))}
      </section>
    </section>
  )
}

export default Loading