"use client";
import React, { useState, useEffect } from "react";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import { CiTextAlignLeft, CiTextAlignRight } from "react-icons/ci";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";
import {
  HeroComponent,
  IdeaSection,
  BlogGrids,
  JsonViewer,
  AboutBanner,
  TeamSection,
} from "@/components";
import { LiaTimesSolid } from "react-icons/lia";
import { toast } from "sonner";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export function Example() {
  return (
    <Suspense>
      <UIBuilder />
    </Suspense>
  );
}

const UIBuilder = () => {
  const searchParams = useSearchParams();

  const pageQuery = searchParams.get("pageedit");

  const [droppedComponents, setDroppedComponents] = useState([]);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [componentsStyles, setComponentsStyles] = useState({});
  const [isJsonViewerOpen, setIsJsonViewerOpen] = useState(false);
  const [componentCounts, setComponentCounts] = useState({
    hero_component: 0,
    idea_section: 0,
    blog_grids: 0,
    about_banner: 0,
    team_section: 0,
  });

  useEffect(() => {
    const fetchCurrentLayout = async () => {
      try {
        const API_KEY = "blt01ca4669cb8b3ea0";
        const MANAGEMENT_TOKEN = "cs1943794d32257850e40ba4c5";
        const entryId = "bltda96d9fe6a336cc5";
        const contentTypeId = "visuals";

        const response = await axios.get(
          `https://eu-api.contentstack.com/v3/content_types/${contentTypeId}/entries/${entryId}`,
          {
            headers: {
              api_key: API_KEY,
              authorization: MANAGEMENT_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );

        const pageLayout = response.data.entry.page_layout.visuals.home_page;
        setComponentsStyles(pageLayout);

        let newComponentCounts = { ...componentCounts };

        const componentsArray = Object.keys(pageLayout)
          .map((key) => {
            if (key.startsWith("hero_component")) {
              newComponentCounts["hero_component"]++;
              return {
                id: key,
                name: "Hero Component",
                type: "hero_component",
                page_type: "homepage",
              };
            } else if (key.startsWith("idea_section")) {
              newComponentCounts["idea_section"]++;
              return {
                id: key,
                name: "Idea Section",
                type: "idea_section",
                page_type: "homepage",
              };
            } else if (key.startsWith("blog_grids")) {
              newComponentCounts["blog_grids"]++;
              return {
                id: key,
                name: "Blog Grids",
                type: "blog_grids",
                page_type: "homepage",
              };
            }
            return null;
          })
          .filter(Boolean);

        setComponentCounts(newComponentCounts);
        setDroppedComponents(componentsArray);
      } catch (error) {
        console.error(
          "Error fetching current layout:",
          error.response ? error.response.data : error.message
        );
        toast.error("Failed to fetch current layout.");
      }
    };

    fetchCurrentLayout();
  }, []);

  const handleComponentClick = (id) => {
    setSelectedComponentId(id);
  };

  const handleDrop = (item) => {
    setDroppedComponents((prev) => [...prev, item]);
    setComponentsStyles((prev) => ({
      ...prev,
      [item.id]: {},
    }));
  };

  const removeComponent = (index) => {
    setDroppedComponents((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex bg-primarybg">
        <JsonViewer
          isJsonViewerOpen={isJsonViewerOpen}
          setIsJsonViewerOpen={setIsJsonViewerOpen}
          componentsStyles={componentsStyles}
        />
        <LeftSidebar pageQuery={pageQuery} />
        <CanvasContent
          droppedComponents={droppedComponents}
          onDrop={handleDrop}
          removeComponent={removeComponent}
          handleComponentClick={handleComponentClick}
          selectedComponentId={selectedComponentId}
          componentsStyles={componentsStyles}
          setComponentsStyles={setComponentsStyles}
          setSelectedComponentId={setSelectedComponentId}
          pageQuery={pageQuery}
          setComponentCounts={setComponentCounts}
          componentCounts={componentCounts}
        />
        <RightSidebar
          componentsStyles={componentsStyles}
          selectedComponentId={selectedComponentId}
          setComponentsStyles={setComponentsStyles}
          setIsJsonViewerOpen={setIsJsonViewerOpen}
        />
      </div>
    </DndProvider>
  );
};

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

// Draggable Component
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

const RightSidebar = ({
  componentsStyles,
  selectedComponentId,
  setComponentsStyles,
  setIsJsonViewerOpen,
}) => {
  const [open, setOpen] = useState(true);

  const [isShining, setIsShining] = useState(false);

  const styles = componentsStyles[selectedComponentId] || {};

  const componentType = selectedComponentId
    ? selectedComponentId.substring(0, selectedComponentId.lastIndexOf("_"))
    : null;

  const handleStyleChange = (styleKey, value) => {
    setComponentsStyles((prev) => ({
      ...prev,
      [selectedComponentId]: {
        ...prev[selectedComponentId],
        [styleKey]: value,
      },
    }));

    setIsShining(true);
    setTimeout(() => setIsShining(false), 600);
  };

  const handleUpdateLayout = async () => {
    try {
      const API_KEY = "blt01ca4669cb8b3ea0";
      const MANAGEMENT_TOKEN = "cs1943794d32257850e40ba4c5";
      const entryId = "bltda96d9fe6a336cc5";
      const contentTypeId = "visuals";

      const updatedData = {
        entry: {
          title: "Layout",
          page_type_uid: "layout",
          tags: [],
          locale: "en-us",
          uid: entryId,
          created_by: "csb6604176d005573f",
          updated_by: "csb6604176d005573f",
          updated_at: new Date().toISOString(),
          ACL: {},
          _version: 8,
          _in_progress: false,
          page_layout: {
            visuals: {
              home_page: JSON.parse(JSON.stringify(componentsStyles)),
            },
          },
        },
      };

      // Make the API call to update the entry
      const response = await axios.put(
        `https://eu-api.contentstack.com/v3/content_types/${contentTypeId}/entries/${entryId}`,
        updatedData,
        {
          headers: {
            api_key: API_KEY,
            authorization: MANAGEMENT_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      // Optionally, you can handle success feedback for the user here
    } catch (error) {
      console.error(
        "Error updating entry:",
        error.response ? error.response.data : error.message
      );
      // Optionally, handle error feedback for the user here
    }
  };

  return (
    <motion.nav
      layout
      className={`sticky top-0 h-screen shrink-0 border-l bg-primarybg border-primarybrdr p-2`}
      style={{
        width: open ? "235px" : "60px",
      }}
    >
      <div className="mt-2">
        {open && (
          <div className=" overflow-y-auto mt-3 h-[90vh]">
            <span className="flex flex-col items-center justify-center ml-3 mb-2">
              {selectedComponentId ? (
                <h3 className="text-base w-full text-primarytext font-semibold flex flex-col items-start justify-center">
                  Editing{" "}
                  <span className="font-[500] text-sm">
                    {selectedComponentId}
                  </span>
                </h3>
              ) : (
                <h3 className="text-base w-full text-primarytext font-semibold">
                  Select a Component
                </h3>
              )}
            </span>
            {componentsStyles && Object.keys(componentsStyles).length > 0 && (
              <span
                onClick={() => setIsJsonViewerOpen(true)}
                className={`w-[85%] font-semibold mb-3 border border-primarybrdr cursor-pointer bg-secondarybg mx-auto flex items-center justify-center rounded-md px-2 py-1 text-primarytext ${
                  isShining ? "shine" : ""
                }`}
              >
                JSON
              </span>
            )}
            {componentsStyles && Object.keys(componentsStyles).length > 0 && (
              <span
                onClick={handleUpdateLayout}
                className="w-[85%] font-semibold mb-3 border border-primarybrdr cursor-pointer bg-secondarybg mx-auto flex items-center justify-center rounded-md px-2 py-1 text-primarytext"
              >
                Update
              </span>
            )}
            <hr className="border-b border-primarybrdr w-full"></hr>
            <div className="flex flex-col gap-6 items-center justify-center ml-3 mt-3 mx-auto">
              {selectedComponentId && (
                <div className="flex flex-col gap-4">
                  {componentType === "blog_grids" && (
                    <label>
                      Grid Columns:
                      <input
                        type="number"
                        step={1}
                        min={2}
                        max={4}
                        id="no_of_grid_columns"
                        value={styles.no_of_grid_columns || 3}
                        className="w-[85%] bg-secondarybg mt-1 border border-primarybrdr rounded text-primarytext px-2 py-1"
                        onChange={(e) =>
                          handleStyleChange(
                            "no_of_grid_columns",
                            e.target.value
                          )
                        }
                      />
                    </label>
                  )}
                  {(componentType === "hero_component" ||
                    componentType === "idea_section" ||
                    componentType === "blog_grids") && (
                    <span className="flex flex-col items-start justify-start gap-2">
                      Background Color:
                      <input
                        className="w-[85%] appearance-none h-8 cursor-pointer rounded"
                        type="color"
                        id="background_color"
                        name="Background Color"
                        value={styles.background_color || "#0a0a0a"}
                        onChange={(e) =>
                          handleStyleChange("background_color", e.target.value)
                        }
                      />
                    </span>
                  )}
                  {(componentType === "hero_component" ||
                    componentType === "idea_section" ||
                    componentType === "blog_grids") && (
                    <label>
                      Title Font Size(rem):
                      <input
                        type="number"
                        step={0.25}
                        id="title_font_size"
                        min={1}
                        max={4.5}
                        value={
                          styles.title_font_size !== undefined
                            ? styles.title_font_size
                            : componentType === "blog_grids"
                            ? 1.25
                            : 3.75
                        }
                        className="w-[85%] bg-secondarybg mt-1 border border-primarybrdr rounded text-primarytext px-2 py-1"
                        onChange={(e) =>
                          handleStyleChange("title_font_size", e.target.value)
                        }
                      />
                    </label>
                  )}
                  {(componentType === "hero_component" ||
                    componentType === "idea_section" ||
                    componentType === "blog_grids") && (
                    <span className="flex flex-col items-start justify-start gap-2">
                      Title Font Color:
                      <input
                        className="w-[85%] appearance-none h-8 cursor-pointer rounded"
                        type="color"
                        id="title_font_color"
                        name="Title Font Color"
                        value={styles.title_font_color || "#ededed"}
                        onChange={(e) =>
                          handleStyleChange("title_font_color", e.target.value)
                        }
                      />
                    </span>
                  )}
                  {(componentType === "hero_component" ||
                    componentType === "idea_section" ||
                    componentType === "blog_grids") && (
                    <label>
                      Desc Font Size(rem):
                      <input
                        type="number"
                        step={0.25}
                        id="desc_font_size"
                        value={styles.desc_font_size || 1.25}
                        className="w-[85%] bg-secondarybg mt-1 border border-primarybrdr rounded text-primarytext px-2 py-1"
                        onChange={(e) =>
                          handleStyleChange("desc_font_size", e.target.value)
                        }
                      />
                    </label>
                  )}
                  {(componentType === "hero_component" ||
                    componentType === "idea_section" ||
                    componentType === "blog_grids") && (
                    <span className="flex flex-col items-start justify-start gap-2">
                      Desc Font Color:
                      <input
                        className="w-[85%] appearance-none h-8 cursor-pointer rounded"
                        type="color"
                        id="desc_font_color"
                        name="Desc Font Color"
                        value={styles.desc_font_color || "#ededed"}
                        onChange={(e) =>
                          handleStyleChange("desc_font_color", e.target.value)
                        }
                      />
                    </span>
                  )}
                  {(componentType === "hero_component" ||
                    componentType === "idea_section") && (
                    <label>
                      Image Alignment:
                      <div className="flex items-center justify-start gap-2 mt-2">
                        <button
                          onClick={() =>
                            handleStyleChange("alignment", "reverse")
                          }
                          className={`${
                            styles.alignment === "reverse"
                              ? "text-primarybg bg-primarytext"
                              : "bg-secondarybg text-primarytext"
                          } px-2 py-1 rounded`}
                        >
                          <CiTextAlignLeft size={20} />
                        </button>
                        <button
                          onClick={() =>
                            handleStyleChange("alignment", "normal")
                          }
                          className={`${
                            !styles.alignment || styles.alignment === "normal"
                              ? "text-primarybg bg-primarytext"
                              : "bg-secondarybg text-primarytext"
                          } px-2 py-1 rounded`}
                        >
                          <CiTextAlignRight size={20} />
                        </button>
                      </div>
                    </label>
                  )}
                  {componentType === "blog_grids" && (
                    <span className="flex flex-col items-start justify-start gap-2">
                      Blog Card Color:
                      <input
                        className="w-[85%] appearance-none h-8 cursor-pointer rounded"
                        type="color"
                        id="blog_card_color"
                        name="Blog Card Color"
                        value={styles.blog_card_color || "#141414"}
                        onChange={(e) =>
                          handleStyleChange("blog_card_color", e.target.value)
                        }
                      />
                    </span>
                  )}
                  {/* Add more CSS style inputs as needed */}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <ToggleClose open={open} setOpen={setOpen} icon={"right"} />
    </motion.nav>
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
  // Temp logo from https://logoipsum.com/
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
