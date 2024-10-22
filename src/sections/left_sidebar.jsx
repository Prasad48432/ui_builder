"use client";
import React, { useState } from "react";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";

const LeftSidebar = ({ pageQuery }) => {
  const [open, setOpen] = useState(true);
  const components = [
    {
      id: 1,
      name: "Hero Component",
      type: "hero_component",
      page_type: "homepage",
    },
    {
      id: 2,
      name: "Idea Section",
      type: "idea_section",
      page_type: "homepage",
    },
    { id: 3, name: "Blog Grids", type: "blog_grids", page_type: "homepage" },
    {
      id: 4,
      name: "About Banner",
      type: "about_banner",
      page_type: "aboutpage",
    },
    {
      id: 5,
      name: "Team Section",
      type: "team_section",
      page_type: "aboutpage",
    },
  ];

  const filteredComponents = components.filter(
    (component) => component.page_type === pageQuery
  );

  return (
    <motion.nav
      layout
      className={`sticky top-0 h-screen shrink-0 border-r bg-primarybg border-primarybrdr p-2`}
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />
      {open && (
        <div className="space-y-1">
          {filteredComponents.map((component) => (
            <DraggableComponent key={component.id} component={component} />
          ))}
        </div>
      )}
      <ToggleClose open={open} setOpen={setOpen} icon={"left"} />
    </motion.nav>
  );
};

const DraggableComponent = ({ component }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "COMPONENT",
    item: component,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 bg-secondarybg rounded cursor-pointer ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {component.name}
    </div>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-primarybrdr pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-sm font-semibold">UI Builder</span>
              <span className="block text-xs text-primarytext/50">
                Server Driven UI
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <img className="rounded-md" src="/contentstack_logo.jpg" />
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen, icon }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-primarybrdr bg-primarybg transition-colors hover:bg-secondarybg"
    >
      <div
        className={`flex ${
          icon === "left" ? "justify-end" : "justify-start"
        } items-center p-2`}
      >
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          {icon === "left" ? (
            <FiChevronsRight
              className={`transition-transform ${open && "rotate-180"}`}
            />
          ) : (
            <FiChevronsLeft
              className={`transition-transform ${open && "rotate-180"}`}
            />
          )}
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium mr-3"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default LeftSidebar;
