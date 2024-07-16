import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <>
        <h1 className="head-text">Post Thread</h1>

        <div className="mt-10 flex flex-col justify-start gap-10">
                <div className="flex gap-3 md:gap-6 w-full">
									<Skeleton className="w-10 h-10 md:h-20 md:w-20 rounded-full relative aspect-square flex shrink-0"/>
									<Skeleton className="w-full h-96"/>
								</div>
						<Skeleton className="w-full h-12"/>
          </div>
    </>
)
}

export default Loading