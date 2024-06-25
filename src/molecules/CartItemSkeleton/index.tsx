import React from "react";
import SkeletonBox from "../../atoms/SkeletonBox";

const CartItem = ({ largeTitle }: { largeTitle?: boolean }) => {
  return (
    <li className="grid h-[70px] min-h-[70px] w-full animate-pulse grid-cols-[50px_1fr] gap-3">
      <SkeletonBox className="h-full w-full" />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3 p-1">
          <SkeletonBox
            className={`w-[${largeTitle ? "200px" : "100px"}] h-[10px]`}
          />
          <SkeletonBox className="h-[7px] w-[50px]" />
        </div>
        <SkeletonBox className="h-9 w-9 rounded-full" />
      </div>
    </li>
  );
};

export default CartItem;
