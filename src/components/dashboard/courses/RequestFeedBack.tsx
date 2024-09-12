// import CustomButton from "@/components/common/CustomButton";
// import { COURSES_URL } from "@/config/route";
// import { Box, Flex, Stack, Text } from "@chakra-ui/react";
// import { Form, Formik } from "formik";
// import {  useRouter } from "next/navigation";
// import React, { useRef, useState } from "react";
// import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

// const RequestFeedBack = () => {
//   const [err, setErr] = useState<boolean>(false);
//   // const param = useParams();
//   // console.log("param", param?.index);
//   // const id = param?.index as string;

//   // const { handleSubmitFeedback, isLoading } = useSubmitFeedback(id,  );

//   const navigate = useRouter();
//   const text = useRef("");
//   text.current = "";
//   const handleChange = (event: ContentEditableEvent) => {
//     text.current = event.target.value;
//     if (text.current !== "") {
//       setErr(false);
//     } else {
//       setErr(true);
//     }
//   };

//   const handleBlur = () => {
//     if (text.current !== "") {
//       setErr(false);
//     } else {
//       setErr(true);
//     }
//   };

//   return (
//     <Box>
//       <Text fontWeight={600} fontSize={"1.5rem"}>
//         Request feedback
//       </Text>

//       <Box
//         bgColor={"white"}
//         mt="1.89rem"
//         py="3.25rem"
//         px={["1rem", "2rem", null, null, "4rem"]}
//         rounded={"0.9375rem"}
//       >
//         <Formik
//           initialValues={{
//             bodyText: "",
//           }}
//           // validate={(values) => {
//           //   const errors: Partial<requestFeedBackDataProps> = {};
//           //   if (err) {
//           //     setErr(true);
//           //     errors.bodyText = "Required";
//           //   } else {
//           //     setErr(false);
//           //   }
//           //   return errors;
//           // }}
//           onSubmit={(values) => {
//             console.log(values);
//             const payload = {
//               feedback: text.current,
//             };
//             values.bodyText = text.current;
//             handleSubmitFeedback(payload);
//           }}
//           // validateOnChange
//         >
//           {({ handleSubmit }) => (
//             <Form onSubmit={handleSubmit}>
//               <Stack mt="1rem">
//                 <Box>
//                   <Text
//                     fontSize="0.84375rem"
//                     color="grey_5"
//                     fontWeight={"normal"}
//                     mb="1rem"
//                   >
//                     Write your feedback{" "}
//                   </Text>
//                   <ContentEditable
//                     className={`texteditor ${err ? "errMode" : ""}`}
//                     html={text.current}
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                   />
//                   {err && (
//                     <Text
//                       color="red"
//                       fontSize="12px"
//                       mt="2"
//                       px="2px"
//                       fontWeight="500"
//                     >
//                       Required
//                     </Text>
//                   )}
//                 </Box>
//               </Stack>
//               <Flex maxW="35rem" mx="auto" gap="1.12rem" mt="3rem">
//                 <CustomButton
//                   bgColor={"transparent"}
//                   border="1px"
//                   borderColor="grey_1"
//                   color="grey_1"
//                   handleClick={() => navigate.push(COURSES_URL)}
//                 >
//                   Cancel
//                 </CustomButton>
//                 <CustomButton
//                   type="submit"
//                   disabled={isLoading}
//                   isLoading={isLoading}
//                 >
//                   Submit
//                 </CustomButton>
//               </Flex>
//             </Form>
//           )}
//         </Formik>
//       </Box>
//     </Box>
//   );
// };

// export default RequestFeedBack;
