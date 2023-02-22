import React from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

const App = () => {
  const [content, setContent] = React.useState("");

  const onContentChange = React.useCallback(
    (
      event: ContentEditableEvent | React.FocusEvent<HTMLDivElement, Element>
    ) => {
      const sanitizeConf = {
        allowedTags: ["b", "i", "a", "p", "h1", "h2", "h3"],
        allowedAttributes: { a: ["href"] },
      };

      setContent(sanitizeHtml(event.currentTarget.innerHTML, sanitizeConf));
    },
    []
  );

  return (
    <ContentEditable
      onChange={onContentChange}
      onBlur={(event) => onContentChange(event)}
      html={content}
    />
  );
};

export default App;
