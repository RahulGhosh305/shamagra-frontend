interface SpecRowProps {
  label: string;
  value: string;
}

const SpecRow = ({ label, value }: SpecRowProps) => (
  <div className="flex justify-between items-center border-b text-md border-gray-200 pb-1">
    <span className="font-semibold text-[#333333]">{label}:</span>
    <span className="text-gray-700">{value}</span>
  </div>
);

export default SpecRow;
