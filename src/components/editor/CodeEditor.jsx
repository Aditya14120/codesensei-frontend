import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";

function CodeEditor({ code, setCode }) {

  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="
        glass
        rounded-3xl
        overflow-hidden
        border
        border-purple-500/30
        shadow-[0_0_50px_rgba(168,85,247,0.15)]
      "
    >

      {/* TOP BAR */}

      <div
        className="
          flex
          items-center
          gap-3
          px-6
          py-4
          bg-[#0a0a0a]
          border-b
          border-purple-500/20
        "
      >

        <div className="w-3 h-3 rounded-full bg-red-500"></div>

        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>

        <div className="w-3 h-3 rounded-full bg-green-500"></div>

        <div className="ml-4 text-gray-400 text-sm tracking-wider">
          Main.java
        </div>

      </div>

      {/* MONACO EDITOR */}

      <Editor
        height="600px"
        defaultLanguage="java"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          smoothScrolling: true,
          padding: {
            top: 20,
          },
          fontLigatures: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />

    </motion.div>

  );
}

export default CodeEditor;