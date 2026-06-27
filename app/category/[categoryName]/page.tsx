"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import VerticalBookCard from "@/components/custom/VerticalBookCard";
import { clearFilters, toggleCategory } from "@/store/features/product/filterSlice";

const CategoryNamePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const categoryName = params?.categoryName ? decodeURIComponent(params.categoryName as string) : "";

  useEffect(() => {
    if (categoryName) {
      dispatch(clearFilters());
      dispatch(toggleCategory(categoryName));
    }
  }, [categoryName, dispatch]);

  return (
    <div className="container mx-auto bg-white text-[#1A1A1A] flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-slate-800">{categoryName || "Category"}</h2>
      <div className="flex flex-col gap-10">
        <VerticalBookCard categoryPage />
      </div>
    </div>
  );
};

export default CategoryNamePage;
