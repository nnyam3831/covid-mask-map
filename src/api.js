import Axios from "axios";

export const getMaskInfo = async (lat = 37.4737991, lng = 127.1077285, bound = 2000) => {
  try {
    const data = await Axios.get(
      `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${bound}`
    );
    return [data, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
};
