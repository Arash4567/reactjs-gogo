import axios from 'axios'
import 'izitoast/dist/css/iziToast.min.css'
import {
  useInfiniteQuery
} from 'react-query'

export default function Index<ReactNode>() {
  const fetchProducts = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`https://api.instantwebtools.net/v1/passenger?page=${pageParam}&size=10`)
    return data
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading
  } = useInfiniteQuery('projects', fetchProducts, {
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })

  if (isLoading) return "Loading...";

  console.log(hasNextPage);

  // if (error) return "An error has occurred: " + error.message;

  // Load more

  return (
    <>
      {data?.pages.map((group, i) => (
        <div key={i}>
          {group.data.map((project: any, idx: number) => (
            <p key={idx}>{project.name}</p>
          ))}
        </div>
      ))}
      <button onClick={() => fetchNextPage()} className="p-2 bg-blue-600 text-white rounded-lg cursor-pointer"
        disabled={!hasNextPage || isFetchingNextPage}>{isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}</button>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}