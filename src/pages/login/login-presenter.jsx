// 최초 작성자 박경찬
import {
  Container,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import * as S from "../../styles/page-style/login-style";
import SelectBox from "../../components/select/select";

export default function LoginPresenter(props) {
  const {
    register,
    LoginUser,
    handleSubmit,
    formState,
    setSelectedSystem,
    selectedSystem,
    isNotPublic,
  } = props;

  return (
    <S.Form onSubmit={handleSubmit(LoginUser)}>
      <Box sx={S.MuiBox} xs={1}>
        <Container component="main" sx={S.MuiContainor}>
          <Grid container rowSpacing={1}>
            <Grid item xs={12} sx={S.EmtyBox1}>
              <div
                style={{
                  width: "100%",
                  height: 25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></div>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  width: "100%",
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={S.Typography}>NBS</Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></div>
            </Grid>
            <Grid
              item
              xs={12}
              xl={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12} xl={12}>
                <TextField
                  fullWidth
                  label="ID"
                  name="userId"
                  size="small"
                  InputLabelProps={S.InputLabelProps}
                  sx={S.MuiText}
                  {...register("userId", { required: "사용자명은 필수입니다" })}
                />
              </Grid>
              {formState.errors?.userId?.message && (
                <Grid item xs={12} xl={12} mt={1}>
                  <S.ErrorP $error={formState.errors?.userId?.message}>
                    {formState.errors.userId.message}
                  </S.ErrorP>
                </Grid>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              xl={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12} xl={12}>
                <TextField
                  fullWidth
                  label="password"
                  type="password"
                  variant="outlined"
                  size="small"
                  InputLabelProps={S.InputLabelProps}
                  sx={S.MuiText}
                  {...register("password", {
                    required: "비밀번호는 필수입니다",
                  })}
                />
              </Grid>
              {formState.errors?.password?.message && (
                <Grid item xs={12} xl={12} mt={1}>
                  <S.ErrorP $error={formState.errors?.password?.message}>
                    {formState.errors.password.message}
                  </S.ErrorP>
                </Grid>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              xl={12}
              sx={{
                display: "center",
                justifyContent: "center",
                alignItems: "center",

                // "@media (max-width: 2560px)": {
                //   paddingTop: 0,
                //   marginLeft: 1.5,
                //   marginTop: 1,
                // },

                // "@media (max-width: 1920px)": {
                //   paddingTop: 0,
                //   marginLeft: 0,
                //   marginTop: 0,
                // },

                // "@media (max-width: 1440px)": {
                //   paddingTop: 0,
                //   marginLeft: 0,
                //   marginTop: 0,
                // },
                // "@media (max-width: 760px)": {
                //   paddingTop: 0,
                //   marginLeft: 1,
                //   marginTop: 1,
                // },

                // "@media (max-width: 360px)": {
                //   paddingTop: 0,
                //   marginLeft: 1,
                //   marginTop: 1,
                // },
              }}
            >
              <SelectBox
                setSelectedSystem={setSelectedSystem}
                selectedSystem={selectedSystem}
                isNotPublic={isNotPublic}
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{ display: "flex", justifyContent: "center", padding: 3 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={S.MuiButton}
                >
                  login
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </S.Form>
  );
}
