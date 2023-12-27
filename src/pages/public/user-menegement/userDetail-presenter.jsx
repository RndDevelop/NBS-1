import { Fragment } from "react";
import Grid from "@mui/joy/Grid";
import { TextField, Typography, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Controller } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function UserDetailPresenter(props) {
  const {
    isSmallScreen,
    handleChange,
    onClickSave,
    handleButtonClick,
    register,
    handleSubmit,
    formState,
    formControl,
    selectedItemKeys,
    handleChangeRadio,
    selectedValue,
  } = props;

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onClickSave)}>
        <Grid container rowSpacing={1} columnSpacing={0} sx={{ flexGrow: 1 }}>
          <Grid xs={9} xl={9.5}>
            <Typography variant="h3" gutterBottom>
              사용자 정보
            </Typography>
          </Grid>
          <Grid
            xs={7}
            md={12}
            lg={3}
            xl={2.5}
            sx={{
              display: "flex",
              justifyContent: "space-between",

              "@media (min-width:1920px)": {
                justifyContent: "space-evenly",
              },
              "@media (min-width:2560px)": {
                justifyContent: "space-between",
              },
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "whitesmoke",
                color: "black",
                width: 100,
                "&:hover": {
                  backgroundColor: "#dfdfdf",
                },
              }}
              onClick={(e) => handleButtonClick(e, "new")}
              startIcon={<AddIcon />}
            >
              신규
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: 100,
                backgroundColor: "whitesmoke",
                color: "black",
                "&:hover": {
                  backgroundColor: "#dfdfdf",
                },
              }}
              startIcon={<SaveIcon />}
            >
              저장
            </Button>
            <Button
              variant="contained"
              sx={{
                width: 100,
                backgroundColor: "whitesmoke",
                color: "black",
                "&:hover": {
                  backgroundColor: "#dfdfdf",
                },
              }}
              startIcon={<DeleteIcon />}
              onClick={(e) => handleButtonClick(e, "delete")}
            >
              삭제
            </Button>
          </Grid>

          {Object.keys(selectedItemKeys).map((key) =>
            key === "jobTitleName" ? null : key === "remark" ? (
              <Grid key={key} xs={12} md={6} lg={4} xl={10} container>
                <Grid>
                  <Typography level="title-sm">비고</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name={key}
                    size="small"
                    onChange={handleChange}
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: 2,
                        height: 34,
                        width: 400,
                        "@media (min-width:1920px)": {
                          width: 1433,
                        },
                        "@media (min-width:2560px)": {
                          width: 2050,
                        },
                      },
                    }}
                    {...register(key)}
                    // disabled={key === "userId" || key === "userName"}
                  />
                </Grid>
              </Grid>
            ) : key === "jobTitle" ? (
              <Grid key={key} xs={6} md={6} lg={4} xl={6}>
                <Typography level="title-sm">
                  {key === "jobTitle" && "직급"}
                </Typography>
                <FormControl size="small" fullWidth sx={{ width: "94.5%" }}>
                  <Controller
                    name={key}
                    control={formControl}
                    render={({ field }) => (
                      //render를 사용해서 userForm 과 MUI를 연동한다.
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e)}
                        size="large"
                        sx={{ height: 34, borderRadius: 2, width: "89%" }}
                      >
                        {/*SELECTBOX ITEM*/}
                        <MenuItem value={"팀장"}>팀장</MenuItem>
                        <MenuItem value={"주임"}>주임</MenuItem>
                        <MenuItem value={"대리"}>대리</MenuItem>
                        <MenuItem value={"실장"}>실장</MenuItem>
                        <MenuItem value={"대표"}>대표</MenuItem>
                        <MenuItem value={"전무"}>전무</MenuItem>
                        <MenuItem value={"차장"}>차장</MenuItem>
                        {/*SELECTBOX ITEM*/}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
            ) : key === "useYn" ? (
              <Grid key={key} xs={10} md={6} lg={4} xl={4}>
                <Grid>
                  <Typography variant="h4">
                    {/*KEY 조건 마다 제목은 달라진다*/}
                    {key === "useYn" && "사용여부"}
                  </Typography>
                </Grid>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/*라디오 버튼*/}
                  <Radio
                    checked={selectedValue === "Y"}
                    value={"Y"}
                    onChange={handleChangeRadio}
                    name="safetyInspection"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <Typography variant="h4">사용함</Typography>
                  <Radio
                    checked={selectedValue === "N"}
                    value={"N"}
                    onChange={handleChangeRadio}
                    name="safetyInspection"
                    inputProps={{ "aria-label": "B" }}
                  />
                  <Typography variant="h4">사용안함</Typography>
                </Grid>
                {/*라디오 버튼 END*/}
              </Grid>
            ) : (
              <Grid
                key={key}
                xs={12}
                md={6}
                lg={4}
                xl={key === "userPwd" ? 12 : 6}
                container
              >
                <Grid>
                  <Typography level="title-sm">
                    {key === "userId" && "사용자ID"}
                    {key === "userName" && "사용자명"}
                    {key === "department" && "그룹"}
                    {key === "telPhone" && "일반전화"}
                    {key === "email" && "이메일"}
                    {key === "cellPhone" && "핸드폰"}
                    {key === "createdAt" && "등록시간"}
                    {key === "createdBy" && "등록자"}
                    {key === "updatedAt" && "수정시간"}
                    {key === "updatedBy" && "수정자"}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name={key}
                    size="small"
                    onChange={handleChange}
                    type={key === "userPwd" ? "userPwd" : "text"}
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: 2,
                        height: 34,
                        width: 300,
                        "@media (min-width:1920px)": {
                          width: key === "userPwd" ? 650 : 658,
                        },

                        "@media (min-width:2560px)": {
                          width: key === "userPwd" ? 650 : 1010,
                        },
                      },
                    }}
                    {...register(key)}
                    // disabled={key === "UserId" || key === "UserName"}
                    // disabled={key === "userId"}
                  />
                </Grid>

                {key === "userPwd" && (
                  <Grid ml={2} mt={2.5}>
                    <Button variant="contained">비밀번호초기화</Button>
                  </Grid>
                )}
              </Grid>
            )
          )}
        </Grid>
      </form>
    </Fragment>
  );
}
