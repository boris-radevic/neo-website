"use client";

import { useState } from "react";
import ExpandableServiceCard from "./ExpandableServiceCard";

type Service = {
  title: string;
  description: string;
};

export default function ServiceCardAccordion({ services, cardIdOffset = 0 }: { services: Service[]; cardIdOffset?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {services.map((item, i) => (
        <ExpandableServiceCard
          key={i}
          cardId={i + cardIdOffset}
          title={item.title}
          description={item.description}
          expanded={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </>
  );
}
