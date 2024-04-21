export const ROUTING_PATH = Object.freeze({
  home: '/',
  login: '/login',
  createPoll: '/createPoll',
  completeProfile: '/complete-profile',
  vote: '/:pollId/vote',
} as const)

