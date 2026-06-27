import VerticalBookCard from "../../components/custom/VerticalBookCard";

const Category = () => {
  return (
    <div className="container mx-auto bg-white text-[#1A1A1A] flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-slate-800">All Categories</h2>

      <div className="flex flex-col gap-10">
        <VerticalBookCard categoryPage />
      </div>
    </div>
  );
};

export default Category;
