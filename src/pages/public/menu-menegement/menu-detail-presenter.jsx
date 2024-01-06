import { Fragment } from "react";
import Grid from "@mui/joy/Grid";
import { Box, TextField, Typography, Button } from "@mui/material";
import Radio from "@mui/material/Radio";

//메뉴정보 디테일 정보 TAG를 그리는곳이다.
export default function MenuDetailPresenter(props) {
  const {
    selectedValue,
    handleChange,
    register,
    handleSubmit,
    handleButtonClick,
    onClickSave,
    disabled,
    menuLevelChecked,
    prevSelectedItemKeys,
    width,
  } = props;

  //하위레벨, 같은레벨, 저장 ,삭제 버튼의 스타일
  const getButtonStyle = (width) => ({
    width: `${!menuLevelChecked ? "30%" : "25%"}`,
    height: 30,
    borderRadius: 30,
    marginBottom: 2,
    marginLeft: 1,
    fontSize: "0.6em",
    backgroundColor: "#ffffff",
    color: "black",
    "&:hover": {
      backgroundColor: "#dfdfdf",
    },
    "@media (min-width:1920px)": {
      fontSize: "0.6em",
      width: "30%",
    },
  });

  //입력란을 만드는 함수 //  label은 메뉴이름 // key = menuId
  const renderTextField = (label, key, isDisabled = false) => (
    <Grid key={key} xs={12} md={12} lg={12} xl={12}>
      <Typography variant="h4" gutterBottom>
        {label}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        name="id"
        size="small"
        disabled={
          key === "applicationName" ||
          (!disabled && key === "menuId") ||
          key === "prntmenuId" ||
          key === "parntMenuName" ||
          key === "updatedAt" ||
          key === "updatedBy" ||
          key === "createdAt" ||
          (!menuLevelChecked && key === "menuName") ||
          key === "createdBy"
        }
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: 2,
            height: 34,
          },
        }}
        {...register(key)}
      />
    </Grid>
  );

  //같은레벨, 하위레벨, 삭제, 저장 버튼 만드는 함수
  // label 버튼의 이름
  // icon 버튼안쪽 아이콘
  // type 버튼의 상택값들 저장 , 삭제, 같은레벨, 하위레벨 타입들을 정의
  // onClick 버튼의 상태값마다 클릭함수 전달
  const renderButton = (label, icon, action, type, onClick) => (
    <Button
      type={action === "submit" ? "submit" : "button"}
      variant="contained"
      sx={getButtonStyle(145)}
      disabled={
        (menuLevelChecked === false && icon === "sameButton") ||
        (menuLevelChecked === false && icon === "subButton") ||
        (menuLevelChecked === false && icon === "submitButton")
      }
      onClick={
        label === "저장" ? (e) => "저장" : (e) => onClick(e, action, type)
      }
    >
      {label}
    </Button>
  );

  return (
    <Fragment>
      {/*선택한 로우의 값들을 보여줌*/}
      {prevSelectedItemKeys && (
        <form onSubmit={handleSubmit((data, e) => onClickSave(data, e))}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={0}
            sx={{
              flexGrow: 1,
              // overflowY: "auto",
              // backgroundColor: "red",
              height: width > 1440 ? 970 : 640,
            }}
          >
            <Grid xs={12} md={12} lg={12} xl={3.8}>
              <Typography variant="h3" gutterBottom>
                메뉴정보
              </Typography>
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
              xl={8}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: 1,
              }}
            >
              {renderButton(
                "같은Level추가",
                "sameButton",
                "new",
                "samelevel",
                handleButtonClick
              )}

              {renderButton(
                "하위Level추가",
                "subButton",
                "new",
                "sublevel",
                handleButtonClick
              )}

              <>
                {renderButton(
                  "저장",
                  "submitButton",
                  "submit",
                  // disabled ? "submit" : "updata"
                  "",
                  handleButtonClick
                )}
              </>

              {renderButton("삭제", "", "delete", "level", handleButtonClick)}
            </Grid>
            {/* key 값에 따라 input디자인의 width가 달라지거나 입력하는 형태가 라디오 버튼으로 변경되어야 하기 때문에 key값을 조건으로 스타일을 변경함*/}

            {/*remark 비고에 대한 스타일 변경 비고는 input이 멀티라인으로 변경*/}
            {Object.keys(prevSelectedItemKeys).map((key) =>
              key === "useYnName" ? null : key === "roll" ? null : key ===
                "items" ? null : key === "remark" ? (
                <Grid key={key} xs={12} lg={12} xl={12}>
                  <Typography variant="h4" gutterBottom>
                    비고
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="id"
                    size="small"
                    multiline
                    rows={4}
                    sx={
                      {
                        // "& .MuiInputBase-root": {
                        //   borderRadius: 2,
                        //   width: 400,
                        // },
                      }
                    }
                  />
                </Grid>
              ) : // 여기 useYn이 라디오 버튼
              key === "useYn" ? (
                <Fragment key={key}>
                  <Grid xs={12} lg={12} xl={12}>
                    <Typography variant="h4" gutterBottom>
                      사용여부
                    </Typography>
                  </Grid>
                  <Grid
                    xs={1}
                    md={1}
                    lg={1}
                    xl={1}
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
                    xs={2}
                    md={5}
                    lg={1}
                    xl={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h4">사용함</Typography>
                  </Grid>
                  <Grid
                    md={1}
                    lg={1}
                    xl={1}
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
                    md={2}
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
                // 동일한 스타일을 가져가야하는 인풋창
                renderTextField(
                  key === "applicationName"
                    ? "시스템"
                    : key === "menuId"
                    ? "메뉴ID"
                    : key === "menuName"
                    ? "메뉴이름"
                    : key === "prntmenuId"
                    ? "상위메뉴ID"
                    : key === "parntMenuName"
                    ? "상위메뉴이름"
                    : key === "sortOdr"
                    ? "정렬"
                    : key === "menuUrl"
                    ? "메뉴URL"
                    : key === "remark"
                    ? "비고"
                    : key === "createdBy"
                    ? "등록자"
                    : key === "createdAt"
                    ? "등록일시"
                    : key === "updatedBy"
                    ? "수정자"
                    : key === "updatedAt"
                    ? "수정일시"
                    : "",
                  key
                )
              )
            )}
          </Grid>
        </form>
      )}
    </Fragment>
  );
}
