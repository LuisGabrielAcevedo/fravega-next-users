import React, { PropsWithChildren } from "react";
import {
  Box,
  VStack,
  HStack,
  Divider,
  Text,
  IconButton,
  ScrollY,
} from "@/lib/components";
import style from "./MainLayout.module.css";
import Image from "next/image";
import heartLine from "@/assets/icons/heart-hand-line.svg";
import { geistSans } from "@/styles/fonts";
import Head from "next/head";
import Link from "next/link";

export const MainLayout: React.FC<
  PropsWithChildren<{ title: string; description: string; subtitle?: string }>
> = ({ children, title, description, subtitle }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={description} />
      </Head>
      <Box
        className={`${geistSans.className} ${style.mainLayoutContainer}`}
        stretch
        testId='main-layout'
      >
        <VStack stretch>
          <Box
            className={style.mainLayoutHeader}
            backgroundColor='neutral0'
            paddingX='md'
          >
            <HStack gap={16} stretch align='center' justify='space-between'>
              <Link href='/' className='cleanLink'>
                <Text
                  as='h1'
                  ellipsis
                  transform='uppercase'
                  weight='semibold'
                  size={24}
                >
                  Frávega
                </Text>
              </Link>
              <Link href='/users/favorites'>
                <IconButton>
                  <Image src={heartLine} alt='favorite section' />
                </IconButton>
              </Link>
            </HStack>
          </Box>
          <Divider />
          <Box backgroundColor='neutral0' className={style.mainLayoutSubHeader}>
            <HStack stretch align='center' justify='center'>
              {!!subtitle && (
                <Text
                  as='h1'
                  testId='subtitle'
                  color='indigo500'
                  size={20}
                  weight='medium'
                >
                  {subtitle}
                </Text>
              )}
            </HStack>
          </Box>
          <Divider />
          <ScrollY>
            <Box className={style.mainLayoutSection}>
              <main>{children}</main>
            </Box>
          </ScrollY>
        </VStack>
      </Box>
    </>
  );
};
