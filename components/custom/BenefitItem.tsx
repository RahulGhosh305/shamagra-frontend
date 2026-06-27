interface BenefitItemProps {
  icon: string;
  text: string;
}

const BenefitItem = ({ icon, text }: BenefitItemProps) => (
  <div className="flex items-center gap-2 text-sm font-semibold text-[#555555] bg-[#F4F8FA] p-3 rounded-lg">
    <span className="text-blue-700 font-bold">{icon}</span> {text}
  </div>
);

export default BenefitItem;
