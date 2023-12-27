import { Fragment } from "react";

import Grid from "@mui/joy/Grid";
import { TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Radio from "@mui/material/Radio";
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

//유저 디테일
export default function BuildingDetailpresenter(props) {
  const {
    handleButtonClick,
    handleChangeRadio,
    selectedValue,
    register,
    handleSubmit,
    onClickSave,
    selectedItemKeys,
    formControl,
  } = props;

  return (
    <>
      <Fragment>
        {/* 폼  시작*/}
        <form onSubmit={handleSubmit(onClickSave)}>
          {/* 가장 큰 그리드 */}
          <Grid container rowSpacing={1} columnSpacing={0} sx={{ flexGrow: 1 }}>
            <Grid xs={9} xl={10.5}>
              <Typography variant="h3" gutterBottom>
                건물기본정보
              </Typography>
            </Grid>
            <Grid
              xs={7}
              md={12}
              lg={3}
              xl={1.5}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                style={{ width: "30%", height: "35px" }}
                content="new"
                onClick={(e) => handleButtonClick(e, "new")}
              >
                신규
              </Button>

              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                style={{ width: "30%", height: "35px" }}
              >
                저장
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                style={{ width: "30%", height: "35px" }}
                onClick={(e) => handleButtonClick(e, "delete")}
              >
                삭제
              </Button>
            </Grid>{" "}
            {/*ObjectKey 값을 순환하면서 component를 생성한다 이유는 중복된 컴포넌트 가 있다 하지만 그키와 종류가 다른 컴포넌트들은 key 의조건을 부여햐여 해당하는 조건에 맞는 컴포넌트들이 렌더링 될수 있게 작업되어 있다.*/}
            {/*라디오버튼 시작*/}
            {Object.keys(selectedItemKeys).map((key) =>
              key === "id" ? null : key === "safetyInspection" ||
                key === "reinforcementAndMaintenance" ? (
                <Grid key={key} xs={10} md={6} lg={4} xl={4}>
                  <Grid>
                    <Typography variant="h4">
                      {/*KEY 조건 마다 제목은 달라진다*/}
                      {key === "safetyInspection" && "안전점검"}
                      {key === "reinforcementAndMaintenance" && "보강 및 정비"}
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
                      checked={selectedValue === "a"}
                      onChange={handleChangeRadio}
                      value="a"
                      name="safetyInspection"
                      inputProps={{ "aria-label": "A" }}
                    />
                    <Typography variant="h4">유</Typography>
                    <Radio
                      checked={selectedValue === "b"}
                      onChange={handleChangeRadio}
                      value="b"
                      name="safetyInspection"
                      inputProps={{ "aria-label": "B" }}
                    />
                    <Typography variant="h4">무</Typography>
                  </Grid>
                  {/*라디오 버튼 END*/}
                </Grid>
              ) : //라디오 버튼 END
              key === "inspector" || key === "constructionClient" ? (
                <Grid key={key} xs={10} md={6} lg={4} xl={6}>
                  <Typography level="title-sm">
                    {key === "inspector" && "감리자"}
                    {key === "constructionClient" && "공사발주자"}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name={key}
                    size="small"
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: 2,
                        height: 34,
                        width: 400,
                        "@media (min-width:1920px)": {
                          width: "63.5%",
                        },
                      },
                    }}
                    {...register(key)}
                    disabled={key === "buildingId"}
                  />
                </Grid>
              ) : //빌딩종류 시작 SELECTbOX
              key === "buildingType" ? (
                <Grid key={key} xs={6} md={6} lg={4} xl={4}>
                  <Typography level="title-sm">
                    {key === "buildingType" && "건물종류"}
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
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          size="large"
                          sx={{ height: 34, borderRadius: 2 }}
                        >
                          {/*SELECTBOX ITEM*/}
                          <MenuItem value={"업무시설"}>업무시설</MenuItem>
                          <MenuItem value={"산업시설"}>산업시설</MenuItem>
                          <MenuItem value={"숙박시설"}>숙박시설</MenuItem>
                          {/*SELECTBOX ITEM*/}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
              ) : //시간 데이터 사작 컬럼 및 준공일, 담보책임만료일 데이터 피커
              key === "buildingCompletionDate" ||
                key === "designPeriodStart" ||
                key === "constructionPeriodStart" ||
                key === "supervisionPeriodStart" ||
                key === "expirationDate" ? (
                <Grid
                  key={key}
                  xs={10}
                  md={6}
                  lg={4}
                  xl={
                    key === "designPeriodStart" ||
                    key === "constructionPeriodStart" ||
                    key === "supervisionPeriodStart"
                      ? 2
                      : 4
                  }
                  container
                >
                  <Grid>
                    <Typography level="title-sm" sx={{ marginBottom: -1 }}>
                      {/*KEY 조건 마다 제목은 달라진다*/}
                      {key === "buildingCompletionDate" && "준공일"}
                      {key === "expirationDate" && "하자담보만료일"}
                      {key === "designPeriodStart" && "설계기간"}
                      {key === "constructionPeriodStart" && "공사기간"}
                      {key === "supervisionPeriodStart" && "감리기간"}
                    </Typography>
                    <FormControl size="small" fullWidth sx={{ width: "100%" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name={key}
                          control={formControl}
                          //render를 사용해서 userForm 과 MUI를 연동한다.
                          render={({ field: { onChange, value } }) => (
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                slotProps={{
                                  //데이터피커의 크기를 조절한다
                                  textField: {
                                    size: "small",
                                  },
                                }}
                                // 데이터 피커의 데이트 텍스트를 보여주는 필드이다.
                                renderInput={(props) => (
                                  <TextField {...props} />
                                )}
                                onChange={(date) => {
                                  onChange(date);
                                }}
                                value={dayjs(value)}
                                format="YYYY-MM-DD"
                                sx={{
                                  //키의 조건마다 데이터피커의 가로길이가 달라진다.
                                  width:
                                    key === "designPeriodStart" ||
                                    key === "constructionPeriodStart" ||
                                    key === "supervisionPeriodStart"
                                      ? 370
                                      : 795,
                                }}
                              />
                            </DemoContainer>
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                </Grid>
              ) : // 시간데이트 끝나는 데이터피커
              key === "designPeriodEnd" ||
                key === "constructionPeriodEnd" ||
                key === "supervisionPeriodEnd" ? (
                <Grid key={key} xs={10} md={6} lg={4} xl={2}>
                  <Typography level="title-sm" sx={{ marginBottom: -1 }}>
                    {/*KEY 조건 마다 제목은 달라진다*/}
                    {key === "designPeriodEnd" && "설계기간만료일"}
                    {key === "constructionPeriodEnd" && "공사기간만료일"}
                    {key === "supervisionPeriodEnd" && "감리기간만료일"}
                  </Typography>
                  <FormControl size="small" fullWidth sx={{ width: "100%" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name={key}
                        control={formControl}
                        //render를 사용해서 userForm 과 MUI를 연동한다.
                        render={({ field: { onChange, value } }) => (
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              slotProps={{
                                //데이터피커의 크기를 조절한다
                                textField: {
                                  size: "small",
                                },
                              }}
                              // 데이터 피커의 데이트 텍스트를 보여주는 필드이다.
                              renderInput={(props) => <TextField {...props} />}
                              onChange={(e) => {
                                onChange(e);
                              }}
                              value={dayjs(value)}
                              format="YYYY-MM-DD"
                              sx={{ width: 375 }}
                            />
                          </DemoContainer>
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
              ) : (
                //일반 텍스트 인풋 창
                <Grid
                  key={key}
                  xs={10}
                  md={6}
                  lg={4}
                  xl={key === "bigo" ? 12 : 4}
                >
                  {/*일반적인 텍스트기능이므로  key 값의 조건마다 달라진다.*/}
                  <Typography level="title-sm">
                    {key === "buildingId" && "건물ID"}
                    {key === "buildingNumber" && "건물번호"}
                    {key === "buildingName" && "건물이름"}
                    {key === "buildingCompletionDate" && "준공일"}
                    {key === "buildingOwner" && "소유자"}
                    {key === "postNumber" && "우편번호"}
                    {key === "buildingAddress" && "건물주소"}
                    {key === "buildingDetailAddress" && "건물주소상세"}
                    {key === "designer" && "설계자"}
                    {key === "constructionSupervisor" && "공사감독관"}
                    {key === "construct" && "시공자"}
                    {key === "totalConstructionCost" && "총공사비(백만원)"}
                    {key === "constructionName" && "공사명"}
                    {key === "bigo" && "비고"}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name={key}
                    size="small"
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: 2,
                        height: 38,
                        width: 400,
                        "@media (min-width:1920px)": {
                          width: "95%",
                        },
                      },
                    }}
                    {...register(key)}
                    disabled={key === "buildingId"}
                  />
                </Grid>
              )
            )}
          </Grid>
          {/* 가장 큰 그리드 end*/}
        </form>
        {/* 폼  end*/}
      </Fragment>
    </>
  );
}
