import { Fragment } from "react";
import Grid from "@mui/joy/Grid";
import { Box, TextField, Typography, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Radio from "@mui/material/Radio";

//권한 디테일 정보 TAG를 그리는곳이다.
export default function RollDetailPresenter(props) {
  const {
    selectedValue,
    handleChange,
    register,
    handleSubmit,
    control,
    handleButtonClick,
    onClickSave,
    selectedItemKeys,
  } = props;

  const renderTextField = (
    key,
    label,
    width = 400,
    multiline = false,
    rows = 1,
    disabled = false
  ) => (
    <Grid key={key} xs={12} md={6} lg={6} xl={12}>
      <Typography variant="h4" gutterBottom>
        {label}
      </Typography>
      <TextField
        variant="outlined"
        name={key}
        size="small"
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: 2,
            height: 34,
            width: width,
            "@media (min-width:1920px)": {
              width: width === 400 ? 800 : 800, // Adjust as needed
            },
          },
        }}
        multiline={multiline}
        rows={rows}
        {...register(key)}
        disabled={disabled}
      />
    </Grid>
  );

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onClickSave)}>
        <Grid container rowSpacing={1} columnSpacing={0} sx={{ flexGrow: 1 }}>
          <Grid xs={9} xl={7}>
            <Typography variant="h3" gutterBottom>
              권한그룹정보
            </Typography>
          </Grid>
          <Grid
            xs={7}
            md={12}
            lg={3}
            xl={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: 1,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "whitesmoke",
                color: "black",
                width: 90,
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
                width: 90,
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
                width: 90,
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
            key === "id" ? null : key === "use" ? (
              <Fragment key={key}>
                <Grid xs={9} xl={12}>
                  <Typography variant="h4" gutterBottom>
                    사용 여부
                  </Typography>
                </Grid>
                <Grid
                  xs={7}
                  md={12}
                  lg={3}
                  xl={0.5}
                  sx={{
                    display: "felx",
                    justifyContent: "flex-start",
                  }}
                >
                  <Radio
                    checked={selectedValue === "Y"}
                    onChange={handleChange}
                    value="Y"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                </Grid>
                <Grid
                  xs={7}
                  md={12}
                  lg={3}
                  xl={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">사용함</Typography>
                </Grid>
                <Grid
                  xs={7}
                  md={12}
                  lg={3}
                  xl={0.5}
                  sx={{
                    display: "felx",
                    justifyContent: "flex-start",
                  }}
                >
                  <Radio
                    checked={selectedValue === "N"}
                    onChange={handleChange}
                    value="N"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "B" }}
                  />
                </Grid>
                <Grid
                  xs={7}
                  md={12}
                  lg={3}
                  xl={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">사용안함</Typography>
                </Grid>
              </Fragment>
            ) : (
              <Grid key={key} xs={12} md={6} lg={6} xl={12}>
                <Typography variant="h4" gutterBottom>
                  {key === "UserId" && "권한그룹ID"}
                  {key === "GroupName" && "관리자그룹이름"}
                  {key === "GroupInfo" && "관리자그룹설명"}
                  {key === "creater" && "등록자"}
                  {key === "createTime" && "등록일시"}
                  {key === "updater" && "수정자"}
                  {key === "updateTime" && "수정일시"}
                </Typography>
                <TextField
                  variant="outlined"
                  name="id"
                  size="small"
                  multiline={key === "bigo" || key === "GroupInfo"}
                  rows={key === "bigo" || key === "GroupInfo" ? 4 : 0}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: 2,
                      height: key !== "bigo" || (key === "GroupInfo" && 34),
                      width: 400,
                      "@media (min-width:1920px)": {
                        width: 800,
                      },
                    },
                  }}
                  {...register(key)}
                />
              </Grid>
            )
          )}
        </Grid>
      </form>
    </Fragment>
  );
}
