import React, { useState, useEffect } from 'react';
import { Flex, Progress } from "@radix-ui/themes";

interface CountdownProgressProps {
  durationSeconds: number; 
  onFinish?: () => void;
}

const CountdownProgress: React.FC<CountdownProgressProps> = ({ durationSeconds , onFinish}) => {
  const [value, setValue] = useState(durationSeconds);

  useEffect(() => {
  let endTime = localStorage.getItem("countdownEnd");
  if (!endTime) {
    const target = Date.now() + durationSeconds * 1000;
    localStorage.setItem("countdownEnd", target.toString());
    endTime = target.toString();
  }

  const interval = setInterval(() => {
    const remaining = Math.max(0, Math.ceil((parseInt(endTime!) - Date.now()) / 1000));
    setValue(remaining);
    if (remaining <= 0) {
      clearInterval(interval);
      onFinish?.();
      localStorage.removeItem("countdownEnd");
    }
  }, 1000);

  return () => clearInterval(interval);
  }, [durationSeconds, onFinish]);

  return (
    <Flex direction="column" style={{ width: '100%' }}>
      <Progress 
        variant="soft"
        size="3"
        value={value} 
        max={durationSeconds} 
        style={{ width: '100%', transition: 'width 1s linear' }} 
      />
    </Flex>
  );
};

export default CountdownProgress;
