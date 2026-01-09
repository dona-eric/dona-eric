import React from "react";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
        <p className="mt-6 text-slate-400">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
