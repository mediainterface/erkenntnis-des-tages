import { Flex, Typography } from "antd";
import Avatar from 'antd/es/avatar/avatar'
import React from 'react'
import { ROUTING_PATH } from "@/features/router/domain/constants/routing-path.constants.ts";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore.tsx";

export const AppHeader: React.FC = () => {
  const navigate = useNavigate()
  const userProfile = useUserStore((state) => state.userProfile)

  return (
    <Flex justify={'space-between'}>
      <Typography.Title>EDT </Typography.Title>
      <Avatar onClick={()=> navigate(ROUTING_PATH.userProfile)} size="large" src={userProfile?.avatar_url} />
    </Flex>
  )
}

