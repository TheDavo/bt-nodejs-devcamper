/**
 The asyncHandler takes a function fn, then returns a function that takes in the (req,res,next) parameters.

 That last function calls fn with the parameters (req,res,next) and follows a .then/.catch promise pattern.

 How this works with Express is that in a get/post/put/delete, etc request, a function is called. 
 That functions is fn in this case. That fn takes in the req, res, next parameters that Express needs to execute to properly execute the fn call.

 The curry function chain is asyncHandler(fn)(req,res,next)
                                              ^ Express call
*/

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
