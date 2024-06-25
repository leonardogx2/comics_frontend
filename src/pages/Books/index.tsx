import { Book, BookCategory, TOrderBy } from "@/interfaces";
import BookList from "@/molecules/BookList";
import Box from "@/molecules/Box";
import Header from "@/organisms/Header";
import MainBox from "@/templates/MainBox";
import FilterBox from "@/organisms/FilterBox";
import { getAllBooks } from "@/services/book/getAllBooks";
import React, { useEffect, useState } from "react";
import { TFilterBoxSchema } from "@/organisms/FilterBox/validator";
import PaginationBox from "@/molecules/PaginationBox";
import { useSearchParams } from "react-router-dom";
import { validateParamValue } from "@/infra/utils";

/*
FILTROS:
  ano
  autor
  preço inicial - preço final
  em oferta
  em estoque

ORDENAÇÂO
  maior preço
  menor preço
  mais vendidos
  a-z
  z-a
*/

const BooksPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [submited, setSubmited] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchParams, ,] = useSearchParams();
  const [filters, setFilters] = useState<
    TFilterBoxSchema & { page: number; size: number }
  >({ page: 1, size: 5 });
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const breadcrumbItems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Quadrinhos",
      path: "/comics",
    },
  ];

  const takeBooks = async () => {
    setLoading(true);
    const reqBooks = await getAllBooks({
      ...filters,
      category: filters.category as BookCategory | undefined,
      orderBy: filters.orderBy as TOrderBy,
    });
    setBooks(reqBooks.books);
    setTotal(reqBooks.total);
    setLoading(false);
  };

  useEffect(() => {
    takeBooks();
    takeBooks();
  }, [filters, page]);

  useEffect(() => {
    if (submited) {
      receiveParamFilters();
      setSubmited(false);
    }
  }, [submited]);

  useEffect(() => {
    receiveParamFilters();
  }, []);

  const receiveParamFilters = async () => {
    setLoading(true);
    const paramReleaseYear = validateParamValue(
      searchParams.get("releaseYear"),
    );
    const paramStartPrice = validateParamValue(searchParams.get("startPrice"));
    const paramEndPrice = validateParamValue(searchParams.get("endPrice"));
    const paramCategory = validateParamValue(searchParams.get("category"));
    const paramInOffer = validateParamValue(searchParams.get("inOffer"));
    const paramInStock = validateParamValue(searchParams.get("inStock"));
    const paramOrderBy = validateParamValue(searchParams.get("orderBy"));
    const paramAuthor = validateParamValue(searchParams.get("author"));

    setFilters({
      releaseYear: paramReleaseYear
        ? parseInt(paramReleaseYear + "")
        : undefined,
      orderBy: paramOrderBy,
      author: paramAuthor,
      startPrice: paramStartPrice ? parseInt(paramStartPrice + "") : undefined,
      endPrice:
        paramEndPrice && paramEndPrice !== "0"
          ? parseInt(paramEndPrice + "")
          : undefined,
      category: paramCategory,
      inOffer:
        paramInOffer === "true"
          ? true
          : paramInOffer === "false"
            ? false
            : undefined,
      inStock:
        paramInStock === "true"
          ? true
          : paramInStock === "false"
            ? false
            : undefined,
      page: 1,
      size: 10,
    });
    setLoading(false);
  };

  return (
    <>
      <Header />
      <MainBox
        breadcrumbItems={breadcrumbItems}
        medium
        transparent
        title="Pesquisar por quadrinhos"
      >
        <Box className="mt-10 grid grid-cols-[300px_1fr] gap-10">
          <FilterBox
            defaultFilters={filters}
            loading={loading}
            onSubmit={() => setSubmited(true)}
          />
          <Box className="flex flex-col gap-5">
            <BookList books={books} loading={loading} />
            <PaginationBox
              onBack={() => setPage((prevValue) => prevValue - 1)}
              onNext={() => setPage((prevValue) => prevValue + 1)}
              page={page}
              size={10}
              total={total}
            />
          </Box>
        </Box>
      </MainBox>
      ;
    </>
  );
};

export default BooksPage;
