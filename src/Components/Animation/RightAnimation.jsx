/* eslint-disable react/prop-types */

import { motion } from 'framer-motion';

const RightAnimation = ({children}) => {
     return (
          <motion.div 
          initial= {{x: 1000}}
          animate= {{x: 0}}
          exit={{opacity:0}}
          transition={{duration:3}}
          >
           {children}    
          </motion.div>
     );
};

export default RightAnimation;