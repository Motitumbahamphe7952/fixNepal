const { toFile } = require("@imagekit/nodejs");
const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: "private_puWMplLt6kAnIf4sxO3H8uiAoO8=",
});

module.exports.generateFileUrl = async (file,filename) => {
  try {
  

 const response = await client.files.upload({
    file:file,
    fileName:filename,
    folder:"complaint_images"
 })
  return response;

  } catch (error) {
    console.error("Error generating file URL:", error.message);
  }
};
