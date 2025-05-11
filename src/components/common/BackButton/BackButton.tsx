import { Box, IconButton } from "@/lib/components";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import left from "@/assets/icons/arrow-narrow-left-solid.svg";

export const BackButton: React.FC = () => {
  return (
    <Box fit='content' borderColor='neutral200' radius='round'>
      <Link href='/'>
        <IconButton>
          <Image src={left} alt='back' />
        </IconButton>
      </Link>
    </Box>
  );
};
