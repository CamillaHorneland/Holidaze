function ValidationMessage({ children }) {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-2 max-w-md mx-auto">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2zm0-10h2v6h-2z"></path>
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default ValidationMessage;
