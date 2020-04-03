export const todayUser = day => {
  if (day === 1) {
    return [1, 6];
  } else if (day === 2) {
    return [2, 7];
  } else if (day === 3) {
    return [3, 8];
  } else if (day === 4) {
    return [4, 9];
  } else if (day === 5) {
    return [5, 0];
  } else {
    return null;
  }
};

export const todaySet = day => {
  if (day === 1) {
    return "월";
  } else if (day === 2) {
    return "화";
  } else if (day === 3) {
    return "수";
  } else if (day === 4) {
    return "목";
  } else if (day === 5) {
    return "금";
  } else if (day === 6) {
    return "토";
  } else {
    return "일";
  }
};
