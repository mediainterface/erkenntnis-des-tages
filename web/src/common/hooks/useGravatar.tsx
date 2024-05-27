import gravatar from 'gravatar'

type GetGravatarUrlFunction = (email: string) => string

type UseGravatarReturn = [GetGravatarUrlFunction]

export const useGravatar = (): UseGravatarReturn => {
  const getGravatarUrl: GetGravatarUrlFunction = (email) => {
    return gravatar.url(email, { d: 'retro' }, true)
  }

  return [getGravatarUrl]
}

