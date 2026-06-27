"use client";

import { useDispatch, useSelector } from "react-redux";
import { Footer } from "@/components/custom/Footer";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { RootState } from "@/store";
import { useGetCategoriesQuery, useGetAuthorsQuery } from "@/store/features/utilities/api";
import {
  toggleCategory,
  toggleAuthor,
  setPrice,
  clearFilters,
} from "@/store/features/product/filterSlice";

const price = ["Free", "Low to High", "High to Low"];

export default function OnubadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const {
    categories: selectedCategories,
    authors: selectedAuthors,
    price: selectedPrice,
    hasImage,
  } = useSelector((state: RootState) => state.productFilter);

  const { data: categoriesResponse } = useGetCategoriesQuery();
  const { data: authorsResponse } = useGetAuthorsQuery();

  const handleCategoryChange = (category: string) => {
    dispatch(toggleCategory(category));
  };

  const handleAuthorChange = (author: string) => {
    dispatch(toggleAuthor(author));
  };

  const handlePriceChange = (priceOption: string) => {
    dispatch(setPrice(priceOption as RootState["productFilter"]["price"]));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <>
      <div className="min-h-screen pt-4 flex flex-col">
        <div className="container mx-auto px-4 pb-12 text-[#1A1A1A] grow">
          <div className="mb-3">
            <CustomBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Details", href: "/components" },
                { label: "অনুবাদ" },
              ]}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Filters (25%) */}
            <aside className="w-full lg:w-1/5 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-4 border-b pb-4 border-gray-100">
                <h3 className="text-lg font-bold text-slate-800">Filters</h3>
                {(selectedCategories.length > 0 ||
                  selectedAuthors.length > 0 ||
                  !!selectedPrice ||
                  hasImage) && (
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-slate-700 mb-3">Price</h4>
                <div className="flex flex-wrap gap-3 lg:flex-col lg:space-y-3">
                  {price.map((priceOption) => (
                    <label
                      key={priceOption}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded cursor-pointer checked:bg-[#006680] checked:border-[#006680] transition-colors"
                          checked={selectedPrice === priceOption}
                          onChange={() => handlePriceChange(priceOption)}
                        />
                        <svg
                          className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-slate-600 text-sm group-hover:text-[#006680] transition-colors">
                        {priceOption}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-slate-700 mb-3">Category</h4>
                <div className="flex flex-wrap gap-3 lg:flex-col lg:space-y-3">
                  {categoriesResponse?.data?.map((categoryObj: any) => (
                    <label
                      key={categoryObj._id}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded cursor-pointer checked:bg-[#006680] checked:border-[#006680] transition-colors"
                          checked={selectedCategories.includes(categoryObj.name)}
                          onChange={() => handleCategoryChange(categoryObj.name)}
                        />
                        <svg
                          className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-slate-600 text-sm group-hover:text-[#006680] transition-colors">
                        {categoryObj.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Author Filter */}
              <div>
                <h4 className="font-semibold text-slate-700 mb-3 border-t border-gray-100 pt-4">
                  Author
                </h4>
                <div className="flex flex-wrap gap-3 lg:flex-col lg:space-y-3">
                  {authorsResponse?.data?.map((authorObj: any) => (
                    <label
                      key={authorObj._id}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded cursor-pointer checked:bg-[#006680] checked:border-[#006680] transition-colors"
                          checked={selectedAuthors.includes(authorObj.name)}
                          onChange={() => handleAuthorChange(authorObj.name)}
                        />
                        <svg
                          className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-slate-600 text-sm group-hover:text-[#006680] transition-colors">
                        {authorObj.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Column: Page Content (75%) */}
            <main className="w-full lg:w-4/5">{children}</main>
          </div>
          <div className="mt-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
