"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

interface props {
  pageNumber: number;
  genreId: string | undefined;
  totalPages: number;
}

const Pagination: React.FC<props> = ({ pageNumber, genreId, totalPages }) => {
  const {
    genre_name,
    with_genres,
    with_runtime_gte,
    with_runtime_lte,
    release_date_gte,
    release_date_lte,
  }: any = useSearchParams();
  const { query }: any = useSearchParams();
  const path = usePathname();

  let startPage = pageNumber - 2;
  let endPage = pageNumber + 2;
  startPage = Math.max(1, pageNumber - 2);
  endPage = Math.min(pageNumber + 2, totalPages);
  let linkBase: string = "";
  if (genreId !== undefined)
    linkBase = `/genres/${
      genreId !== undefined ? genreId + "?genre_name=" + genre_name + "&" : ""
    }`;
  else if (query !== undefined) {
    linkBase = path + `?query=${query}&`;
  } else {
    linkBase = `${linkBase}${path}?`;

    linkBase +=
      with_genres !== undefined
        ? "with_genres=" + with_genres + "&"
        : "" + with_runtime_gte !== "" && with_runtime_gte !== undefined
        ? "with_runtime_gte=" + with_runtime_gte + "&"
        : "" + with_runtime_lte !== "" && with_runtime_lte !== undefined
        ? "with_runtime_lte=" + with_runtime_lte + "&"
        : "" + release_date_gte !== "" && release_date_gte !== undefined
        ? "release_date_gte=" + release_date_gte + "&"
        : "" + release_date_lte !== "" && release_date_lte !== undefined
        ? "release_date_lte=" + release_date_lte + "&"
        : "";
  }

  const paginationLinks = () => {
    let content = [];
    let pages = pageNumber || 1;
    while (pages > startPage) {
      content.push(
        <Link
          key={startPage}
          aria-current={pages === pageNumber ? "page" : undefined}
          className="px-3 py-2 leading-tight  bg-white border 
                hover:bg-gray-100   border-gray-700 text-gray-400 hover:bg-gray hover:text-white"
          href={`${linkBase}page=${startPage}`}
        >
          {startPage}
        </Link>
      );
      startPage++;
    }
    while (pages <= endPage) {
      content.push(
        <Link
          key={pages}
          aria-current={pages === pageNumber ? "page" : undefined}
          className="px-3 py-2 leading-tight  bg-white border  
                hover:bg-gray-100   border-gray-700 text-gray-400 hover:bg-gray hover:text-white"
          href={`${linkBase}page=${pages}`}
        >
          {pages}
        </Link>
      );
      pages++;
    }
    return content;
  };

  return (
    <div className="text-center text-base m-5">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex items-center -space-x-px">
          {pageNumber > 1 && (
            <li>
              <Link
                href={`${linkBase}page=${pageNumber - 1}`}
                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 
                            rounded-l-lg hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 
                            text-gray-400 hover:bg-gray hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </li>
          )}
          {paginationLinks()}
          {pageNumber < totalPages && (
            <li>
              <Link
                href={`${linkBase}page=${pageNumber + 1}`}
                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 
                            rounded-r-lg hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 
                            text-gray-400 hover:bg-gray hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
