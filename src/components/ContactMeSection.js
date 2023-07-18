import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const ResetForm = ({ response, formik }) => {
  useEffect(() => {
    if (response && response.type === "success") {
      formik.resetForm();
    }
  }, [response]);

  return null; // or you can return any JSX if needed
};

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen, onClose, isOpen, type, message } = useAlertContext();

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
    }
  }, [response]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    onSubmit: (values) => {
      submit("apitest.com", values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().required("Required").email("Invalid email address"),
      type: Yup.string().optional(),
      comment: Yup.string()
        .required("Required")
        .min(25, "Must be at least 25 characters"),
    }),
  });

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
              color="#1e222d"
              bgColor={type === "success" ? "#8bc782" : "#f48a63"}
            >
              <ModalHeader>
                {type === "success" ? "All good!" : "Oops!"}
              </ModalHeader>
              <ModalBody>{message}</ModalBody>
            </ModalContent>
          </Modal>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <VStack spacing={4}>
              <FormControl
                isInvalid={formik.errors.firstName && formik.touched.firstName}
              >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  id="firstName"
                  name="firstName"
                />
                <FormErrorMessage> {formik.errors.firstName} </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.email && formik.touched.email}
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id="email"
                  name="email"
                  type="email"
                />
                <FormErrorMessage> {formik.errors.email} </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  onChange={formik.handleChange}
                  value={formik.values.type}
                  id="type"
                  name="type"
                >
                  <option value="hireMe" style={{ backgroundColor: "#512DA8" }}>
                    Freelance project proposal
                  </option>
                  <option
                    value="openSource"
                    style={{ backgroundColor: "#512DA8" }}
                  >
                    Open source consultancy session
                  </option>
                  <option value="other" style={{ backgroundColor: "#512DA8" }}>
                    Other
                  </option>
                </Select>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.comment && formik.touched.comment}
              >
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.comment}
                  id="comment"
                  name="comment"
                  height={250}
                />
                <FormErrorMessage> {formik.errors.comment} </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isLoading={isLoading}
                loadingText="Submitting"
              >
                Submit
              </Button>
            </VStack>
            <ResetForm response={response} formik={formik} />
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
