import React from "react";
import ExperienceListCard from "./ExperienceListCard";
import { ExperienceData } from "@/types/experience";

type ExperienceListProps = {
  data: ExperienceData[];
};

const ExperienceList = ({ data }: ExperienceListProps) => {
  return (
    <>
      {data?.map((exp, index) => (
        <ExperienceListCard key={exp?.id} experience={exp} index={index} />
      ))}
    </>
  );
};

export default ExperienceList;
