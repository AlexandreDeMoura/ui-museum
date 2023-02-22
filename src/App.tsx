import React, { useEffect } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

const App = () => {
  const [contents, setContents] = React.useState([""]);

  const handleChange = (
    index: number,
    event: ContentEditableEvent | React.FocusEvent<HTMLDivElement, Element>
  ) => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p", "h1", "h2", "h3"],
      allowedAttributes: { a: ["href"] },
    };
    setContents((currentContents) => {
      const newContents = [...currentContents];
      newContents[index] = sanitizeHtml(
        event.currentTarget.innerHTML,
        sanitizeConf
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
      setContents((currentContents) => {
        const newContents = [...currentContents];
        newContents.splice(index + 1, 0, "");
        return newContents;
      });
    }
  };

  return (
    <main className="h-screen flex justify-center pt-10 bg-slate-50">
      <div className="w-8/12 bg-white space-y-2">
        {contents.map((content, index) => (
          <ContentEditable
            className="border border-black p-2"
            onKeyDown={(event) => handleKeyDown(index, event)}
            onChange={(event) => handleChange(index, event)}
            html={content}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
