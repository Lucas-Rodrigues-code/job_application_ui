"use client";
import React, { useEffect, useState } from "react";

import { getStats } from "@/api/job_applications.api";
import { Chart } from "./chart";

type Stats = {
  status: string;
  count: number;
};

export function SimplePie() {
  const data_pie = [
    {
      status: "Candidato",
      count: 0,
    },
    {
      status: "Entrevista Inicial",
      count: 0,
    },
    {
      status: "Em andamento",
      count: 0,
    },
    {
      status: "Contratado",
      count: 0,
    },
    {
      status: "Rejeitado",
      count: 0,
    },
  ];

  const [data, setData] = useState<Stats[]>(data_pie);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  useEffect(() => {
    const count = async () => {
      const data: Stats[] | undefined = await getStats(selectedYear);
      if (data) {
        data.forEach((item) => {
          switch (item.status) {
            case "candidato":
              data_pie[0].count = item.count;
              break;
            case "entrevista_inicial":
              data_pie[1].count = item.count;
              break;
            case "em_andamento":
              data_pie[2].count = item.count;
              break;
            case "contratado":
              data_pie[3].count = item.count;
              break;
            case "rejeitado":
              data_pie[4].count = item.count;
              break;
          }
        });
        setData(data_pie);
      }
    };

    count();
  }, [selectedYear]);

  const state = {
    series: data.map((item) => item.count),
    options: {
      chart: {
        width: 380,
        type: "pie" as "pie",
      },
      labels: data.map((item) => item.status),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <Chart
      title="Status das Candidaturas"
      state={state}
      type="pie"
      selectedYear={selectedYear}
      setSelectedYear={setSelectedYear}
    />
  );
}
