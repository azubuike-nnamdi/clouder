import {
  COURSES_URL,
  LOGBOOK_URL,
  MEDICAL_LOGBOOK_URL,
  RESEARCH_URL,
  SURGICAL_LOGBOOK_URL,
} from "@/config/route";
import useSubmitFeedback from "@/hooks/useSubmitFeedback";
import { FeedbackPayload } from "@/utils/types";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedId: string;
};

export const RequestFeedbackModal = ({
  isOpen,
  onClose,
  selectedId,
}: Props) => {
  const [feedback, setFeedback] = useState<FeedbackPayload>({
    name: "",
    title: "",
    role: "",
    email: "",
    selectedId: "",
  });
  const pathname = usePathname();

  useEffect(() => {
    setFeedback((prevFeedback) => ({ ...prevFeedback, selectedId }));
  }, [selectedId]);

  const getOptionFromPathname = (pathname: string): string => {
    if (!pathname) return "";

    if (pathname.includes(RESEARCH_URL)) {
      return "research";
    } else if (pathname.includes(COURSES_URL)) {
      return "courses";
    } else if (pathname.includes(LOGBOOK_URL)) {
      return "logbook";
    } else if (pathname.includes(SURGICAL_LOGBOOK_URL || MEDICAL_LOGBOOK_URL)) {
      return "logbook";
    }
    return "";
  };

  const option = getOptionFromPathname(pathname);

  const { handleSubmitFeedback, isLoading, isSuccess } = useSubmitFeedback(
    selectedId,
    option,
  );

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    handleSubmitFeedback(feedback);
    if (isSuccess) {
      onClose();
    }
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent py="50px" px="4px">
          <ModalHeader>Request Feedback</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="12px">
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  placeholder="Enter Full name"
                  name="name"
                  value={feedback.name}
                  onChange={handleFeedbackChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Title of the project"
                  name="title"
                  value={feedback.title}
                  onChange={handleFeedbackChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Input
                  placeholder="Role played in the project"
                  name="role"
                  value={feedback.role}
                  onChange={handleFeedbackChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Lecturer Email Address"
                  type="email"
                  name="email"
                  value={feedback.email}
                  onChange={handleFeedbackChange}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent="center" gap="14px" mt="30px">
            <Button variant="ghost" onClick={onClose} width="180px">
              Cancel
            </Button>
            <Button
              width="180px"
              bgColor="#03A9F4"
              color="white"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={
                !feedback.name ||
                !feedback.title ||
                !feedback.role ||
                !feedback.email ||
                isLoading
              }
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RequestFeedbackModal;
