import moment from "moment";
let filesInServer = [];
const errorMessage = {
  message: "Suspicious file, it will be ignored.",
  status: "Forbidden",
  code: "403",
};
export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        return acceptFile(req, res);
      } catch {
        return res.status(500).json({
          message: "Make sure to send a file in the body of the request as form-data. key:'accept-file', Content-Type:'multipart/form-data'",
          status: "Internal server error",
          code: "500",
        });
      }
    case "DELETE":
      return deleteFiles(req, res);
    default:
      return res.status(404).json({ message: "Endpoint does not exists." });
  }
}

const acceptFile = ({ body }, res) => {
  filesInServer = filesInServer.filter((file) => {
    const actualdate = moment();
    console.log(actualdate);
    const difference = moment.duration(actualdate.diff(file.createdAt));
    const minutes = difference.get("minutes");
    return minutes < 60;
  });
  const fileparts = body.split(";");
  const filename = fileparts
    .find((part) => part.includes("filename"))
    .split("\r")[0]
    .trim();

  const DOSHeaderSign = ConvertStringToHex(
    body.substring(body.indexOf("PE"), 512)
  );
  let size = body.length / 1000;
  if (body.indexOf("MZ") === -1) {
    return res.status(403).json(errorMessage);
  }
  if (DOSHeaderSign.substring(0, 6) !== "504500") {
    return res.status(403).json(errorMessage);
  }
  size = Math.round(size);

  if (filesInServer.find((file) => file.filename === filename)) {
    return res.status(409).json({
      message: "The file already exists.",
      status: "Conflict",
      data: filesInServer.find((file) => file.filename === filename),
      code: "409",
    });
  }

  filesInServer.push({
    filename,
    size: size + " KB",
    status: "saved",
    createdAt: moment(),
  });
  console.log(filesInServer);
  return res.status(200).json({
    data: {
      filename,
      size: size + " KB",
      status: "saved",
    },
    status: "OK",
    code: "200",
  });
};

const deleteFiles = (req, res) => {
  filesInServer = [];
  return res.status(200).json({ message: "Files deleted Succesfully" });
};
function ConvertStringToHex(str) {
  var arr = [];
  for (var i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i).toString(16).slice(-4);
  }
  return arr.join("");
}
