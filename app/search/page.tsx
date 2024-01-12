import { fetchResults } from "@/lib/fetchResults";
import { notFound } from "next/navigation";
import data  from "@/hotels.json";
import Link from "next/link";

type Props = {
    searchParams: SearchParams;
}

export type SearchParams = {
    url: URL;
    group_adults: string;
    group_children: string;
    checkin: string;
    checkout: string;
    no_rooms: string;
    locations: string;
}


async function SearchPage({ searchParams }: Props) {
    console.log(searchParams);
    console.log("Params")
    console.log(data)
    if(!searchParams.url) return notFound();

    const results = await fetchResults(searchParams);

  return (
    <section>
      <div className="mx-autp max-w-7xl p-6 lg:px-8">
        <h1 className="text-4xl font-bold pb-3">Your Trip Result</h1>

        <h2 className="pb-3">
            Dates of trip:
            <span className="italic ml-2">
                {searchParams.checkin} to {searchParams.checkout}
            </span>
        </h2>

        <hr className="mb-5"/>

        <h3 className="font-semibold text-xl">
            {searchParams.locations}
        </h3>

        <div className="space-y-2 mt-5 max-w-7xl">
            {data.map(item=>(
                <div key={item.name} className="flex space-y-2 justify-between space-x-4 p-5 border rounded-lg">
                <img src={item.imageUrl} alt="image of property" className="h-44 w-44 rounded-lg"/>
                
                <div className="flex flex-1 space-x-5 justify-between">
                <div>
                <Link href={item.name} className="font-bold text-blue-500 hover:text-blue-600 hover:underline">
                {item.name}
                </Link>
                <p className="text-xs">{item.description}</p>
                </div>
                <div className="flex flex-col justify-between">
                <div className="flex items-start justify-end space-x-2 text-right">
                <div>
                <p className="font-bold">{item.degree}</p>
                <p className="text-sm">{item.reviews} reviews</p>
                </div>

                <p className="flex items-center justify-center font-bold text-sm w-10 h-10 text-white bg-blue-900 rounded-lg flex-shrink-0">
                {item.rating || "N/A"}
                </p>
                </div>
                <div className="text-right">
                    <p className="text-xs">{item.options}</p>
                    <p className="text-2xl font-bold">{item.price}</p>
                </div>
                </div>
                </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default SearchPage
