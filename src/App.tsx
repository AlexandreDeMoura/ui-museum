import React, { useEffect, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { v4 as uuidv4 } from "uuid";

type Node = {
  component: JSX.Element;
  id: string;
  isFocus: boolean;
};

const App = () => {
  const nodesRef: any = useRef([]);
  const [nodes, setNodes] = useState<Node[]>([
    {
      component: (
        <ContentEditable
          innerRef={(elem: any) => (nodesRef.current[0] = elem)}
          className="border border-black p-2"
          onKeyDown={(event) => handleKeyDown("first-node", event)}
          onChange={(event) => handleChange("first-node", event)}
          html={""}
        />
      ),
      id: "first-node",
      isFocus: true,
    },
  ]);

  useEffect(() => {
    //console.log(nodesRef.current[0].focus());
  });

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
            //innerRef={(elem: any) => (nodesRef.current[index] = elem)}
            className="border border-black p-2"
            onKeyDown={(event) => handleKeyDown(newNodes[nodeIndex].id, event)}
            onChange={(event) => handleChange(newNodes[nodeIndex].id, event)}
            html={sanitizeHtml(event.currentTarget.innerHTML, sanitizeConf)}
          />
        ),
        id: newNodes[nodeIndex].id,
        isFocus: true,
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
              //innerRef={(elem: any) => (nodesRef.current[index + 1] = elem)}
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
    <main className="h-screen flex justify-center pt-10 bg-slate-50">
      <div className="w-8/12 bg-white space-y-2">
        {nodes.map((node) => node.component)}
      </div>
    </main>
  );
};

export default App;
