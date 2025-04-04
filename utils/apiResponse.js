exports.sendSuccess = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
      success: true,
      message,
      data
    });
  };
  
  exports.sendError = (res, statusCode, message, error = null) => {
    res.status(statusCode).json({
      success: false,
      message,
      error: error?.message || error
    });
  };