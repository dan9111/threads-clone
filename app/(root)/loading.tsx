import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {

  return(
    <div>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        <Skeleton className="flex w-full flex-col rounded-xl h-32"/>
        <Skeleton className="flex w-full flex-col rounded-xl h-32"/>
        <Skeleton className="flex w-full flex-col rounded-xl h-32"/>
      </section>
    </div>
  )
}