import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";
import Select from "@mui/material/Select";
import * as S from "../../styles/page-style/login-style";
import { useEffect } from "react";

//로그인 폼 사용
export default function SelectBox(props) {
  //(loginContainer => loginPresenter = > selectBox)
  const { setSelectedSystem, selectedSystem, isNotPublic } = props;

  const handleChange = (event) => {
    setSelectedSystem(event.target.value);
  };

  useEffect(() => {});

  return (
    <Box
      sx={{
        width: 350,
      }}
    >
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel sx={S.MuiSelectInputLabel}>시스템설정</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSystem}
          label="Age"
          onChange={handleChange}
          sx={S.MuiSelect}
        >
          <MenuItem value={"BEMS"}>BEMS</MenuItem>
          <MenuItem value={"BAS"}>BAS</MenuItem>
          {isNotPublic === "로그인" ? null : (
            <MenuItem value={"공통"}>공통</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
