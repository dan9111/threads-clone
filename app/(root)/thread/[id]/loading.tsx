import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {

  return(
    <section className="relative">
      <div>
        <Skeleton className="w-full h-48"/>
      </div>
    </section>
  )
}