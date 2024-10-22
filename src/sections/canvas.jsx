"use client";
import React from "react";
import { useDrop } from "react-dnd";
import {
  HeroComponent,
  IdeaSection,
  BlogGrids,
  AboutBanner,
  TeamSection,
} from "@/components";
import { LiaTimesSolid } from "react-icons/lia";
import { toast } from "sonner";

const CanvasContent = ({
  droppedComponents,
  onDrop,
  removeComponent,
  handleComponentClick,
  selectedComponentId,
  componentsStyles,
  setComponentsStyles,
  setSelectedComponentId,
  pageQuery,
  setComponentCounts,
  componentCounts,
}) => {
  const [, drop] = useDrop({
    accept: "COMPONENT",
    drop: (item) => {
      if (
        item.type === "hero_component" &&
        componentCounts.hero_component === 1
      ) {
        toast.error("Hero Component added already", {
          duration: 1000,
          style: {
            background: "#131313",
            color: "#FF2E2E",
            border: "1px solid #3B3B3B",
          },
        });
        return;
      }
      if (item.type === "idea_section" && componentCounts.idea_section === 3) {
        toast.error("Idea sections Limit is 3", {
          duration: 1000,
          style: {
            background: "#131313",
            color: "#FF2E2E",
            border: "1px solid #3B3B3B",
          },
        });
        return;
      }
      if (item.type === "blog_grids" && componentCounts.blog_grids === 1) {
        toast.error("Blog Grids added already", {
          duration: 1000,
          style: {
            background: "#131313",
            color: "#FF2E2E",
            border: "1px solid #3B3B3B",
          },
        });
        return;
      }
      const newId = generateUniqueId(item.type);
      onDrop({ ...item, id: newId, page_type: item.page_type });
      console.log("components dropped are", droppedComponents); // Add the new unique id to the dropped component
    },
  });

  const generateUniqueId = (type) => {
    // Increment the count for the dropped component type
    setComponentCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));

    // Return a unique ID by appending the count to the type
    return `${type}_${componentCounts[type] + 1}`;
  };

  const handleRemoveComponent = (index, componentId) => {
    console.log("componentRemoved", index, componentId);
    removeComponent(index);

    if (selectedComponentId === componentId) {
      setSelectedComponentId(null);
    }
    const componentType = componentId.split("-")[0];

    setComponentCounts((prevCounts) => ({
      ...prevCounts,
      [componentType]: Math.max(prevCounts[componentType] - 1, 0), // Ensure the count doesn't go below 0
    }));

    setComponentsStyles((prevStyles) => {
      const newStyles = { ...prevStyles };
      delete newStyles[componentId]; // Remove the component by id
      return newStyles;
    });
  };

  return (
    <div
      ref={drop}
      className="h-auto mt-6 mb-8 flex gap-4 flex-col items-start px-6 justify-start w-full bg-primarybg montserrat"
    >
      {droppedComponents.map((component, index) => (
        <div
          key={index}
          className="relative w-full bg-secondarybg rounded-lg flex items-center justify-center"
        >
          {component.type === "hero_component" &&
          component.page_type === pageQuery ? (
            <HeroComponent
              id={component.id}
              onClick={handleComponentClick}
              selected={selectedComponentId === component.id}
              styles={componentsStyles[component.id] || {}}
            />
          ) : component.type === "idea_section" &&
            component.page_type === pageQuery ? (
            <IdeaSection
              id={component.id}
              onClick={handleComponentClick}
              selected={selectedComponentId === component.id}
              styles={componentsStyles[component.id] || {}}
            />
          ) : component.type === "blog_grids" &&
            component.page_type === pageQuery ? (
            <BlogGrids
              id={component.id}
              onClick={handleComponentClick}
              selected={selectedComponentId === component.id}
              styles={componentsStyles[component.id] || {}}
            />
          ) : component.type === "about_banner" &&
            component.page_type === pageQuery ? (
            <AboutBanner
              id={component.id}
              onClick={handleComponentClick}
              selected={selectedComponentId === component.id}
              styles={componentsStyles[component.id] || {}}
            />
          ) : component.type === "team_section" &&
            component.page_type === pageQuery ? (
            <TeamSection
              id={component.id}
              onClick={handleComponentClick}
              selected={selectedComponentId === component.id}
              styles={componentsStyles[component.id] || {}}
            />
          ) : (
            <></>
          )}
          {/* Remove Button */}
          {component.page_type === pageQuery && (
            <span
              onClick={() => handleRemoveComponent(index, component.id)}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
            >
              <LiaTimesSolid />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CanvasContent;
