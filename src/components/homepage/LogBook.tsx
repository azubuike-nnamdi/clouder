"use client";
import React from "react";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Typography from "@/components/common/Typograph";
import ScreenSize from "@/layouts/ScreenSize";

import LogBookPic from "@/assests/images/logBook.svg";
import Image from "next/image";
import CustomButton from "../common/CustomButton";

const LogBook = () => {
  return (
    <Box py="5rem" bgColor={"white"}>
      <ScreenSize>
        <SimpleGrid columns={[1, 2]} spacing={"4.27rem"}>
          <Flex align={"center"} justify={""}>
            <Box maxW={["100%", null, "31.21875rem"]}>
              <Typography variant="heading1" color="black">
                Fill Up Your Logbook In A More{" "}
                <Text as="span" color="primary">
                  Convenient
                </Text>{" "}
                Way
              </Typography>

              <Box maxW="31.21875rem" mt="1.88rem">
                <Typography variant="body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </Typography>
              </Box>
              <Box mt="3.75rem">
                <CustomButton
                  py={["0.94rem"]}
                  h="3.25rem"
                  px={["2.81rem"]}
                  maxW="fit-content"
                  fontSize={["1.125rem"]}
                >
                  Join Us
                </CustomButton>
              </Box>
            </Box>
          </Flex>

          <Box>
            <Image
              src={LogBookPic}
              alt="Doctor illustration"
              // width={"100%"}
            />
          </Box>
        </SimpleGrid>
      </ScreenSize>
    </Box>
  );
};

export default LogBook;
