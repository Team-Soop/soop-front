
export const REGEX = {
  username: {
      regexr: /^[A-Za-z0-9]{5,10}$/,
      text: "영문자, 숫자 5 ~ 10자리 형식이어야 합니다"
  },
  password: {
      regexr: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/,
      text: "하나의 영문자, 숫자, 특수문자를 포함한 8 ~ 128자리 형식이어야 합니다"
  },
  name: {
      regexr: /^[가-힇]{2,}$/,
      text: "한글문자 형식이어야 합니다"
  },
  email: {
      regexr: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
      text: "이메일 형식이어야 합니다"
  },

};
