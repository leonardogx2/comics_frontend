import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import Box from "../Box";

interface DefaultBreadcrumbProps {
  items: { title: string; path: string }[];
}

const DefaultBreadcrumb = ({ items }: DefaultBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map(({ title, path }, index: number) => {
          return (
            <Box className="flex items-center" key={title}>
              <BreadcrumbItem key={title}>
                <BreadcrumbLink href={path}>{title}</BreadcrumbLink>
              </BreadcrumbItem>
              {index + 1 !== items.length && <BreadcrumbSeparator />}
            </Box>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DefaultBreadcrumb;
