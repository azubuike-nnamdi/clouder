import CustomButton from "@/components/common/CustomButton";
import CustomTextarea from "@/components/common/CustomTextarea";
import {
  QualificationData,
  useQualification,
} from "@/context/QualificationProvider";
import { Box, Text, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

const ChallengesDetailsForm = () => {
  const {
    formSteps,
    handleFormSteps,
    handleFillForm,
    qualificationData,
    handleQualificationData,
  } = useQualification();

  return (
    <Box>
      <Box>
        <Flex align="center" justify="space-between">
          <Text fontSize="1.4rem" color="grey_1" fontWeight="500" maxW="31rem">
            What are the challenges faced in acquiring your Qualifications
          </Text>
        </Flex>

        <Formik
          initialValues={{
            challenges: qualificationData?.challenges || "",
          }}
          validate={(values) => {
            const errors: Partial<QualificationData> = {};

            if (!values.challenges) {
              errors.challenges = "Required";
            }

            return errors;
          }}
          onSubmit={(values) => {
            handleQualificationData({
              ...qualificationData,
              ...values,
            });

            handleFormSteps(formSteps + 1);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <CustomTextarea
                label=""
                placeholder=""
                name="year"
                errors={errors}
                touched={touched}
                bgColor="grey_13"
                borderColor={"transparent"}
                fontSize={"1.3125rem"}
                minH="20.20313rem"
              />

              <Flex maxW="35rem" mx="auto" gap="1.12rem" mt="3rem">
                <CustomButton
                  bgColor={"transparent"}
                  border="1px"
                  borderColor="grey_1"
                  color="grey_1"
                  handleClick={() => handleFillForm(false)}
                >
                  Cancel
                </CustomButton>
                <CustomButton type="submit">Next</CustomButton>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ChallengesDetailsForm;
