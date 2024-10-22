"use client";
import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { JsonViewer } from "@/components";
import { LeftSidebar, RightSidebar, CanvasContent } from "@/sections";
import { toast } from "sonner";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
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
