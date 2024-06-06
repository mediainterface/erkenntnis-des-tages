import { Typography } from 'antd'
import { format } from 'date-fns/format'
import { FC } from 'react'

type DateProps = {
  date: Date | undefined
}
export const DateFormat: FC<DateProps> = ({ date }) => {
  if (!date) return
  const formattedDate = format(date, 'dd.MM.yyyy - HH:MM:ss')
  return <Typography style={{ marginRight: '10px' }}>{formattedDate}</Typography>
}
