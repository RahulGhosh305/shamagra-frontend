// Sub-component for feature highlights on the homepage
export const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-[#006680] flex items-center justify-center rounded-lg text-white text-xl shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-[#002B44] text-lg lg:text-2xl leading-none mb-1">
        {title}
      </h4>
      <p className="text-gray-700 text-sm lg:text-md">{desc}</p>
    </div>
  </div>
);
