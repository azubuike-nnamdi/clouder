import Typography from "@/components/common/Typograph";
import {
  Box,
  Flex,
  Icon,
  ListItem,
  OrderedList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";

import CustomButton from "@/components/common/CustomButton";

import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { useQualityImprovement } from "@/context/QualityImprovement";
import QualityImprovementForm from "./QualityImprovementForm";

import QualityImprovementPreview from "./QualityImprovementPreview";
import useQuality from "@/hooks/useQuality";
import LoadingSkeleton from "@/components/common/Skeleton";
import { QualityDataItem } from "@/utils/types";
interface CustomPageClickEvent extends React.MouseEvent<HTMLButtonElement> {
  selected: number;
}

const QualityImprovement = () => {
  const { fillForm, handleFillForm, preview, totalData, activityType } =
    useQualityImprovement();

  const { isLoading, data } = useQuality();

  const qualityData = data?.data?.message;

  const router = useRouter();

  const filteredQualityData = qualityData?.filter((item: QualityDataItem) => {
    switch (activityType) {
      case "Morbidity & Mortality":
        return item.type === "morbidity";
      case "Clinical Audit":
        return item.type === "clinical";
      case "Case Review":
        return item.type === "case";
      default:
        return false;
    }
  });

  // ******************************************
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const items = totalData;

  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items?.length / itemsPerPage);

  // Run when user click to request another page.
  const handlePageClick = (event: CustomPageClickEvent) => {
    setCurrentPage(event.selected);
    const newOffset =
      (event.selected * itemsPerPage) % filteredQualityData?.length;

    setItemOffset(newOffset);
  };
  // ******************************************

  if (isLoading) return <LoadingSkeleton />;

  return (
    <Box>
      <Box pb="3rem">
        {preview ? (
          <QualityImprovementPreview />
        ) : (
          <>
            <Flex align="center" justify="space-between" gap="1rem">
              <Box>
                <Typography variant="heading2">
                  Quality improvement activity{" "}
                  {activityType ? (
                    <Text as="span">({activityType})</Text>
                  ) : (
                    <Spinner size={"sm"} />
                  )}
                </Typography>
              </Box>
              {filteredQualityData?.length >= 1 && fillForm !== true && (
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
              <QualityImprovementForm />
            ) : (
              <Box
                mt="1rem"
                bgColor="white"
                minH="80vh"
                borderRadius="0.46875rem"
              >
                {filteredQualityData?.length >= 1 ? (
                  <Box py="2.44rem" px="2.39rem">
                    <Box>
                      <Flex
                        justify="center"
                        align="center"
                        py="1.125rem"
                        w="100%"
                        rounded="0.375rem"
                        bgColor="grey_14"
                      >
                        <Text fontSize="1.125rem" fontWeight="700">
                          Quality improvement activity Entries
                        </Text>
                      </Flex>
                    </Box>

                    <OrderedList mt="2.2rem">
                      {filteredQualityData
                        ?.slice()
                        .reverse()
                        .map((item: QualityDataItem) => {
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
                                    `/dashboard/quality_improvement/activity_aquired/${item?.id}`,
                                  )
                                }
                                cursor={"pointer"}
                              >
                                {item?.title}
                              </Text>
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
                      <Icon as={MdOutlineAddCircleOutline} /> Add Activities
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
        {currentPage}
      </Flex>
    </Box>
  );
};
export default QualityImprovement;
