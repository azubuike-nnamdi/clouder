import Typography from "@/components/common/Typograph";
import {
  Box,
  Flex,
  Icon,
  ListItem,
  OrderedList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";

import CustomButton from "@/components/common/CustomButton";
import { useCourses } from "@/context/CoursesProvider";
import CoursesPreview from "./CoursesPreview";
import CoursesForm from "./CoursesForm";
import { useRouter } from "next/navigation";
import useCourse from "@/hooks/useCourses";
import { CourseItem } from "@/utils/types";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import LoadingSkeleton from "@/components/common/Skeleton";
import RequestFeedbackModal from "@/components/common/RequestFeedbackModal";
import { COURSES_VIEW_FEEDBACK } from "@/config/route";

interface CustomPageClickEvent extends React.MouseEvent<HTMLButtonElement> {
  selected: number;
}

const Courses = () => {
  const { fillForm, handleFillForm, preview } = useCourses();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const { data: course, isLoading } = useCourse();
  const courses: CourseItem[] = course?.data;
  // ******************************************
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  const items = courses;

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items?.length / itemsPerPage);

  // Run when user click to request another page.
  const handlePageClick = (event: CustomPageClickEvent) => {
    setCurrentPage(event.selected);
    const newOffset = (event.selected * itemsPerPage) % items?.length;
    console.log(
      `User requested page number ${
        event.selected
      }, which is offset ${newOffset} current page is ${
        currentPage + 1
      } and total page is ${pageCount}`,
    );

    setItemOffset(newOffset);
  };
  // ******************************************

  if (isLoading) return <LoadingSkeleton />;

  return (
    <Box>
      <Box pb="3rem">
        {preview ? (
          <CoursesPreview />
        ) : (
          <>
            <Flex align="center" justify="space-between" gap="1rem">
              <Typography variant="heading2">Courses</Typography>
              {courses?.length >= 1 && fillForm !== true && (
                <CustomButton
                  bgColor={"transparent"}
                  border="1px"
                  borderColor="primary"
                  color="primary"
                  w="6rem"
                  h="2.1rem"
                  handleClick={() => handleFillForm(true)}
                >
                  Add New
                </CustomButton>
              )}
            </Flex>{" "}
            {fillForm ? (
              <CoursesForm />
            ) : (
              <Box
                mt="1rem"
                bgColor="white"
                minH="80vh"
                borderRadius="0.46875rem"
              >
                {courses?.length >= 1 ? (
                  <Box py="2.44rem" px="2.39rem">
                    <Flex
                      justify="center"
                      align="center"
                      py="1.125rem"
                      w="100%"
                      rounded="0.375rem"
                      bgColor="grey_14"
                    >
                      <Text fontSize="1.125rem" fontWeight="700">
                        Courses Entries
                      </Text>
                    </Flex>

                    <OrderedList mt="2.2rem">
                      {currentItems
                        ?.slice()
                        .reverse() // Reverse the array to display the recent data first
                        .map((item) => {
                          return (
                            <ListItem
                              mb={"1rem"}
                              color="grey_1"
                              key={item?.id}
                              fontSize="1.125rem"
                              fontWeight="600"
                              display="flex"
                              alignItems="center"
                              justifyContent={"space-between"}
                            >
                              <Text
                                onClick={() =>
                                  router.push(
                                    `/dashboard/courses/course_aquired/${item?.id}`,
                                  )
                                }
                                cursor={"pointer"}
                              >{`${item?.institution}
                                                            `}</Text>

                              <Flex gap={"10px"}>
                                <Text
                                  bgColor="white"
                                  fontSize="0.75rem"
                                  color="#03A9F4"
                                  fontWeight="normal"
                                  w="fit-content"
                                  p="0.8rem 1rem"
                                  cursor="pointer"
                                  as="a"
                                  href={COURSES_VIEW_FEEDBACK(item?.id)}
                                >
                                  View feedback
                                </Text>
                                <Text
                                  bgColor="white"
                                  fontSize="0.75rem"
                                  color="#03A9F4"
                                  fontWeight="normal"
                                  w="fit-content"
                                  p="0.8rem 1rem"
                                  rounded={"1.35938rem"}
                                  border={"1px solid #03A9F4"}
                                  cursor="pointer"
                                  as="button"
                                  onClick={() => {
                                    setSelectedCourseId(item?.id);
                                    onOpen();
                                  }}
                                >
                                  Request feedback
                                </Text>
                              </Flex>
                            </ListItem>
                          );
                        })}
                    </OrderedList>
                  </Box>
                ) : (
                  <Flex align="center" justify="center" flexDir={"column"}>
                    <Text fontSize="1.3125rem" color="grey_1" mt="3.75rem">
                      {" "}
                      You currently do not have any data supplied
                    </Text>

                    <Flex
                      mt="1rem"
                      gap="0.38rem"
                      fontSize={"0.84375rem"}
                      color="primary"
                      cursor={"pointer"}
                      align="center"
                      fontWeight="600"
                      onClick={() => handleFillForm(true)}
                    >
                      <Icon as={MdOutlineAddCircleOutline} /> Add Courses
                    </Flex>
                  </Flex>
                )}
              </Box>
            )}{" "}
          </>
        )}
      </Box>

      <Flex align="center" justify="center">
        <ReactPaginate
          nextLabel={<Icon as={BsChevronRight} color="primary" />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel={<Icon as={BsChevronLeft} />}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="of"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          // eslint-disable-next-line no-unused-vars
          // hrefBuilder={(page, pageCount, selected) =>
          //     page >= 1 && page <= pageCount ? `/page/${page}` : "#"
          // }
          // hrefAllControls
        />
      </Flex>
      {/* open add feedback modal */}
      {/* courseId={course?.data?.[0]?.id} */}
      {isOpen && (
        <RequestFeedbackModal
          isOpen={isOpen}
          onClose={onClose}
          selectedId={selectedCourseId}
        />
      )}
    </Box>
  );
};
export default Courses;
