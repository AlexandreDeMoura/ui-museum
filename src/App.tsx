import React, { useEffect, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { v4 as uuidv4 } from "uuid";
import usePrevious from "./utils/usePreviousState";

type Node = {
  component: JSX.Element;
  id: string;
};

const App = () => {
  const focusedRef: any = useRef(null);
  const [nodes, setNodes] = useState<Node[]>([
    {
      component: (
        <ContentEditable
          key={"first-node"}
          className="border border-black p-2"
          onKeyDown={(event) => handleKeyDown("first-node", event)}
          onChange={(event) => handleChange("first-node", event)}
          html={""}
        />
      ),
      id: "first-node",
    },
  ]);
  const prevCount: any = usePrevious(nodes);

  useEffect(() => {
    if (prevCount && prevCount.length !== nodes.length) {
      if (focusedRef && focusedRef.current) {
        focusedRef.current.focus();
      }
    }
  }, [nodes, prevCount]);

  const handleChange = (
    nodeId: string,
    event: ContentEditableEvent | React.FocusEvent<HTMLDivElement, Element>
  ) => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p", "h1", "h2", "h3"],
      allowedAttributes: { a: ["href"] },
    };
    setNodes((currentNodes) => {
      const newNodes = [...currentNodes];
      const nodeIndex = newNodes.findIndex((node) => node.id === nodeId);
      newNodes[nodeIndex] = {
        component: (
          <ContentEditable
            key={newNodes[nodeIndex].id}
            className="border border-black p-2"
            onKeyDown={(event) => handleKeyDown(newNodes[nodeIndex].id, event)}
            onChange={(event) => handleChange(newNodes[nodeIndex].id, event)}
            html={sanitizeHtml(event.currentTarget.innerHTML, sanitizeConf)}
          />
        ),
        id: newNodes[nodeIndex].id,
      };
      return newNodes;
    });
  };

  const handleKeyDown = (
    nodeId: string,
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setNodes((currentNodes) => {
        const newNodes = [...currentNodes];
        const nodeIndex = newNodes.findIndex((node) => node.id === nodeId);
        const newNodeId = uuidv4();
        const newNode = {
          id: newNodeId,
          isFocus: true,
          component: (
            <ContentEditable
              key={newNodeId}
              innerRef={focusedRef}
              className="border border-black p-2"
              onKeyDown={(event) => handleKeyDown(newNodeId, event)}
              onChange={(event) => handleChange(newNodeId, event)}
              html={""}
            />
          ),
        };
        newNodes.splice(nodeIndex + 1, 0, newNode);
        return newNodes;
      });
    }
  };

  return (
    <main className="min-h-screen w-screen flex">
      <div className="bg-notion-sideBar w-60 border-r border-gray-100 z-9999"></div>
      <div className="flex min-h-screen w-[calc(100%-240px)] flex-col items-center relative">
        <div className="h-11 w-full bg-slate-300 fixed top-0 left-0"></div>
        <div className="mt-11 w-10/12 space-y-2 px-24">
          {nodes.map((node) => node.component)}
        </div>
      </div>
    </main>
  );
};

export default App;
