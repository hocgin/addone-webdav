import React from 'react';
import { Container } from '@/components';

const Index: React.FC<{
  /**
   * 设置样式名
   */
  className?: string;
}> = (props, ref) => {
  return <Container> 你好 </Container>;
};

export default Index;
