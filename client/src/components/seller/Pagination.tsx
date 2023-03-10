import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const throttle = (func: any, delay: number) => {
  let wait = false;
  return () => {
    if (wait) {
        return;
    }
    func()
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  }
}

const PageListButton: React.FC<{
  total: number;
  size: number;
  handlePage: Function;
}> = ({ total, size, handlePage }) => {

  const pages = Math.ceil(total / size);
  const [curPage, setCurPage] = useState(1);

  const handleMinus = () => {
    if (curPage > 1) {
      setCurPage(n => n- 1);
    }
  };
  const handlePlus = () => {
    if (curPage < pages) {
      setCurPage(n => n + 1);
    }

  };

  useEffect(() => {
    handlePage(curPage - 1);
  }, [curPage])

  return (
    <div className="flex items-center justify-between border-t border-gray-200  px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-evenly">
        <Button
          onClick={throttle(handleMinus, 750)}
          className="relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium hover:bg-orange-100"
        >
          Previous
        </Button>

        <Button
          onClick={throttle(handlePlus, 750)}
          className="relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium hover:bg-orange-100"
        >
          Next
        </Button>
      </div>
      <div className=" sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm">
            Showing{" "}
            <span className="font-medium">{total< size ? 1 : curPage * size - size + 1}</span> {"to "}
            <span className="font-medium">
              {total < size ? total : curPage === pages ? total : curPage * size}
            </span>{" "}
            / <span className="font-medium">{total}</span> results
          </p>
        </div>
      </div>
    </div>
  );
};
export default PageListButton;