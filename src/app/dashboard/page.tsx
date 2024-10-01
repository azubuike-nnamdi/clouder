"use client";
import PageLoader from "@/components/common/PageLoader";
import Typography from "@/components/common/Typograph";
import AdminSupport from "@/components/dashboard/AdminSupport";
import { LiveClock } from "@/components/dashboard/LiveClock";
import LogBookEntries from "@/components/dashboard/LogBookEntries";
import TodayActivities from "@/components/dashboard/TodayActivities";

import useProfile from "@/hooks/useProfile";

import { Box, Flex, Image, SimpleGrid } from "@chakra-ui/react";

const Dashboard = () => {
  const { data, isLoading } = useProfile();
  if (isLoading) return <PageLoader />;

  const userData = data?.data;
  const fullName = userData?.fullName;
  const nameParts = fullName?.split(" ");
  const firstName = nameParts[0]?.trim();

  return (
    <Box>
      <Box pb="3.23rem">
        {/* Greetings section */}
        <Flex align="center" justify={"space-between"} gap="1rem">
          <Typography variant="heading2">
            {" "}
            Welcome back, {firstName} 😊
          </Typography>

          {/* <DashboardType /> */}
        </Flex>

        {/* DaSboard CoMponents */}
        <Box>
          <SimpleGrid columns={[1, 2, null, 3]} mt="1.88rem" spacing="1.2rem">
            <TodayActivities />
            <LogBookEntries />

            <LiveClock />
          </SimpleGrid>

          <Flex mt={["3rem"]} flexDir={["column", "row"]} gap="1.22rem">
            <Box flexShrink={1}>
              <Image
                src="/graph.svg"
                alt="graph demo"
                maxH="22.4rem"
                maxW="44.5rem"
                w="100%"
              />
            </Box>

            <AdminSupport />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
