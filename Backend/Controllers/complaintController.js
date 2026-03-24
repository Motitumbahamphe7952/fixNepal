const { generateFileUrl } = require("../Config/imagekitConfig");
const complaintModel = require("../Models/complainModel");
const { v4: uuid } = require("uuid");
const departmentModel = require("../Models/departmentModel");

module.exports.createComplaint = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req?.userId;
    const image = req.file;

    const { title, description, category, longitude, latitude } = req.body;

    if (!title || !category || !longitude || !latitude || !description) {
      return res
        .status(400)
        .json({ message: "Title, category, description, and location are required" });
    }
    const buffer = Buffer.from(image.buffer);
    const base64ImageFile = buffer.toString("base64");
    const fileUrl = await generateFileUrl(base64ImageFile, `${uuid()}`);

    const newComplaint = await complaintModel.create({
      title,
      description,
      category,

      location: {
        type: "Point",
        coordinates: [longitude, latitude], // [lng, lat]
      },

      imageUrl: fileUrl.url,
      reportedBy: userId,
    })
    const department = await departmentModel.findOne({
      categories: { $in: [category] }
    }).populate("complaints");

   if(!department){
    return res.status(404).json({ message: "No department found for this category" });
   }
    newComplaint.department = department._id;
   await newComplaint.save();
   await department.complaints.push(newComplaint._id);
   await department.save();
   const complaints = await complaintModel.findOne({_id:newComplaint._id}).populate("department")
    res.status(201).json({
      message: "Complaint created successfully",
      complaint: complaints,
      department: department.name
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await complaintModel
      .find()
      .populate("reportedBy", "name email phone");

    res.status(200).json({ complaints: complaints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getMyComplaints = async (req, res) => {
  try {
    const userId = req?.userId;
    const complaints = await complaintModel.find({ reportedBy: userId });
    res.status(200).json({ complaints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getComplaintById = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const complaint = await complaintModel
      .findById(complaintId)
      .populate("reportedBy", "name email phone");
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json({ complaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateComplaintStatus = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { status } = req.body;
    const complaint = await complaintModel.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    complaint.status = status;
    await complaint.save();
    res
      .status(200)
      .json({ message: "Complaint status updated successfully", complaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteComplaint = async (req, res) => {
  try {
    const complaintId = req.params.id;

    const complaint = await complaintModel.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    if (complaint.reportedBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this complaint" });
    }
    await complaintModel.findByIdAndDelete(complaintId);
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.toogleVote = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const userId = req.userId;
    const complaint = await complaintModel.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    const hasVoted = complaint.votes.includes(userId);
    if (hasVoted) {
      complaint.votes.pull(userId);
    } else {
      complaint.votes.push(userId);
    }
    complaint.voteCount = complaint.votes.length;
    await complaint.save();

    res
      .status(200)
      .json({
        message: hasVoted ? "Vote removed" : "Vote added",
        voteCount: complaint.voteCount,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
