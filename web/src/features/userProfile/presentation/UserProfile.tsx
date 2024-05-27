import React, { useEffect } from "react";
import { Card, Flex } from "antd";
import Avatar from "antd/es/avatar/avatar";
import { useUserStore } from "@/stores/useUserStore.tsx";

export const UserProfile:React.FC = () => {
  const userProfile = useUserStore(state => state.userProfile);

  if (!userProfile) return null

  return (
      <Flex style={{height:'100vh', justifyContent: 'center', alignItems: 'start', paddingTop: '5rem' }}>
        <Card title={userProfile?.username} style={{ width: 300 }}>
          <Avatar  size="large" src={userProfile?.avatar_url} />
            <p>Card content</p>
          </Card>
      </Flex>

)
}