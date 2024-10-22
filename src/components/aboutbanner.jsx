import React from "react";

const AboutBanner = ({ id, onClick, selected, styles }) => {
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
      className="px-24 mx-auto h-[70vh] w-full flex flex-col items-center justify-center"
    >
      <h1 className="text-primarytext text-4xl text-center font-bold mb-2">
        About us Headline
      </h1>
      <h1 className="text-primarytext text-lg text-center mb-12">
        About us Description Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Esse perspiciatis deleniti natus atque perferendis
      </h1>
      <div className="lg:flex w-full items-center justify-center hidden">
        <span className="w-1/3 h-12 flex items-center justify-center border border-dashed border-primarytext text-primarytext text-xl font-bold">
          Mission
        </span>
        <span className="w-1/3 h-12 flex items-center justify-center border border-dashed border-primarytext text-primarytext text-xl font-bold">
          Vision
        </span>
        <span className="w-1/3 h-12 flex items-center justify-center border border-dashed border-primarytext text-primarytext text-xl font-bold">
          History
        </span>
      </div>
      <div className="max-w-6xl mx-auto divide-y lg:divide-y-0 lg:divide-x divide-dashed mt-6 flex flex-col lg:flex-row items-center justify-center">
        <div className="w-[85%] lg:w-1/3 flex gap-4 flex-col items-center justify-center px-0 lg:px-4 py-4 lg:py-0">
          <h1 className="text-primarytext text-xl font-semibold">
            Banner Headline
          </h1>
          <p className="text-primarytext/80 text-sm">
            Banner Description Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Saepe ipsa sunt quisquam vero totam provident
            minima, aperiam ea at adipisci eum nisi fugiat voluptatem illo fuga
            reprehenderit consectetur cupiditate non! Lorem ipsum dolor, sit
          </p>
        </div>
        <div className="w-[85%] lg:w-1/3 flex gap-4 flex-col items-center justify-center px-0 lg:px-4 py-4 lg:py-0">
          <h1 className="text-primarytext text-xl font-semibold">
            Banner Headline
          </h1>
          <p className="text-primarytext/80 text-sm">
            Banner Description Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Saepe ipsa sunt quisquam vero totam provident
            minima, aperiam ea at adipisci eum nisi fugiat voluptatem illo fuga
            reprehenderit consectetur cupiditate non! Lorem ipsum dolor, sit
          </p>
        </div>
        <div className="w-[85%] lg:w-1/3 flex gap-4 flex-col items-center justify-center px-0 lg:px-4 py-4 lg:py-0">
          <h1 className="text-primarytext text-xl font-semibold">
            Banner Headline
          </h1>
          <p className="text-primarytext/80 text-sm">
            Banner Description Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Saepe ipsa sunt quisquam vero totam provident
            minima, aperiam ea at adipisci eum nisi fugiat voluptatem illo fuga
            reprehenderit consectetur cupiditate non! Lorem ipsum dolor, sit
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
