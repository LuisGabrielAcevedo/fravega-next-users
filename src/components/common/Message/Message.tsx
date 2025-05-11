import React from "react";
import { Box, Text, VStack } from "@/lib/components";
import style from "./Message.module.css";
import error from "@/assets/icons/alert-triangle-line.svg";
import user from "@/assets/icons/image-user-x-line.svg";
import Image from "next/image";

export const Message: React.FC<{
  title: React.ReactNode;
  description?: string;
  type?: "error" | "empty";
}> = ({ title, description, type }) => {
  return (
    <Box
      testId='message'
      padding='3xl'
      backgroundColor={type === "error" ? "rose50" : "indigo50"}
      radius='sm'
    >
      <VStack gap={32} align='center'>
        <Box
          radius='round'
          backgroundColor={type === "error" ? "rose200" : "indigo200"}
          className={style.messageBox}
        >
          <VStack stretch align='center' justify='center'>
            <Image
              src={type === "error" ? error : user}
              alt={type === "error" ? "error icon" : "empty icon"}
            />
          </VStack>
        </Box>
        <VStack gap={8} align='center' justify='center'>
          {title}
          {!!description && (
            <Text
              testId='message-description'
              color='neutral600'
              align='center'
              weight='thin'
            >
              {description}
            </Text>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};
