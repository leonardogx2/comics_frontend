import React, { useEffect, useState } from "react";
import DashboardItem from "../../molecules/DashboardItem";
import DashboardOrders from "../../organisms/DashboardOrders";
import MainBox from "@/templates/MainBox";
import Box from "@/molecules/Box";
import { IGetDashboard, getDashboard } from "@/services/user/getDashboard";
import { convertToBRL } from "@/infra/utils";

const DashboardPage = () => {
  const [dashboardInfos, setDashboardInfos] = useState<
    IGetDashboard | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);

  const takeDashboardInfo = async () => {
    setLoading(true);
    const reqDashboardInfos = await getDashboard();
    setDashboardInfos(reqDashboardInfos);
    setLoading(false);
  };

  useEffect(() => {
    takeDashboardInfo();
  }, []);

  return !loading && dashboardInfos ? (
    <MainBox withAside large transparent>
      <Box className="flex flex-col gap-4">
        <ul className="flex w-full items-center justify-between gap-8">
          <DashboardItem
            title="Vendas hoje"
            value={dashboardInfos.sellsToday}
          />
          <DashboardItem
            title="Saldo disponível"
            value={convertToBRL(dashboardInfos.balance)}
          />
          <DashboardItem
            title="Quadrinhos a venda"
            value={dashboardInfos.booksInMarket}
          />
        </ul>
        <DashboardOrders data={dashboardInfos.orders} />
      </Box>
    </MainBox>
  ) : loading ? (
    <p>Carregando...</p>
  ) : (
    <p>Erro ao carregar dashboard</p>
  );
};

export default DashboardPage;
