import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-purple-500">
      <Editor
        height="500px"
        defaultLanguage="java"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}

export default CodeEditor;