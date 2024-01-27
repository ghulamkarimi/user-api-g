import { body, validationResult } from "express-validator";


// @desc validation middleware for creating a new user
export const validateCreateUser = [
  // first name validation
  body("firstName")
    .isAlpha()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long and alphabetic"),

  // last name validation
  body("lastName")
    .isAlpha()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long and alphabetic"),

  // email validation
  body("email").isEmail().withMessage("Please provide a valid email"),


  body("password")
  .isLength({ min: 8 })
  .withMessage("Das Passwort muss mindestens 8 Zeichen lang sein")
  .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  .withMessage(
    "Password must contain at least one letter, one number, and one special character"
  ),

   // Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
