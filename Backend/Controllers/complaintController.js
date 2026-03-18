const { generateFileUrl } = require("../Config/imagekitConfig");
const complaintModel = require("../Models/complainModel");

module.exports.createComplaint = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req?.userId;
    const image = req.file;

    const { title, description, category,longitude,latitude} = req.body;

    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "Title, category, and location are required" });
    }

    const fileUrl = await generateFileUrl(image.buffer);
    console.log("fileUrl", fileUrl.url);

    const newComplaint = await complaintModel.create({
      title,
      description,
      category,

      location: {
        type: "Point",
        coordinates:[longitude, latitude], // [lng, lat]
      },

      imageUrl: fileUrl.url,
      reportedBy: userId,
    });

    res
      .status(201)
      .json({
        message: "Complaint created successfully",
        complaint: newComplaint,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await complaintModel.find().populate("reportedBy", "name email phone");
   
    res.status(200).json({ complaints:complaints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.getMyComplaints = async (req,res)=>{
  try {
    const userId = req?.userId;
    const complaints = await complaintModel.find({ reportedBy: userId });
    res.status(200).json({ complaints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports.getComplaintById = async (req,res)=>{
  try {
    const complaintId = req.params.id;
    const complaint = await complaintModel.findById(complaintId).populate("reportedBy", "name email phone");
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json({ complaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.updateComplaintStatus = async (req,res)=>{
  try {
    const complaintId = req.params.id;
    const { status } = req.body;
    const complaint = await complaintModel.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    complaint.status = status;
    await complaint.save();
    res.status(200).json({ message: "Complaint status updated successfully", complaint });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}