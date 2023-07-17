import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.

  return (
    <VStack
      backgroundColor="#fff"
      color="#000"
      alignItems="flex-start"
      spacing={4}
      borderRadius={"lg"}
    >
      <Image borderRadius={"lg"} src={imageSrc} />
      <Box mx={4} mb={3}>
        <Heading size="md">{title}</Heading>
        <Text size="xs" color="#888" my={"4"}>
          {description}
        </Text>
        <HStack>
          <Text size="xs">See more</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </Box>
    </VStack>
  );
};

export default Card;
