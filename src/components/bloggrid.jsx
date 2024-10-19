import React from "react";

const BlogGrids = ({ id, onClick, selected, styles }) => {
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
      className="h-[70vh] w-full border-[0.5px] border-primarybrdr rounded flex flex-col gap-2 items-center justify-center"
    >
      <h1
        style={{
          fontSize: styles.title_font_size
            ? `${styles.title_font_size}rem`
            : "2.25rem",
          color: styles.title_font_color ? styles.title_font_color : "#ededed",
        }}
        className="leading-[2.5rem] font-bold text-primarytext"
      >
        Top Title
      </h1>
      <h1
        style={{
          fontSize: styles.desc_font_size
            ? `${styles.desc_font_size}rem`
            : "1.125rem",
          color: styles.desc_font_color ? styles.desc_font_color : "#ededed",
        }}
        className="leading-[1.75rem] font-[500] max-w-[80%] mb-3"
      >
        Top Description Lorem ipsum adipisicing. a voluptates nam vitae
        accusamus
      </h1>
      <div
        style={{
          gridTemplateColumns: `repeat(${
            styles.no_of_grid_columns || 3
          }, minmax(0, 1fr))`,
        }}
        className=" grid w-full max-w-[80%] items-center justify-center gap-4"
      >
        {Array.from({ length: styles.no_of_grid_columns || 3 }).map(
          (_, index) => (
            <div
              style={{
                backgroundColor: styles.blog_card_color
                  ? styles.blog_card_color
                  : "#141414",
              }}
              key={index}
              className=" col-span-1 rounded-lg h-[350px] p-4 flex flex-col gap-2 items-center justify-center"
            >
              <img
                className="rounded-lg"
                src="https://placehold.co/600x350/0A0A0A/FFF?text=Blog+Image"
              />
              <h1 className="text-2xl text-primarytext font-semibold">
                Blog Title
              </h1>
              <p className="text-primarytext text-sm text-center">
                Blog Description Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Fugit aspernatur cum quam suscipit,
                consectetur adipisicing
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BlogGrids;
