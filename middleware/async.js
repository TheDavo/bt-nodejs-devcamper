/**
 The asyncHandler takes a function fn, then returns a function that takes in the (req,res,next) parameters.

 That last function calls fn with the parameters (req,res,next) and follows a .then/.catch promise pattern.
*/

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncHandler
