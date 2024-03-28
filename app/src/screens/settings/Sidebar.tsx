import { Box, Divider, Stack, Text } from "@chakra-ui/react"
import ActionbarOpacity from "components/ActionbarOpacity"
import ExtensionLabel from "components/ExtensionLabel"
import SidebarIcons from "components/SidebarIcons"
import SidebarOpacity from "components/SidebarOpacity"

const Sidebar = () => {
  return (
    <Box>
      <Text fontSize="3xl">Sidebar</Text>
      <Divider mb={4} />
      <Stack gap={3} mr={5} mb={4}>
        <ExtensionLabel />
        <SidebarIcons />
        <ActionbarOpacity />
        <SidebarOpacity />
      </Stack>
    </Box>
  )
}

export default Sidebar
