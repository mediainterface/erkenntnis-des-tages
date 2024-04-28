export const ROUTING_PATH = Object.freeze({
  home: '/',
  login: '/login',
  createPoll: '/createPoll',
  completeProfile: '/complete-profile',
  vote: '/:pollId/vote',
  result: '/:pollId/result',
} as const)

