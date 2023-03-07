import React, { useState } from "react";

type MenuOptionProps = {
  title: string;
  description: string;
  label: string;
  img: string;
  previewImg: string;
};

export const MenuOption = ({
  title,
  description,
  label,
  img,
  previewImg,
}: MenuOptionProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsPreviewOpen(true)}
      onMouseLeave={() => setIsPreviewOpen(false)}
      className="relative flex items-center py-1 px-2 cursor-pointer hover:bg-gray-300 rounded"
    >
      <img
        src={img}
        className="w-11 border border-gray-300 rounded mr-2"
        alt="icon"
      />
      <div>
        <div className="text-sm text-gray-900">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
      {isPreviewOpen && (
        <div className="absolute -right-38 p-2 bg-black rounded flex flex-col w-38">
          <img
            className="w-33 h-25 bg-white z-9999 mb-1"
            src={previewImg}
            alt="preview"
          />
          <div className="text-gray-50 text-xs font-semibold">
            {description}
          </div>
        </div>
      )}
    </div>
  );
};
