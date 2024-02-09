import { Fragment, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../../store/Auth/AuthApiSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import routes from "../../utils/routes";

const Signin = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [signin, { isLoading }] = useSigninMutation();
  const onSubmitCred = async (email: string, password: string) => {
    const response = await signin({ email, password }).unwrap();
    localStorage.setItem("email", email);
    if (response.status) {
      navigate(routes.Verify);
    }
  };
  return (
    <Fragment>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Card
          align="center"
          size={{ base: "sm", md: "md" }}
          width={{ base: "container.xs", md: "container.sm" }}
          padding="9"
          boxShadow="0px 3px 22px 5px rgba(237, 127, 127, 0.10), 0px 4px 4px 8px rgba(51, 207, 26, 0.05)"
        >
          <Text size="sm">Welcome back</Text>
          <CardHeader>
            <Heading size={{ base: "sm", md: "lg" }}>
              Login to your account
            </Heading>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={async (values) => {
                await onSubmitCred(values.email, values.password);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required("Email is required"),

                password: Yup.string().required("Please enter your password"),
              })}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;
                return (
                  <Fragment>
                    <Form>
                      <Box mt={"10px"} ml="2rem">
                        <Text
                          color={"#141D43"}
                          fontSize={{
                            base: "sm",
                            md: "sm",
                            lg: "md",
                          }}
                          fontWeight={"700"}
                          fontFamily={"font.roboto"}
                        >
                          Email{" "}
                          <Text as="span" color="red">
                            *
                          </Text>
                        </Text>
                        <Input
                          type="email"
                          color={"#141D43"}
                          w={{
                            base: "15rem",
                            md: "28rem",
                            lg: "28rem",
                          }}
                          marginTop="10px"
                          id="email"
                          bg={"#fff"}
                          placeholder="Enter your email address"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fontSize={"14px"}
                          border="1px solid #9E9E9E"
                          _placeholder={{
                            opacity: 1,
                            color: "",
                            fontSize: "14px",
                          }}
                          _focusVisible={
                            errors.email && touched.email
                              ? {
                                  border: "1px solid red !important",
                                }
                              : {
                                  border: "1px solid #6C3B1C",
                                }
                          }
                        />
                        {errors.email && touched.email && (
                          <Box color="red.500" marginTop={"10px"}>
                            {errors.email}
                          </Box>
                        )}
                      </Box>
                      <Box marginTop={"10px"} position="relative" ml="2rem">
                        <Text
                          color={"#141D43"}
                          fontSize={{
                            base: "sm",
                            md: "sm",
                            lg: "md",
                          }}
                          fontWeight={"700"}
                          fontFamily={"font.roboto"}
                        >
                          Password{" "}
                          <Text as="span" color="red">
                            *
                          </Text>
                        </Text>
                        <Box
                          style={{ position: "relative" }}
                          w={{
                            base: "15rem",
                            md: "28rem",
                            lg: "28rem",
                          }}
                        >
                          <Input
                            type={isPasswordVisible ? "text" : "password"}
                            color={"#141D43"}
                            marginTop="10px"
                            w={{
                              base: "15rem",
                              md: "28rem",
                              lg: "28rem",
                            }}
                            id="password"
                            bg={"#fff"}
                            zIndex="10"
                            placeholder="Enter Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            border="1px solid #9E9E9E"
                            fontSize={"14px"}
                            _placeholder={{
                              opacity: 1,
                              color: "",
                              fontSize: "14px",
                            }}
                            _focusVisible={
                              errors.password && touched.password
                                ? {
                                    border: "1px solid red !important",
                                  }
                                : {
                                    border: "1px solid #6C3B1C",
                                  }
                            }
                          />

                          <Box
                            onClick={() => {
                              if (values.password?.length <= 0) return;
                              setIsPasswordVisible((prev) => !prev);
                            }}
                            style={{
                              top:
                                errors.password && touched.password
                                  ? "23%"
                                  : "38%",
                              opacity: values.password?.length > 0 ? 1 : 0.4,
                              cursor:
                                values.password?.length > 0
                                  ? "pointer"
                                  : "not-allowed",
                              position: "absolute",
                              right: "10px",
                            }}
                            cursor="pointer"
                            right={"6rem"}
                            zIndex="10"
                          >
                            {!isPasswordVisible ? (
                              <AiOutlineEye color={"#52BBFF"} size={24} />
                            ) : (
                              <AiOutlineEyeInvisible
                                color="#52BBFF"
                                size={24}
                                // marginBottom={'10px'}
                              />
                            )}
                          </Box>
                          {errors.password && touched.password && (
                            <Box color="red.500" marginTop={"10px"}>
                              {errors.password}
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Button
                        ml="2rem"
                        bg="#6C3B1C"
                        color={"white"}
                        w={{
                          base: "15rem",
                          md: "28rem",
                        }}
                        onClick={() => handleSubmit()}
                        marginTop={"2rem"}
                        position="relative"
                        type="submit"
                        isLoading={isLoading}
                        _hover={{
                          color: "#000",
                          background: "lightgray",
                        }}
                      >
                        Login now
                      </Button>
                      <Button
                        ml="1.5rem"
                        mt="10px"
                        variant="link"
                        size={{ base: "xs", md: "sm" }}
                        onClick={() => {
                          navigate("/forgot-password");
                          localStorage.setItem("isExistingUser", "true");
                        }}
                      >
                        Forgot Password
                      </Button>
                    </Form>
                  </Fragment>
                );
              }}
            </Formik>
          </CardBody>
        </Card>
      </Box>
    </Fragment>
  );
};

export default Signin;
