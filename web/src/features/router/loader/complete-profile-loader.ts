import { getUserProfile } from '@/features/auth/helper/profile.helper'
import { redirect } from 'react-router-dom'
import { ROUTING_PATH } from '../domain/constants/routing-path.constants'

export const completeProfileLoader = async () => {
  const profile = await getUserProfile()
  return profile ? redirect(ROUTING_PATH.home) : null
}

