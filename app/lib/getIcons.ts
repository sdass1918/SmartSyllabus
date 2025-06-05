import React from "react";
import {
  BookOpen,
  Compass,
  Atom,
  Lightning,
  Planet,
  Ruler,
} from "phosphor-react";

const icons = [BookOpen, Compass, Atom, Lightning, Planet, Ruler];

export function getRandomIcon(name: string) {
    const Icon = icons[name.length % icons.length];
    return React.createElement(Icon, { className: "text-2xl text-gray-500", weight: "fill" });
}
