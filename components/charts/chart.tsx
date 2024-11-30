"use client";
import ApexChart from "react-apexcharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type ChartProps = {
  title: string;
  state: any;
  type:
    | "area"
    | "line"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";
  selectedYear: string;
  setSelectedYear: (value: string) => void;
};

export function Chart({
  title,
  state,
  type,
  selectedYear,
  setSelectedYear,
}: ChartProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2022 },
    (_, index) => currentYear - index
  );

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="w-full max-w-sm space-y-2">
            <Label htmlFor="year-select">Selecione um ano</Label>
            <Select value={selectedYear} onValueChange={handleYearChange}>
              <SelectTrigger id="year-select">
                <SelectValue placeholder="Select a year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedYear && (
              <p className="text-sm text-muted-foreground">
                Ano: {selectedYear}
              </p>
            )}
          </div>
          <ApexChart
            options={state.options}
            series={state.series}
            type={type}
            height={350}
          />
        </div>
      </CardContent>
    </Card>
  );
}
