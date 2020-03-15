const mongoose = require("mongoose");

const Position = require("../models/Position");
const Election = require("../models/Election");
const ErrorResponse = require("../utils/errorResponse");

// Get Positions
exports.fetchPositions = async (req, res, next) => {
  try {
    const election = req.query.election;
    const positions = await Position.find()
      .where("election", mongoose.Types.ObjectId(election))
      .populate({
        path: "elections candidates",
        select: "title  school student nickname photo _id",
        populate: {
          path: "student",
          select: "name gender _id"
        }
      });
    res.status(200).json({
      success: true,
      count: positions.length,
      data: positions
    });
  } catch (error) {
    return next(error);
  }
};

// Get Position
exports.fetchPosition = async (req, res, next) => {
  try {
    const position = await Position.findById(req.params.id);
    if (!position) {
      return next(new ErrorResponse(`Position not found`, 404));
    }
    res.status(200).json({
      success: true,
      data: position
    });
  } catch (error) {
    return next(error);
  }
};

// Create Position
exports.createPosition = async (req, res, next) => {
  try {
    const { title, cast_type, election } = req.body;

    // Find election
    const elec = await Election.findById(mongoose.Types.ObjectId(election));

    const position = new Position({ title, cast_type, election });
    const savedPosition = await position.save();

    // Update elec with new position
    elec.positions.push(savedPosition._id);
    await elec.save();

    res.status(201).json({
      success: true,
      data: savedPosition
    });
  } catch (error) {
    return next(error);
  }
};

// Update Position
exports.updatePosition = async (req, res, next) => {
  try {
    const position = await Position.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!position) {
      return next(new ErrorResponse(`Position not found`, 40));
    }
    res.status(200).json({
      success: true,
      data: position
    });
  } catch (error) {
    next(error);
  }
};

// Delete Position
exports.deletePosition = async (req, res, next) => {
  try {
    const position = await Position.findByIdAndDelete(req.params.id);
    if (!position) {
      return next(new ErrorResponse(`Position not found`, 404));
    }

    // Remove position if attached to an election

    // Find election
    const elec = await Election.findById(position.election);

    // If election does not exist
    if (!elec) {
      return next(new ErrorResponse(`Election ID is invalid`, 400));
    }

    // Update elec with position id to remove it
    const index = elec.positions.findIndex(pos => pos === position._id);
    elec.positions.splice(index, 1);
    await elec.save();

    res.status(200).json({
      success: true,
      data: position
    });
  } catch (error) {
    next(error);
  }
};
