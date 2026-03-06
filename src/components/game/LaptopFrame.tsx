import React from "react";
import hospitalDesk from "@/assets/hospital-desk.jpg";

interface LaptopFrameProps {
  children: React.ReactNode;
}

const LaptopFrame: React.FC<LaptopFrameProps> = ({ children }) => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${hospitalDesk})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="laptop-frame w-full">
        {/* Laptop screen bezel */}
        <div className="bg-foreground/90 rounded-t-2xl p-3 pb-0">
          {/* Camera dot */}
          <div className="flex justify-center mb-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
          </div>
          {/* Screen */}
          <div className="laptop-screen-inner overflow-y-auto">
            {children}
          </div>
        </div>
        {/* Laptop base */}
        <div className="bg-foreground/80 h-5 rounded-b-lg mx-8" />
        <div className="bg-foreground/60 h-2 rounded-b-xl mx-16" />
      </div>
    </div>
  );
};

export default LaptopFrame;
