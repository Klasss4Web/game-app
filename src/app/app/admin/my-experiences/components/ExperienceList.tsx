import React from "react";
import ExperienceListCard from "./ExperienceListCard";
import { ExperienceData } from "@/types/experience";

type ExperienceListProps = {
  data: ExperienceData[];
  refecthExperiences: () => void;
};

const ExperienceList = ({ data, refecthExperiences }: ExperienceListProps) => {
  return (
    <>
      {data?.map((exp, index) => (
        <ExperienceListCard
          key={exp?.id}
          experience={exp}
          index={index}
          refecthExperiences={refecthExperiences}
        />
      ))}
    </>
  );
};

export default ExperienceList;
