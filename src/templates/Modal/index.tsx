import IconButton from "@/molecules/IconButton";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { animated, useTransition } from "react-spring";

export interface ModalProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  className?: string;
  anim?: {
    from: { [key: string]: string | number };
    enter: { [key: string]: string | number };
    leave: { [key: string]: string | number };
  };
}

const ModalTemplate = ({
  children,
  onClose,
  isVisible,
  className,
  anim,
}: ModalProps) => {
  const mainContainerTransition = useTransition(
    isVisible,
    anim || {
      from: { scale: "50%", opacity: 0 },
      enter: { scale: "100%", opacity: 1 },
      leave: { scale: "150%", opacity: 0 },
    },
  );
  const shadowContainerTransition = useTransition(isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {mainContainerTransition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className={`fixed inset-0 z-[502] mx-auto my-auto h-fit w-fit rounded bg-white shadow-lg min-[370px]:p-4 ${className}`}
          >
            {children}
            <IconButton
              onClick={onClose}
              Icon={IoMdClose}
              className="absolute right-2 top-2 flex items-center justify-center bg-transparent p-4 text-red-500 shadow-none sm:hidden"
            />
          </animated.div>
        ) : (
          <></>
        ),
      )}
      {shadowContainerTransition((style, item) =>
        item ? (
          <animated.div
            style={style}
            onClick={onClose}
            className="fixed left-0 top-0 z-[501] h-full w-full bg-black bg-opacity-20"
          ></animated.div>
        ) : (
          <></>
        ),
      )}
    </>
  );
};

export default ModalTemplate;
