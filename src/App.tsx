import React, { useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

const App = () => {
  const nodesRef: any = useRef([]);
  const [nodes, setNodes] = useState<any[]>([
    <ContentEditable
      innerRef={(elem: any) => (nodesRef.current[0] = elem)}
      className="border border-black p-2"
      onKeyDown={(event) => handleKeyDown(0, event)}
      onChange={(event) => handleChange(0, event)}
      html={""}
    />,
  ]);

  const handleChange = (
    index: number,
    event: ContentEditableEvent | React.FocusEvent<HTMLDivElement, Element>
  ) => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p", "h1", "h2", "h3"],
      allowedAttributes: { a: ["href"] },
    };
    setNodes((currentNodes) => {
      const newContents = [...currentNodes];
      newContents[index] = (
        <ContentEditable
          innerRef={(elem: any) => (nodesRef.current[index] = elem)}
          className="border border-black p-2"
          onKeyDown={(event) => handleKeyDown(index, event)}
          onChange={(event) => handleChange(index, event)}
          html={sanitizeHtml(event.currentTarget.innerHTML, sanitizeConf)}
        />
      );
      return newContents;
    });
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setNodes((currentNodes) => {
        const newContents = [...currentNodes];
        const newNode = (
          <ContentEditable
            innerRef={(elem: any) => (nodesRef.current[index + 1] = elem)}
            className="border border-black p-2"
            onKeyDown={(event) => handleKeyDown(index + 1, event)}
            onChange={(event) => handleChange(index + 1, event)}
            html={""}
          />
        );
        newContents.splice(index + 1, 0, newNode);
        return newContents;
      });
    }
  };

  return (
    <main className="h-screen flex justify-center pt-10 bg-slate-50">
      <div className="w-8/12 bg-white space-y-2">{nodes}</div>
    </main>
  );
};

export default App;
