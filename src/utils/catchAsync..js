// const catchAsync = (fn) => {
//     return (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             next(new AppError(errors));
//         } else {
//             try {
//                 fn(req, res, next).catch((err) => {
//                     next(err);
//                 });
//             } catch (error) {
//                 next(error);
//             }
//         }
//     };
// };

// module.exports = {
//     catchAsync
// }