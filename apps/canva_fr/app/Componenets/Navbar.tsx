import React from 'react';

const Navbar = () => {
  return (
    <div className="mx-auto  w-[90%] lg:w-[97%]  max-w-7xl bg-purple-800/20 backdrop-blur-md border border-purple-500/30 rounded-2xl py-4 px-6 text-white shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">🎨 Excalidraw</h2>
        <div className="space-x-6 text-sm font-medium text-slate-200">
         
          <a href="#createroom" className="hover:text-white transition">Create Room</a>
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
