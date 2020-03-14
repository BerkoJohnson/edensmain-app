const Candidate = require("../models/Candidate");
const ErrorResponse = require("../utils/errorResponse");

// Get Candidates
exports.fetchCandidates = async (req, res, next) => {
  try {
    const candidates = await User.find().populate([
      {
        path: "student",
        select: "name room student photo _id"
      },
      {
        path: "position",
        select: "title cast_type _id"
      }
    ]);
    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates
    });
  } catch (error) {
    return next(new ErrorResponse(`Fetching candidates failed`, 400));
  }
};

// Get Candidate
exports.fetchCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id).populate([
      {
        path: "student",
        select: "name room student photo _id"
      },
      {
        path: "position",
        select: "title cast_type _id"
      }
    ]);
    if (!candidate) {
      return next(new ErrorResponse(`Candidate not found`, 404));
    }

    res.status(200).json({
      success: true,
      data: {
        _id: candidate._id,
        email: candidate.email,
        image: candidate.photo.toString("base64")
      }
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
};

// Create Candidate
exports.createCandidate = async (req, res, next) => {
  try {
    const { student, nickname, position } = req.body;
    const img = req.file.buffer.toString("base64");
    const candidate = new Candidate({ student, nickname, position, photo: img });

    const candidateSaved = await candidate.save();

    if (!candidateSaved) {
      return next(new ErrorResponse(`Candidate creation failed`, 400));
    }

    res.status(201).json({
      success: true,
      data: candidateSaved
    });
  } catch (error) {
    return next(new ErrorResponse(`Candidate creation failed`, 400));
  }
};

// Update Candidate
exports.updateCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!candidate) {
      return next(new ErrorResponse(`Candidate not found`, 40));
    }
    res.status(200).json({
      success: true,
      data: candidate
    });
  } catch (error) {
    next(error);
  }
};

// Delete Candidate
exports.deleteCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return next(new ErrorResponse(`Candidate not found`, 404));
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(new ErrorResponse(`Delete Candidate ${req.params.id} failed`, 400));
  }
};


// Update Candidate's Photo
exports.updatePhoto = async (req, res, next) => {
  try {
    // No image file submitted
    if (!req.file) {
      return next(new ErrorResponse("Please select an image", 400));
    }

    const imgBuffer = req.file.buffer.toString("base64");

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { photo: imgBuffer },
      {
        new: true,
        runValidators: true
      }
    );
    if (!user) {
      return next(new ErrorResponse(`Candidate not found`, 404));
    }
    res.status(200).json({
      success: true,
      data: candidate
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};
