import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormType } from "../type";
import { loginSchema, registerSchema } from "../zod-schemas";
import { useAuth } from "../hooks";

import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";

const styles = {
  paper: {
    background: "rgba(255,255,255,0.1)",
    padding: "2rem",
  },
  avatar: {
    backgroundColor: "#9c27b0",
  },
  boxLink: { "@media (min-width: 500px)": { flexDirection: "row" } },
};

type Props = {
  mode: "signin" | "signup";
};

const Auth = ({ mode }: Props) => {
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AuthFormType>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(mode === "signin" ? loginSchema : registerSchema),
  });

  const { mutate, isLoading, error, reset: mutationReset } = useAuth();

  useEffect(() => {
    if (!error) return;

    setTimeout(mutationReset, 5000);
  }, [error]);

  const onSubmit: SubmitHandler<AuthFormType> = ({ email, password }) => {
    mutate({ email: email.toLowerCase(), password, mode });
    setValue("password", "");
    setValue("confirmPassword", "");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: "4rem" }}>
      <Paper component={Stack} gap="1.5rem" elevation={0} sx={styles.paper}>
        <Box display="flex" justifyContent="center">
          <Avatar sx={styles.avatar}>
            <LockOutlinedIcon sx={{ color: "white" }} />
          </Avatar>
        </Box>

        <Typography component="h1" variant="h4" textAlign="center">
          {mode === "signin" ? " Sign in" : "Sign Up"}
        </Typography>

        <Stack component="form" gap="2rem" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Email"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          {mode === "signup" && (
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  type="password"
                  label="Confirm password"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          )}

          {!!error && (
            <Alert severity="error">
              {(error as any).response.data.details}
            </Alert>
          )}

          <LoadingButton type="submit" loading={isLoading} variant="contained">
            {mode === "signin" ? "Sign in" : "Sign up"}
          </LoadingButton>

          <Box display="flex" flexDirection="column" sx={styles.boxLink}>
            <Link
              href="#"
              onClick={() => {
                mutationReset();
                reset();
                navigate(`/auth/${mode === "signin" ? "signup" : "signin"}`);
              }}
            >
              {mode === "signin"
                ? "Create a new account"
                : "Sign in with an existing account"}
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Auth;
