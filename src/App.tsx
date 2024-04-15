import styled from "styled-components";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled(motion.div)`
  background: linear-gradient(135deg, #e09, #d0e);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding-bottom: 300px;
  padding-top: 100px;// extra paddings
`;

const Box1 = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: tomato;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;// box css

const Box2 = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;// box css


const Box3 = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;// box css

const Box4 = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;// box css

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;// drag constrain box

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;// circle css

const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { type: "spring", delay: 0.5 } },
};// using variants

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.5,
      bounce: 1.0,
      delayChildren: 1,// delay childern
      staggerChildren: 0.5,// delay childrens in orderly
    },
  },
};// box variants

const circleVariants = {
  start: {
    opacity: 0,
    y: 100,// x and y are only framer motion properties.
  },
  end: {
    opacity: 1,
    y: 0,
  },
};// circle variants

const boxvarients2 = {
  hover: { scale: 1, rotateZ: 90 },
  click: { scale: 1, borderRadius: "50%", transition: { duration: 0.1} },
  drag: { backgroundColor: "rgb(31, 230, 114)", transition: { duration: 0.1 } },
};// box varaient 02

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);// scroll x rotate animation.
  const gradient = useTransform(
    x,
    [-800, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );// bg color gradient
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);// scroll y scale

  return (
    <Wrapper style={{ background: gradient }}>
      <Box1
        transition={{ type: "spring", delay: 1 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateZ: 360 }}
      />

      <Box2 variants={myVars} initial="start" animate="end" />

      <Box3 variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box3>
      
      <BiggerBox ref={biggerBoxRef}>
        <Box4 
          drag
          dragSnapToOrigin
          dragElastic={0.5}
          dragConstraints={biggerBoxRef}
          variants={boxvarients2}
          whileHover="hover"
          whileTap="click"
          whileDrag="drag"
        />
        <Box4
          drag
          variants={boxvarients2}
          whileHover="hover"
          whileDrag="drag"
          whileTap="click"
          dragConstraints={biggerBoxRef}
      />
      </BiggerBox>

      <Box4 style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin />

    </Wrapper>
  );
}

export default App
