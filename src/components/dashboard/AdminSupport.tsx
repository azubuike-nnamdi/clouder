"use client";

import useMutateSupport from "@/hooks/useMutateSupport";
import { RequestSupportType } from "@/utils/types";
import { Box, Flex, Icon, Input, Text, Textarea } from "@chakra-ui/react";
import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikErrors,
  FormikTouched,
} from "formik";
import React from "react";
import { ImAttachment } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import CustomButton from "../common/CustomButton";
import Typography from "../common/Typograph";

interface SupportFormValues {
  message: string;
  file: File | null;
}

const getFileAttachmentText = (
  touched: FormikTouched<SupportFormValues>,
  errors: FormikErrors<SupportFormValues>,
  file: File | null,
): string => {
  if (file) return file.name;
  if (touched.file && errors.file) return "Invalid file";
  if (touched.file) return "File attached";
  return "Attach files";
};

const AdminSupport: React.FC = () => {
  const { isLoading, handleRequestSupport, isSuccess } = useMutateSupport();

  return (
    <Box
      maxW={["100%", "22rem"]}
      minW={["100%", "22rem"]}
      w="100%"
      overflowY="hidden"
      py="1.34rem"
      px="1.36rem"
      rounded="0.54844rem"
      style={{ border: "0.8px solid #DEEBFD" }}
      bgColor="white"
      boxShadow="-7.02019px 10.53028px 15.79542px 0px rgba(218, 222, 232, 0.50)"
    >
      <Typography fontSize="0.9375rem" fontWeight="600">
        Admin Support
      </Typography>
      <Box mt="1.88rem">
        <Formik<SupportFormValues>
          initialValues={{
            message: "",
            file: null,
          }}
          validate={(values: SupportFormValues) => {
            const errors: Partial<Record<keyof SupportFormValues, string>> = {};

            if (!values.message) {
              errors.message = "Please enter a message";
            }

            if (values.file) {
              const validFileTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ];

              if (!validFileTypes.includes(values.file.type)) {
                errors.file = "Only PDF and DOC/DOCX files are allowed.";
              }
            }

            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            const payload: RequestSupportType = {
              message: values.message,
              file: values.file,
            };

            handleRequestSupport(payload);
            if (isSuccess) {
              resetForm();
            }
          }}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form>
              <Box>
                <Field name="message">
                  {({ field }: FieldProps) => (
                    <Textarea
                      {...field}
                      placeholder="Experiencing troubles? Kindly share your concerns with us."
                      minH="11rem"
                      fontSize="0.76731rem"
                      rounded="0.21925rem"
                      style={{ border: "0.877px solid rgba(51, 51, 51, 0.30)" }}
                    />
                  )}
                </Field>
                {touched.message && errors.message && (
                  <Text color="red" fontSize="0.8rem">
                    {errors.message}
                  </Text>
                )}
              </Box>

              <Flex align="center" justify="space-between" mt="0.99rem">
                <Box>
                  <Input
                    type="file"
                    accept=".pdf, .doc, .docx"
                    display="none"
                    id="file-upload"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.target.files?.[0] || null;
                      setFieldValue("file", file);
                    }}
                  />
                  <label htmlFor="file-upload">
                    <Flex
                      gap="0.22rem"
                      align="center"
                      justify="space-between"
                      cursor="pointer"
                    >
                      <Icon as={ImAttachment} boxSize="0.8rem" />
                      <Text
                        color="grey_2"
                        fontSize="0.87688rem"
                        fontWeight="500"
                        maxW="10rem"
                        isTruncated
                      >
                        {getFileAttachmentText(touched, errors, values.file)}
                      </Text>
                      {values.file && (
                        <Icon
                          as={IoMdClose}
                          boxSize="0.8rem"
                          color="red.500"
                          cursor="pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            setFieldValue("file", null);
                          }}
                        />
                      )}
                    </Flex>
                  </label>
                  {touched.file && errors.file && (
                    <Text color="red" fontSize="0.8rem">
                      {errors.file}
                    </Text>
                  )}
                </Box>

                <CustomButton
                  w="4.1rem"
                  h="2.2rem"
                  type="submit"
                  fontSize="0.75rem"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Send
                </CustomButton>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AdminSupport;
