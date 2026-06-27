// Helper Social Icon
export const FooterLink = ({ label }: { label: string }) => (
  <li className="flex items-center gap-2 group cursor-pointer hover:text-red-500 transition-colors">
    {/* <span className="text-gray-500 group-hover:text-red-500">
      ●
    </span> */}
    <span className="text-sm text-gray-800 hover:text-red-500">{label}</span>
  </li>
);
