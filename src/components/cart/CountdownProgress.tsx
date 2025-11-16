import React, { useState, useEffect } from 'react';
import { Flex, Progress } from "@radix-ui/themes";

interface CountdownProgressProps {
  durationSeconds: number; 
  onFinish?: () => void;
}

const CountdownProgress: React.FC<CountdownProgressProps> = ({ durationSeconds , onFinish}) => {
  const [value, setValue] = useState(durationSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          onFinish?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [durationSeconds]);

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
