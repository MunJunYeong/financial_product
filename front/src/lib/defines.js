// 사용자에게 보여지는 error message
const errMsgUnauthorized = "토큰이 만료 되었습니다. 다시 로그인 해주세요.";
export const errMsgInternal =
  "네트워크 오류가 발생 했습니다. 잠시 후 다시 시도해주세요.";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// error
export const ViewErrUnauthorized = new Error(errMsgUnauthorized);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// string const
export const openDialog = "OPEN_DIALOG";
export const closeDialog = "CLOSE_DIALOG";
