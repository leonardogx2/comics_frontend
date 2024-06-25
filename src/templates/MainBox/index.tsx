import Text from "@/atoms/Text";
import React from "react";
import Box from "../../molecules/Box";
import DefaultBreadcrumb from "../../molecules/DefaultBreadcrumb";
import Header from "@/organisms/Header";
import Aside from "@/molecules/Aside";
import { cn } from "@/lib/utils";

interface PropsMainBoxTemplate {
  title?: string;
  children: React.ReactNode;
  medium?: boolean;
  large?: boolean;
  withHeader?: boolean;
  withAside?: boolean;
  transparent?: boolean;
  breadcrumbItems?: { title: string; path: string }[];
  className?: string;
}

const MainBox = ({
  title,
  children,
  medium,
  large,
  transparent,
  withHeader,
  withAside,
  breadcrumbItems,
  className,
}: PropsMainBoxTemplate) => {
  return (
    <>
      {withHeader && <Header />}
      {withAside && <Aside />}
      <Box className="flex min-h-screen w-full flex-col gap-4 p-4">
        {breadcrumbItems && breadcrumbItems.length && (
          <DefaultBreadcrumb items={breadcrumbItems} />
        )}
        {title && <Text Tag="h1">{title}</Text>}
        <Box
          className={cn([
            `${!transparent && "bg-white"} ${withAside ? "pl-[50px] md:pl-[300px]" : ""} p-4 ${medium && "w-4/5"} ${large && "w-full"} mx-auto`,
            className,
          ])}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default MainBox;
