"use client";
import React, { useEffect, useState } from "react";

import { getApplicationsProgress } from "@/api/job_applications.api";
import { Chart } from "./chart";

export function SelectionProcesses() {
  const [counts, setCounts] = useState<{ name: string; data: number[] }[]>([]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  useEffect(() => {
    const count = async () => {
      const data: any[] | undefined = await getApplicationsProgress(
        selectedYear
      );
      if (data) {
        setCounts(data);
      }
    };

    count();
  }, [selectedYear]);

  const allMonths = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const currentMonth = new Date().getMonth();

  const pastMonths = allMonths.slice(0, currentMonth + 1);

  const state = {
    series: counts,
    options: {
      chart: {
        height: 350,
        type: "line" as "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: pastMonths,
        title: {
          text: "",
        },
      },
      yaxis: {
        title: {
          text: "Número por etapa",
        },
        min: 0,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  };

  return (
    <Chart
      title="Progresso dos processos seletivos"
      state={state}
      type="line"
      selectedYear={selectedYear}
      setSelectedYear={setSelectedYear}
    />
  );
}
