import { Fragment, useEffect, useRef, useState } from "react";
import {
  Input,
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useResendMutation, useVerifyMutation } from "../../store/Auth/AuthApiSlice";
import { setAuth } from "../../store/Auth/AuthSlice";
import routes from "../../utils/routes";

const Verify = () => {
  const [verify, { isLoading }] = useVerifyMutation()
  const [resend, { isLoading: resendIsLoading }] = useResendMutation()
  const resendOtpFormRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOtpVisible, setIsOtpVisible] = useState(false);

  const handleVerifyOpt = async ({ otp }: { otp: string }) => {
    const email = localStorage.getItem("email");
    const response = await verify({ email, otp }).unwrap();
    if(response.status){
      localStorage.setItem("token", response.token);
      dispatch(setAuth({ loggedIn: true, user: response.data[0] }))
      navigate(routes.Home)
    }
  }
  
  const handleResendOtp = async () => {
    const email = localStorage.getItem("email");
    await resend({ email }).unwrap();
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate(-1);
    }
  });

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
          rounded="md"
          boxShadow="4px 6px 10px 0px rgba(0, 0, 0, 0.10)"
        >
          <CardHeader>
            <Heading size={{ base: "sm", md: "md" }} as="b">
              OTP Verification
            </Heading>
          </CardHeader>

          <Text size={{ base: "xs", md: "sm" }}>
            {" "}
            We sent OTP code on your email address{" "}
          </Text>
          <CardBody>
            <Formik
              innerRef={resendOtpFormRef}
              initialValues={{
                otp: "",
              }}
              onSubmit={handleVerifyOpt}
              validationSchema={Yup.object().shape({
                otp: Yup.string().required("OTP is required"),
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
                      <Box marginTop={"10px"} position="relative">
                        <Box>
                          <Input
                            type={isOtpVisible ? "text" : "password"}
                            color={"#141D43"}
                            marginTop="10px"
                            w={{ base: "15rem", md: "28rem", lg: "28rem" }}
                            id="otp"
                            bg={"#fff"}
                            zIndex="10"
                            placeholder="Enter OTP"
                            value={values.otp}
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
                              errors.otp && touched.otp
                                ? {
                                    border: "1px solid red !important",
                                  }
                                : { border: "1px solid #6C3B1C" }
                            }
                          />

                          <Box
                            onClick={() => {
                              if (values.otp?.length <= 0) return;
                              setIsOtpVisible((prev) => !prev);
                            }}
                            style={{
                              top: errors.otp && touched.otp ? "20%" : "38%",
                              opacity: values.otp?.length > 0 ? 1 : 0.4,
                              cursor:
                                values.otp?.length > 0
                                  ? "pointer"
                                  : "not-allowed",
                              position: "absolute",
                            }}
                            cursor="pointer"
                            right={"1.8rem"}
                            zIndex="10"
                          >
                            {!isOtpVisible ? (
                              <AiOutlineEye color={"#52BBFF"} size={24} />
                            ) : (
                              <AiOutlineEyeInvisible
                                color="#52BBFF"
                                size={24}
                              />
                            )}
                          </Box>
                          {errors.otp && touched.otp && (
                            <Box color="red.500" marginTop={"10px"}>
                              {errors.otp}
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Button
                        bg="#6C3B1C"
                        color="white"
                        w={{ base: "15rem", md: "28rem" }}
                        onClick={() => handleSubmit()}
                        marginTop={"2rem"}
                        position="relative"
                        isLoading={isLoading}
                      >
                        Submit
                      </Button>
                    </Form>
                  </Fragment>
                );
              }}
            </Formik>
          </CardBody>
          <Text size={{ base: "xs", md: "sm" }}>
            Didn't receive the code ?{" "}
            <Button
              color="#6C3B1C"
              variant="link"
              size={{ base: "xs", md: "sm" }}
              onClick={() => handleResendOtp()}
              isLoading={resendIsLoading}
            >
              Resend
            </Button>
          </Text>
        </Card>
      </Box>
    </Fragment>
  );
};

export default Verify;
