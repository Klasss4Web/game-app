"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { FullPageLoader } from "@/components/common/FullPageLoader";
import { ExperienceData } from "@/types/experience";
import PageTitle from "@/components/common/PageTitle";
import { getExperience } from "./service";
import ExperienceHeroCard from "./components/ExperienceHeroCard";
import ExperienceList from "./components/ExperienceList";

const MyExeperiences = () => {
  const { data: myExperiences, isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: getExperience,
    // retry: 3,
  });

  // console.log("myExperiences", myExperiences);
  return isLoading ? (
    <FullPageLoader />
  ) : (
    <Box width="100%" className="" minH="100vh">
      <PageTitle title="My Experiences" />
      {myExperiences?.data.length < 1 && <ExperienceHeroCard />}
      {myExperiences?.data.length > 0 && (
        <ExperienceList data={myExperiences?.data} />
      )}
    </Box>
  );
};

export default MyExeperiences;
