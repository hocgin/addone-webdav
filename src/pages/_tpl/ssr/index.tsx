import React from 'react';
import demoService from '@/services/demo';

const Index = ({ data }: any) => {
  return <div>Hi {data}</div>;
};

Index.getInitialProps = (async ({
  store,
  isServer,
  history,
  match,
  route,
}: any) => {
  let data = await demoService.ssr({});
  return Promise.resolve({ data });
}) as any;

export default Index;
