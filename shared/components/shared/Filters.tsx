"use client";
import { Title } from "./Title";
import { Input } from "../ui";
import { RangeSlider } from "./RangeSlider";
import CheckboxFiltersGroup from "./CheckboxFiltersGroup";
import { useIngredients } from "@/shared/hooks/useIngredients";
import { useFilters } from "@/shared/hooks/useFilters";
import { useQueryFilters } from "@/shared/hooks/useQueryFilters";

interface Props {
  className?: string;
}

export function Filters({ className }: Props) {
  const { ingredients, loading } = useIngredients();

  const filters = useFilters();
  useQueryFilters(filters);

  const items = ingredients?.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[])=>{
    filters.setPrices( 'priceFrom', prices[0])  
    filters.setPrices( 'priceTo', prices[1])  
  }

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />
      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: "20см", value: "20" },
          { text: "30см", value: "30" },
          { text: "40см", value: "40" },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={0}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrices}
        />
      </div>
      <CheckboxFiltersGroup
        title="Ингридиенты"
        className="mt-5"
        limit={6}
        loading={loading}
        defaultItems={items?.slice(0, 6)}
        items={items}
        onClickCheckbox={filters.setSelectedIngredients}
        name="ingredients"
        selected={filters.selectedIngredients}
      />
    </div>
  );
}
