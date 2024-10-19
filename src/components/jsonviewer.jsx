"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";

const JsonViewer = ({
  isJsonViewerOpen,
  setIsJsonViewerOpen,
  componentsStyles,
}) => {
  const wrappedComponentsStyles = {
    visuals: {
      home_page: componentsStyles,
    },
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <AnimatePresence>
      {isJsonViewerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsJsonViewerOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-secondarybg text-primarytext scrollbar-hide h-[70vh] overflow-y-auto px-12 pt-12 b-6 w-auto rounded-lg flex items-center justify-center shadow-xl cursor-default relative overflow-hidden"
          >
            <pre className="h-full">
              {JSON.stringify(wrappedComponentsStyles, null, 2)}
            </pre>
            <CopyToClipboard
              onCopy={handleCopy}
              text={JSON.stringify(wrappedComponentsStyles, null, 2)}
            >
              <p className="text-primarytext cursor-pointer">
                <AnimatePresence>
                  {copied ? (
                    <motion.div
                      key="tick"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-2 right-2 flex text-[#22c55e] px-3 py-1.5 bg-secondarybg rounded border border-primarybrdr items-center justify-center gap-2"
                    >
                      <FiCheck color="#22c55e" /> Done
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-2 right-2 flex text-primarytext px-3 py-1.5 bg-secondarybg rounded border border-primarybrdr items-center justify-center gap-2"
                    >
                      <BiCopy /> Copy
                    </motion.div>
                  )}
                </AnimatePresence>
              </p>
            </CopyToClipboard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JsonViewer;
