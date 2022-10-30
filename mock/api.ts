import MockKit from '@hocgin/mock-kit';

export default {
  'GET /api/worked': MockKit.success({
    name: '@cname()',
  }),
  'GET /api/ssr': (req: any, res: any) => {
    return res.json(MockKit.success('ssr'));
  },
};
