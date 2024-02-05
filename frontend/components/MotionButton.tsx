import { motion } from "framer-motion";
import { Button } from "./ui/button";

// Enhance the Button component with motion capabilities using framer-motion
// This allows the Button component to accept animation props and animate accordingly
const MotionButton = motion(Button);

export default MotionButton;
