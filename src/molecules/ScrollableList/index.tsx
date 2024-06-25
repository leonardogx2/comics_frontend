import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ScrollableListProps {
  children: React.ReactNode;
  className?: string;
}

type TDirection = "LEFT" | "RIGHT";

const ScrollableList = ({ children, className }: ScrollableListProps) => {
  const [currentScroll, setCurrentScroll] = useState<number>(0);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollLeft = 0;
    }
  }, [listRef.current]);

  useEffect(() => {
    if (listRef.current) {
      const isAtStart = listRef.current.scrollLeft <= 10;
      const isAtEnd =
        listRef.current.scrollLeft + listRef.current.clientWidth >=
        listRef.current.scrollWidth - 10;

      setShowLeftArrow(!isAtStart);
      setShowRightArrow(!isAtEnd);
    }
  }, [currentScroll, listRef.current]);

  const Arrow = ({ direction }: { direction: TDirection }) => {
    return (
      <div
        onClick={() => handleScroll(direction)}
        className={`absolute z-[50] ${
          direction === "RIGHT" ? "-right-[30px]" : "-left-[30px]"
        } w-[60px] h-[60px] bg-white shadow-lg rounded-full flex items-center justify-center p-1 text-2xl text-default-red hover:shadow-2xl cursor-pointer`}
      >
        {direction === "LEFT" ? <FaChevronLeft /> : <FaChevronRight />}
      </div>
    );
  };

  const handleScroll = (direction: TDirection) => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: direction === "RIGHT" ? 250 : -250,
        behavior: "smooth",
      });
      setCurrentScroll(listRef.current.scrollLeft);
    }
  };

  return (
    <>
      {showLeftArrow ? <Arrow direction="LEFT" /> : <></>}
      <ul ref={listRef} className={className || ""}>
        {children}
      </ul>
      {showRightArrow ? <Arrow direction="RIGHT" /> : <></>}
    </>
  );
};

export default ScrollableList;
