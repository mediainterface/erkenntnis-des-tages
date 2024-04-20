import { ROUTING_PATH } from '../constants/routing-path.constants'

export type RoutingPath = (typeof ROUTING_PATH)[keyof typeof ROUTING_PATH]

