import Text from "@/atoms/Text";
import TotalPriceBox from "@/atoms/TotalPriceBox";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { convertToBRL } from "@/infra/utils";
import { Book, CreateOrderControllerDTO } from "@/interfaces";
import Box from "@/molecules/Box";
import IconButton from "@/molecules/IconButton";
import LoadingPayment from "@/molecules/LoadingPayment";
import PaymentForm from "@/organisms/PaymentForm";
import { getAllBooks } from "@/services/book/getAllBooks";
import { createOrder } from "@/services/user/createOrder";
import MainBox from "@/templates/MainBox";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { PiArrowArcLeftLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [step, setStep] = useState<number>(1);
  const [paymentData, setPaymentData] = useState<
    CreateOrderControllerDTO | undefined
  >();
  const [cartBooks, setCartBooks] = useState<Book[]>([]);
  const [totalCartInBRL, setTotalCartInBRL] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const takeCartBooks = async () => {
    setLoading(true);
    const booksAndTotal = await getAllBooks({
      page: 1,
      size: 20,
      inCart: true,
      deleted: false,
    });
    setCartBooks(booksAndTotal.books);
    setLoading(false);
    setTotalCartInBRL(booksAndTotal.totalCartInBRL || 0);
  };

  useEffect(() => {
    if (step === 2) takeCartBooks();
  }, [step]);

  useEffect(() => {
    console.log(paymentData);
    if (paymentData) setStep(2);
  }, [paymentData]);

  const breadcrumbItems = [
    {
      title: "Home",
      path: "/",
    },
    { title: "Finalizar compra", path: "/checkout" },
  ];

  const submitOrderHandler = async () => {
    if (!paymentData) return setStep(1);
    setStep(4);

    setTimeout(async () => {
      try {
        await createOrder(paymentData);
        toast({
          title: "Pedido efetuado com sucesso!",
          description: "O vendedor já foi notificado e logo enviará seu pacote",
        });
        setSuccess(true);
        setTimeout(() => {
          navigate("/me/orders");
        }, 3000);
      } catch (err) {
        if (isAxiosError(err)) {
          toast({
            title: "Falha ao processar pagamento",
            description: err.response?.data.message,
          });
        }
        setStep(3);
      }
    }, 1000);
  };

  return (
    <MainBox
      breadcrumbItems={breadcrumbItems}
      withHeader
      transparent
      title="Finalizar compra"
    >
      <Box className="flex w-[1000px] flex-col gap-5">
        {step === 1 ? (
          <>
            <Box className="flex flex-col gap-4">
              <PaymentForm
                defaultData={paymentData}
                onSubmit={(data) => {
                  console.log("oIIi");
                  setPaymentData(data);
                }}
              />
            </Box>
          </>
        ) : step === 2 ? (
          <>
            <Box className="flex flex-col gap-4">
              <IconButton
                Icon={PiArrowArcLeftLight}
                onClick={() => setStep(1)}
              />
              <Text Tag="h2">Revisar pedido</Text>
              {!loading && cartBooks.length ? (
                <ul>
                  {cartBooks.map((cartBook) => (
                    <li
                      key={cartBook.id}
                      className="grid grid-cols-3 gap-3 border-b border-gray-100 p-2"
                    >
                      <Text>1x</Text>
                      <Text className="truncate">{cartBook.title}</Text>
                      <Text className="flex justify-end">
                        {convertToBRL(
                          cartBook.offerInBRL || cartBook.priceInBRL,
                        )}
                      </Text>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Carregando</p>
              )}
              <Box className="mt-6 flex flex-col gap-4">
                <TotalPriceBox hiddenPlots value={totalCartInBRL} />
                <Button
                  onClick={() => {
                    if (paymentData?.method === "PIX") {
                      setStep(3);
                    } else {
                      submitOrderHandler();
                    }
                  }}
                  variant="blue"
                  className="self-end"
                >
                  Efetuar pedido
                </Button>
              </Box>
            </Box>
          </>
        ) : step === 3 ? (
          <Box className="flex flex-col items-center gap-4">
            <Box className="flex items-center gap-2">
              <img src="/pix.png" className="h-[30px] w-[30px]" />
              <Text Tag="h2">Aponte para o QRCODE</Text>
            </Box>
            <img src="/fakeQR.png" className="h-[350px] w-[350px]" />
            <Box className="flex items-center gap-2">
              <Text Tag="p" className="w-[300px] truncate">
                MDAwMjAxMjYxNDAwMTRici5nb3YuYmNiLnBpeDAxMTIzNDU2Nzg5MDA1MjA0MDAwNTMwMzk4NjU0MDQwMTAwMDA1ODAyQlI1OTA4RnVsYW5vICA2MDA0U1AgNjIwNTA1MDAwMHRlc3RlNjMwNDAwMDA=
              </Text>
              <Button variant="blue">Copiar</Button>
            </Box>
            <Button className="mt-4" onClick={submitOrderHandler}>
              Já paguei
            </Button>
          </Box>
        ) : step === 4 ? (
          <LoadingPayment success={success} />
        ) : (
          <></>
        )}
      </Box>
    </MainBox>
  );
};

export default CheckoutPage;
