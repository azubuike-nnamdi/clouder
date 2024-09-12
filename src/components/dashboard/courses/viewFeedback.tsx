import React from "react";
import { Box, Divider, Heading, Text, VStack } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import useFetchFeedback from "@/hooks/useFetchFeedback";
import LoadingSkeleton from "@/components/common/Skeleton";
import { ArrowBackIcon } from "@chakra-ui/icons";

export function ViewUserFeedback() {
  const param = useParams();
  const id = param?.id as string;

  const router = useRouter();
  // Ensure the hook is called regardless of the id
  const { isLoading, data } = useFetchFeedback(id);

  // Check if the id is a valid string (not a file extension) after the hook call
  if (/\.(png|jpg|jpeg|gif|svg)$/.test(id)) {
    return null; // Handle this case accordingly or display a message
  }

  const feedbackData = data?.data?.message;

  if (isLoading) return <LoadingSkeleton />;
  return (
    <Box>
      {!feedbackData && <Text>No feedback data available.</Text>}
      <Box
        p={6}
        maxW="600px"
        mx="auto"
        boxShadow="lg"
        borderWidth="1px"
        borderRadius="lg"
      >
        <ArrowBackIcon
          cursor={"pointer"}
          // p={2}
          boxSize={6}
          onClick={() => router.back()}
        />
        {!isLoading && feedbackData && (
          <>
            <Heading as="h1" size="lg" mb={4}>
              Feedback Details
            </Heading>
            <VStack align="start" spacing={4}>
              <Box>
                <Text fontWeight="bold">Course Title:</Text>
                <Text>{feedbackData.courseTitle}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Institution:</Text>
                <Text>{feedbackData.institution}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Year:</Text>
                <Text>{feedbackData.year}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Certificate No:</Text>
                <Text>{feedbackData.certificateNo}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Challenges:</Text>
                <Text>{feedbackData.challenges}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Key Positives:</Text>
                <Text>{feedbackData.keyPositives}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Do Differently:</Text>
                <Text>{feedbackData.doDifferently}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Feedback:</Text>
                <Text>{feedbackData.feedback}</Text>
              </Box>

              <Divider />

              {/* <Box>
              <Text fontWeight="bold">Feedback Requested:</Text>
              <Text>{feedbackData.feedbackRequested ? "Yes" : "No"}</Text>
            </Box> */}
            </VStack>
          </>
        )}
      </Box>
    </Box>
  );
}
