import React from "react";
import { Badge, Text } from "@chakra-ui/react";
import authStore from "@/store/Auth";

const TrainingStatus = (initialMessages: any) => {
  const { status, credits }: any = authStore();
  if (status?.isOverdue || credits < 0) return null;

  return initialMessages?.length === 0 ? (
    <Text mt={4} mb={4}>
      Your AI model is <Badge>Training</Badge>, until this is done the AI
      won't be able to access your repos context.
    </Text>
  ) : (
    <Text my={3}>
      Your trained AI model is{" "}
      <Badge colorScheme="teal">READY FOR PROMPTING</Badge>
    </Text>
  );
};

export default TrainingStatus;