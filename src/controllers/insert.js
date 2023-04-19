import { insertService ,createPricesAndAreas} from "../services/insert";
let insert = async (req, res) => {
  try {
    let response = await createPricesAndAreas();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + e,
    });
  }
};
let Bai1 = (data) => {
  //data = "sadf aas dafg dfdf"
  let words = data.split(" "); //["?","?","?","?"]
  let newWorks;
  let result = words.map((item) => {
    item = item.charAt(0).toUpperCase() + item.substr(1);

    return item;
  });

  return result.join(" ");
};
let Bai2 = (data) => {
  //data = "12:02am-12:30pm"
  let towData = data.split("-");
  let data1 = towData[0].split(":"); //["12","02am"]
  let data2 = towData[1].split(":"); //["12","03pm"]
  let check1 = data1[1].charAt(2);
  let check2 = data2[1].charAt(2);
  let result = "";
  console.log("check data", check1);

  if (
    (check1 === check2 && parseInt(data1[0]) < parseInt(data2[0])) ||
    (check1 === check2 &&
      parseInt(data1[0]) === parseInt(data2[0]) &&
      parseInt(data2[1].substr(0, 2)) > parseInt(data1[1].substr(0, 2)))
  ) {
    result = parseInt(
      parseInt(data2[0]) * 60 +
        parseInt(data2[1].substr(0, 2)) -
        (parseInt(data1[0]) * 60 + parseInt(data1[1].substr(0, 2)))
    );
  } else if (
    (check1 === check2 && parseInt(data1[0]) > parseInt(data2[0])) ||
    (check1 === check2 &&
      parseInt(data1[0]) === parseInt(data2[0]) &&
      parseInt(data2[1].substr(0, 2)) < parseInt(data1[1].substr(0, 2)))
  ) {
    result =
      parseInt(
        parseInt(data2[0]) * 60 + 24 * 60 + parseInt(data2[1].substr(0, 2))
      ) -
      (parseInt(data1[0]) * 60 + parseInt(data1[1].substr(0, 2)));
  } else {
    result =
      parseInt(
        parseInt(data2[0]) * 60 + 12 * 60 + parseInt(data2[1].substr(0, 2))
      ) -
      (parseInt(data1[0]) * 60 + parseInt(data1[1].substr(0, 2)));
  }
  console.log("check result", result);

  return result;
};
let Bai3 = (str) => {
  //data =
  let max = -Infinity;
  let maxIndex = -1;
  for (let i = 0; i < str.length; i++) {
    let num = Number(str[i]);
    if (num > max) {
      max = num;
      maxIndex = i;
    }
  }
  let arr = str.split("");
  let temp = arr[maxIndex]
  arr[maxIndex] = arr[maxIndex -1].toString();
  arr[maxIndex -1] = temp.toString();
  return arr.join("");
};
export { insert, Bai1, Bai2,Bai3 };
