import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Example() {
  return (
    <div className="flex items-center justify-between border-t border-gray-200  px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          to={""}
          className="relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-100"
        >
          Previous
        </Link>
        <Link
          to={""}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-100"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">8</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Link
              to={""}
              className="relative inline-flex items-center rounded-l-md border border-gray-300  px-2 py-2 text-sm font-medium text-gray-500 hover:bg-orange-100 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>         
            <Link
              aria-current="page"
              className="relative z-10 inline-flex items-center border border-orange-400 bg-orange-100 px-4 py-2 text-sm font-medium text-orange-400 focus:z-20"
              to={""}
            >
              1
            </Link>
            <Link
              to={""}
              className="relative inline-flex items-center border border-gray-300  px-4 py-2 text-sm font-medium text-gray-500 hover:bg-orange-100 focus:z-20"
            >
              2
            </Link>
            <Link
              to={""}
              className="relative hidden items-center border border-gray-300  px-4 py-2 text-sm font-medium text-gray-500 hover:bg-orange-100 focus:z-20 md:inline-flex"
            >
              3
            </Link>
            <span className="relative inline-flex items-center border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700">
              ...
            </span>
            <Link
              to={""}
              className="relative hidden items-center border border-gray-300  px-4 py-2 text-sm font-medium text-gray-500 hover:bg-orange-100 focus:z-20 md:inline-flex"
            >
              8
            </Link>
           
            <Link
              to={""}
              className="relative inline-flex items-center rounded-r-md border border-gray-300  px-2 py-2 text-sm font-medium text-gray-500 hover:bg-orange-100 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
