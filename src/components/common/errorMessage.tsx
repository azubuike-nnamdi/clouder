import React from "react";
import { Box, Button, Text, VStack, Icon } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

const ErrorMessage = ({
  errorMsg,
  goHome,
}: {
  errorMsg: string;
  goHome: () => void;
}) => {
  return (
    <Box
      p={6}
      border="1px"
      borderColor="red.300"
      borderRadius="md"
      bg="red.50"
      maxW="400px"
      mx="auto"
      mt={8}
      textAlign="center"
      boxShadow="lg"
    >
      <VStack spacing={4}>
        <Icon as={WarningTwoIcon} w={10} h={10} color="red.500" />
        <Text color="red.600" fontWeight="bold" fontSize="lg">
          Oops! Something went wrong.
        </Text>
        <Text color="red.500" fontSize="md">
          {errorMsg}
        </Text>
        <Button
          onClick={goHome}
          colorScheme="red"
          variant="outline"
          _hover={{ bg: "red.100" }}
        >
          Go back home
        </Button>
      </VStack>
    </Box>
  );
};

export default ErrorMessage;
