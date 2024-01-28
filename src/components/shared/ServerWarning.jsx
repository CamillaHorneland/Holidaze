import { IoIosWarning } from "react-icons/io";

function ServerWarning({ children }) {
  return (
    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-2 max-w-md mx-auto">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <IoIosWarning className="h-6 w-" />
        </div>
         <div className="ml-3">
          <p className="text-sm font-medium">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default ServerWarning;

