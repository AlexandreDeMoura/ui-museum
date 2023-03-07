import React from "react";
import { Popover } from "@headlessui/react";
import { MenuOption } from "./MenuOption";
import TextIcon from "../assets/blocks-icons/text.png";
import H1Icon from "../assets/blocks-icons/h1.png";
import H2Icon from "../assets/blocks-icons/h2.png";
import H3Icon from "../assets/blocks-icons/h3.png";
import TextIconPreview from "../assets/blocks-preview/text.png";
import H1IconPreview from "../assets/blocks-preview/h1.png";
import H2IconPreview from "../assets/blocks-preview/h2.png";
import H3IconPreview from "../assets/blocks-preview/h3.png";

const menuOptions = [
  {
    title: "Texte",
    description: "Écrivez du texte. Tout simplement.",
    label: "text",
    img: TextIcon,
    previewImg: TextIconPreview,
  },
  {
    title: "Titre 1",
    description: "Titre de grande taille.",
    label: "h1",
    img: H1Icon,
    previewImg: H1IconPreview,
  },
  {
    title: "Titre 2",
    description: "Titre de taille moyenne.",
    label: "h2",
    img: H2Icon,
    previewImg: H2IconPreview,
  },
  {
    title: "Titre 3",
    description: "Titre de petite taille.",
    label: "h3",
    img: H3Icon,
    previewImg: H3IconPreview,
  },
];

export const AddBlockMenu = () => {
  return (
    <Popover.Panel className="absolute left-0 top-7 border border-gray-100 z-10 w-90 shadow-xl bg-white rounded-md py-3 px-1">
      <div className="text-xs text-gray-500 font-semibold px-2 mb-2">
        Blocs de base
      </div>
      {menuOptions.map((option) => (
        <MenuOption
          title={option.title}
          description={option.description}
          label={option.label}
          img={option.img}
          previewImg={option.previewImg}
        />
      ))}
    </Popover.Panel>
  );
};
