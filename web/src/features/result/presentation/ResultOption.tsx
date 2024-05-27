import { Badge, Flex, Form, Tooltip } from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import Typography from 'antd/es/typography/Typography'
import React from 'react'
import { PollResult } from '../domain/type/poll-result.type'
import { useProfilesStore } from "@/stores/useProfilesStore.tsx";

export const ResultOption: React.FC<PollResult> = (props) => {
  const { content, user_id, votes } = props
  const { profiles, getProfile } = useProfilesStore((state) => ({
    profiles: state.profiles,
    getProfile: state.getProfile,
  }));

  const profile = profiles[user_id] || null;
  console.log(profile);
  React.useEffect(() => {
    if (!profile) {
      getProfile(user_id);
    }
  }, [user_id, profile, getProfile]);

  return (
    <Form.Item style={{ transformOrigin: 'left', transform: `scale(1.${votes})` }}>
      <Flex justify="flex-start" align="center" gap={'middle'}>
        <Tooltip title={profile?.username}>
          <Badge count={votes}>
            <Avatar size="large" src={profile?.avatar_url} />
          </Badge>
        </Tooltip>
        <Typography>{content}</Typography>
      </Flex>
    </Form.Item>
  )
}
