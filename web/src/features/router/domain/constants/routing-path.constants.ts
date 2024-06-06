export const ROUTING_PATH = Object.freeze({
  home: '/',
  login: '/login',
  createPoll: '/create-poll',
  completeProfile: '/complete-profile',
  vote: '/:pollId/vote',
  result: '/:pollId/result',
  pollsOverview: '/polls-overview',
} as const)
