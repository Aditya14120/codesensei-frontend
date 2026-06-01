import Editor from "@monaco-editor/react";

function ImprovedCodeViewer({ code }) {

  return (

    <div className="glass rounded-3xl overflow-hidden">

      <div
        className="
          px-6
          py-4
          border-b
          border-purple-500/20
        "
      >

        <h2 className="text-purple-400 font-bold">
          Improved Code
        </h2>

      </div>

      <Editor
        height="500px"
        defaultLanguage="java"
        theme="vs-dark"
        value={code}
        options={{
          readOnly: true,
          minimap: {
            enabled: false
          }
        }}
      />

    </div>

  );

}

export default ImprovedCodeViewer;