import React from "react";

const TeamSection = ({ id, onClick, selected, styles }) => {
  return (
    <div
      onClick={() => onClick(id)}
      style={{
        border: selected
          ? "2px solid green"
          : "0.5px solid rgb(255 255 255 / .145)",
        backgroundColor: styles.background_color
          ? styles.background_color
          : "#0a0a0a",
      }}
      className="flex flex-col items-center justify-center gap-12 w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-4 ">
        <h2 className="text-center text-4xl text-primarytext font-semibold mt-8">
          Team Title
        </h2>
        <p className="text-center text-lg max-w-[80%] text-primarytext">
          Team Description Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Officia iure voluptatibus vitae nulla, excepturi
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-center text-primarytext mb-8">
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="w-[150px] h-[180px]  relative bg-secondarybg rounded-md">
            <img
              alt="employee image"
              src="https://api.dicebear.com/9.x/adventurer/svg?seed=Easton"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-start ">
            <h3 className="text-xl font-semibold">Employee Name</h3>

            <p className="text-base">Designation</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="w-[150px] h-[180px] relative bg-secondarybg rounded-md">
            <img
              alt="employee image"
              src="https://api.dicebear.com/9.x/adventurer/svg?seed=Vivian"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-start ">
            <h3 className="text-xl font-semibold">Employee Name</h3>

            <p className="text-base">Designation</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="w-[150px] h-[180px] relative bg-secondarybg rounded-md">
            <img
              alt="employee image"
              src="https://api.dicebear.com/9.x/adventurer/svg?seed=Destiny"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-start ">
            <h3 className="text-xl font-semibold">Employee Name</h3>

            <p className="text-base">Designation</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="w-[150px] h-[180px] relative bg-secondarybg rounded-md">
            <img
              alt="employee image"
              src="https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-start ">
            <h3 className="text-xl font-semibold">Employee Name</h3>

            <p className="text-base">Designation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
