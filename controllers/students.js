const Student = require("../models/Student");
const ErrorResponse = require("../utils/errorResponse");

// Get Students
exports.fetchStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      count: students.length,
      data: students.map(s => {
        return {
          name: s.name,
          room: s.room,
          studentID: s.studentID,
          photo: s.photo.toString("base64")
        };
      })
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};

// Get Student
exports.fetchStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return next(new ErrorResponse(`User not found`, 404));
    }
    res.status(200).json({
      success: true,
      data: {
        name: student.name,
        room: student.room,
        studentID: student.studentID,
        photo: student.photo.toString("base64")
      }
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
};

// Create Student
exports.createStudent = async (req, res, next) => {
  try {
    const { name, room, password } = req.body;
    const student = new Position({ name, room });

    student.hashPassword(password);

    const savedStudent = await student.save();

    if (!savedStudent) {
      return next(new ErrorResponse(`Student creation failed`, 400));
    }

    res.status(201).json({
      success: true,
      data: savedStudent
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};

// Update Student
exports.updateStudent = async (req, res, next) => {
  try {
    const { name, room } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, room },
      {
        new: true,
        runValidators: true
      }
    );
    if (!student) {
      return next(new ErrorResponse(`Student not found`, 40));
    }
    res.status(200).json({
      success: true,
      data: {
        name: student.name,
        room: student.room,
        studentID: student.studentID,
        photo: student.photo.toString("base64")
      }
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};

// Delete Student
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return next(new ErrorResponse(`Student not found`, 404));
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};

// Reset Student password
exports.resetPassword = async (req, res, next) => {
  try {
    const { studentID, password } = req.body;
    let student = await Student.findOne({ studentID });
    student.hashPassword(password);
    student.save();
    if (!student) {
      return next(new ErrorResponse(`Student not found`, 404));
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};

// Log in Student
exports.login = async (req, res, next) => {
  try {
    const { studentID, password } = req.body;
    const student = await User.findOne({ studentID });

    // If student exists with email  provided
    if (!student) {
      return next(new ErrorResponse(`Invalid Credentials`, 401));
    }

    // Check if passwords match
    if (!student.verifyPassword(password)) {
      return next(new ErrorResponse(`Invalid Credentials`, 401));
    }

    res.status(200).json({
      success: true
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};

// Update Student's Photo
exports.updatePhoto = async (req, res, next) => {
  try {
    // No image file submitted
    if (!req.file) {
      return next(new ErrorResponse("Please select an image", 400));
    }

    const imgBuffer = req.file.buffer.toString("base64");
    // console.log();

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { photo: imgBuffer },
      {
        new: true,
        runValidators: true
      }
    );
    if (!student) {
      return next(new ErrorResponse(`Student not found`, 404));
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};

// import students
exports.importStudent = async (req, res, next) => {
  try {
    // No image file submitted
    if (!req.file) {
      return next(new ErrorResponse("Please select an csv file", 400));
    }

    // Process csv data here..
    // Process csv data here..
    // Process csv data here..
    // Process csv data here..
    // Process csv data here..
    // Process csv data here..
    // Process csv data here..

    res.status(200).json({
      success: true
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};


// generate students's password, hash and save
// also create a new table for geting studentID and password
exports.generatePasswords = async (req, res, next) => {
  try {
    // Get all students.length and use a password gen module generate 6-letter passwords
    // save in passwords_tables
    if (!req.file) {
      return next(new ErrorResponse("Please select an csv file", 400));
    }

    // Process csv data here..
    // Process csv data here..
    // Process csv data here..
    // Process csv data here..
    // Process csv data here..
    // Process csv data here..
    // Process csv data here..

    res.status(200).json({
      success: true
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};