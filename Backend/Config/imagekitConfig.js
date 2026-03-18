const { toFile } = require("@imagekit/nodejs");
const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: "private_puWMplLt6kAnIf4sxO3H8uiAoO8=",
});

module.exports.generateFileUrl = async (buffer) => {
  try {
   const url = await client.files.upload({
      file: await toFile(Buffer.from(buffer), "file"),
      fileName: `complaint_${new Date().toLocaleDateString("en-GB")}.jpg`,
      folder:"/complaints"
    });
    return url;

  } catch (error) {
    console.error("Error generating file URL:", error.message);
  }
};
