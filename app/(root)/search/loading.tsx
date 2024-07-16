import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <div className="mt-14 flex flex-col gap-9">
      {Array.from({ length: 5}).map((_, index) => (
        <article key="index" className="user-card">
        <div className="user-card_avatar">
          {/* <Image
          src={imgUrl}
          alt="logo"
          width={48}
          height={48}
          className="rounded-full"
          /> */}
          <Skeleton className="rounded-full w-[48px] h-[48px]"/>

          <div className="flex-1 text-ellipsis">
            {/* <h4 className="text-base-semibold text-light-1">{name}</h4>
            <p className="text-small-medium text-gray-1">@{username}</p> */}
            <Skeleton className="rounded-xl w-36 mb-2 h-4"/>
            <Skeleton className="rounded-xl w-32 h-2"/>
          </div>
        </div>

        <Skeleton className="rounded-xl max-xs:w-full w-24 h-9"/>

        {/* <Button className="user-card_btn" onClick={() => {
          router.push(`/profile/${id}`);
        }}>View</Button> */}
      </article>
      ))}
        
      </div>
    </section>
  )
}

export default Loading