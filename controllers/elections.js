const Election = require("../models/Election");
const Settings = require("../models/Settings");
const ErrorResponse = require("../utils/errorResponse");

// Get Positions
exports.fetchElections = async (req, res, next) => {
  try {
    const election = await Election.find().populate({
      path: "positions",
      select: "title _id"
    });
    res.status(200).json({
      success: true,
      count: election.length,
      data: election
    });
  } catch (error) {
    return next(new ErrorResponse(`Fetching Elections failed`, 400));
  }
};

// Get Election
exports.fetchElection = async (req, res, next) => {
  try {
    const election = await Election.findById(req.params.id).populate({
      path: "positions",
      select: "title _id"
    });
    if (!election) {
      return next(new ErrorResponse(`Election not found`, 404));
    }
    res.status(200).json({
      success: true,
      data: election
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
};

// Create Election
exports.createElection = async (req, res, next) => {
  try {
    const { title, school, academicYear } = req.body;
    const election = new Election({ title, school, academicYear });
    const savedElection = await election.save();

    if (!savedElection) {
      return next(new ErrorResponse(`Election creation failed`, 400));
    }

    res.status(201).json({
      success: true,
      data: savedElection
    });
  } catch (error) {
    return next(new ErrorResponse(`Election creation failed`, 400));
  }
};

// Update Election
exports.updateElection = async (req, res, next) => {
  try {
    const election = await Election.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!election) {
      return next(new ErrorResponse(`Election not found`, 40));
    }
    res.status(200).json({
      success: true,
      data: election
    });
  } catch (error) {
    next(error);
  }
};

// Delete Election
exports.deleteElection = async (req, res, next) => {
  try {
    const election = await Election.findByIdAndDelete(req.params.id);
    if (!election) {
      return next(new ErrorResponse(`Election not found`, 404));
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(new ErrorResponse(`Delete election ${req.params.id} failed`, 400));
  }
};
