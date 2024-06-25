import React, { useEffect, useState } from "react";
import Modal, { ModalProps } from "../../templates/Modal";
import Text from "@/atoms/Text";
import CartItem from "@/molecules/CartItem";
import { getAllBooks } from "@/services/book/getAllBooks";
import { Book } from "@/interfaces";
import Box from "@/molecules/Box";
import { Button } from "@/components/ui/button";
import PaginationBox from "@/molecules/PaginationBox";
import { useNavigate } from "react-router-dom";
import TotalPriceBox from "@/atoms/TotalPriceBox";
import CartItemSkeleton from "@/molecules/CartItemSkeleton";
import SkeletonBox from "@/atoms/SkeletonBox";
import { delToCart } from "@/services/book/delToCart";

const ModalCart = ({ isVisible, onClose }: Omit<ModalProps, "children">) => {
  const [cartBooks, setCartBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [totalCartInBRL, setTotalCartInBRL] = useState<number>(0);
  const navigate = useNavigate();

  const takeBooks = async () => {
    setLoading(true);
    setTimeout(
      async () => {
        const booksAndTotal = await getAllBooks({
          page,
          size: 4,
          inCart: true,
        });
        setCartBooks(booksAndTotal.books);
        setTotal(booksAndTotal.total);
        setTotalCartInBRL(booksAndTotal.totalCartInBRL as number);

        setLoading(false);
      },
      page === 1 ? 800 : 300,
    );
  };

  const deleteHandler = async (id: string) => {
    await delToCart(id);
    setCartBooks((prevValue) => prevValue.filter((book) => book.id !== id));
  };

  useEffect(() => {
    if (isVisible) {
      takeBooks();
    } else {
      setCartBooks([]);
      setLoading(true);
      setPage(1);
    }
  }, [isVisible, page]);

  return (
    <Modal
      anim={{
        from: { opacity: 0, transform: "translateX(100%)" },
        enter: { opacity: 1, transform: "translateX(0%)" },
        leave: { opacity: 0, transform: "translateX(100%)" },
      }}
      className="fixed inset-0 left-auto right-0 top-0 mx-0 my-0 h-screen w-[400px] max-w-[400px] select-none rounded-none"
      isVisible={isVisible}
      onClose={onClose}
    >
      <Box className="flex h-full w-[380px] flex-col">
        <Text Tag="h2">Meu carrinho</Text>
        <Box className="grid h-full w-full grid-rows-2">
          <Box className="bg-blue w-full">
            <ul className="flex w-full flex-col gap-4 pb-2">
              {!loading && cartBooks && cartBooks.length ? (
                cartBooks.map((cartBook) => (
                  <CartItem
                    onDelete={deleteHandler}
                    key={cartBook.id}
                    title={cartBook.title}
                    id={cartBook.id}
                    Image={cartBook.Image!}
                    valueInBRL={cartBook.offerInBRL || cartBook.priceInBRL}
                  />
                ))
              ) : !loading && (!cartBooks || !cartBooks.length) ? (
                <Text
                  Tag="p"
                  className="mx-auto mt-10 text-start text-sm font-semibold text-gray-500"
                >
                  Hmm,
                  <br /> seu carrinho parece vazio.
                </Text>
              ) : (
                Array.from({ length: 4 }, (_, i) => (
                  <CartItemSkeleton largeTitle={i % 2 === 0} key={i} />
                ))
              )}
            </ul>
            {!loading && (
              <PaginationBox
                total={total}
                onBack={() => setPage((prevValue) => prevValue - 1)}
                onNext={() => setPage((prevValue) => prevValue + 1)}
                page={page}
                size={5}
              />
            )}
          </Box>
          <Box className="flex flex-col gap-4 self-end">
            <TotalPriceBox loading={loading} value={totalCartInBRL} />
            {!loading && totalCartInBRL ? (
              <Button variant="blue" onClick={() => navigate("/checkout")}>
                Finalizar Compra
              </Button>
            ) : loading ? (
              <SkeletonBox className="h-10 w-full rounded px-4 py-2" />
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCart;
