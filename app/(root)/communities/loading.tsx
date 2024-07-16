import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {

  return (
    <>
      <h1 className="head-text mb-10">Communities</h1>

      <section className="mt-9 flex flex-warp gap-4">
      {Array.from({ length: 5}).map((_, index) => (
        <article key={index} className='community-card'>
        <div className='flex flex-wrap items-center gap-3'>

          <Skeleton className="relative h-12 w-12 rounded-full"/>
  
          <div>

            <Skeleton className="w-40 h-4 mb-2"/>

            <Skeleton className="w-32 h-2 mb-1"/>
          </div>
        </div>
  

        <Skeleton className="w-full mt-4 h-2 mb-1"/>
  
        <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>

          <Skeleton className="w-20 h-9"/>
        </div>
      </article>
      ))}
        
      </section>
    </>
  )
}

export default Loading