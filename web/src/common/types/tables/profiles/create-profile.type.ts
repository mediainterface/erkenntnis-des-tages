import { Profile } from './profile.type'

export type CreateProfile = Omit<Profile, 'order_id'>

