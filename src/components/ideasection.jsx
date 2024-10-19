import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const IdeaSection = ({ id, onClick, selected, styles }) => {
  return (
    <div
      id={id}
      onClick={() => onClick(id)}
      style={{
        border: selected
          ? "2px solid green"
          : "0.5px solid rgb(255 255 255 / .145)",
        backgroundColor: styles.background_color
          ? styles.background_color
          : "#0a0a0a",
      }}
      className="h-[40vh] w-full border-[0.5px] border-primarybrdr rounded  flex items-center justify-center"
    >
      <div
        style={{
          flexDirection: styles.alignment === "reverse" ? "row-reverse" : "",
        }}
        className=" flex flex-col lg:flex-row max-w-[80%] h-full items-center justify-center gap-4"
      >
        <div className="flex flex-col gap-2 items-start justify-center w-1/2 h-full">
          <span
            style={{
              fontSize: styles.title_font_size
                ? `${styles.title_font_size}rem`
                : "3rem",
              color: styles.title_font_color
                ? styles.title_font_color
                : "#ededed",
            }}
            className="leading-[1] text-primarytext font-bold"
          >
            Idea Title
          </span>
          <span
            style={{
              fontSize: styles.desc_font_size
                ? `${styles.desc_font_size}rem`
                : "1.25rem",
              color: styles.desc_font_color
                ? styles.desc_font_color
                : "#ededed",
            }}
            className="leading-[1.75rem] text-primarytext font-normal mb-2"
          >
            Idea Description, lorem ipsum dolor sit, amet consectetur
            adipisicing elit.
          </span>
          <span className="px-4 py-2 text-sm rounded-full border border-primarybrdr flex gap-4 text-primarytext items-center justify-center">
            Idea Action <IoIosArrowRoundForward size={25} />
          </span>
        </div>
        <div className="flex flex-col gap-4 items-start justify-center w-1/2 h-full">
          <img
            className="rounded-lg"
            src="https://placehold.co/400x200/141414/FFF?text=Idea+Image"
          />
        </div>
      </div>
    </div>
  );
};

export default IdeaSection;
