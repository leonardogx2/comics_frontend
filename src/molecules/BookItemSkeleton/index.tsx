import React from "react";
import SkeletonBox from "../../atoms/SkeletonBox";

const BookItemSkeleton = () => {
  return (
    <li className="flex h-64 w-[170px] min-w-[170px] animate-pulse cursor-wait flex-col items-center justify-center gap-3 rounded">
      <SkeletonBox className="h-2/3 w-4/6"></SkeletonBox>
      <div className="flex w-4/5 flex-col gap-2">
        <SkeletonBox className="h-2"></SkeletonBox>
        <SkeletonBox className="h-3 w-12"></SkeletonBox>
      </div>
    </li>
  );
};

export default BookItemSkeleton;
