import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {Array.from({ length: 6}).map((_, index) => (
          <Skeleton key={index} className="activity-card h-12"/>
        ))}
      </section>
    </section>
  )
}

export default Loading