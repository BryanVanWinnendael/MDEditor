import { AddIcon } from "@chakra-ui/icons"
import {
  Flex,
} from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import { AnimatePresence, motion } from "framer-motion"
import useColors from "hooks/useColors"
import { utils } from "utils"

const Index = () => {
  const { getAccentColor, getSecondaryBackgroundColor, getMutedTextColor } = useColors()
  const { activeTab, tabs, addTab, handleChangeTab, removeTab } = useWorkspace()

  const accent_color = getAccentColor()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const muted_text_color = getMutedTextColor()

  const getFileName = (path: string) => {
    const full_name = path.split("\\")
    const name = full_name[full_name.length - 1].split(".noted")[0]
    return name
  }

  return (
    <Flex w="full" alignItems="center">
      <AnimatePresence mode="popLayout">
        {Object.keys(tabs).map((key, index) => (
          <motion.div
            className="tab-motion"
            layout
            animate={{ scale: 1 }}
            key={index}
          >
            <Flex
              cursor="pointer"
              justifyContent="space-between"
              minW={0}
              overflow="hidden"
              w={index === activeTab ? "15rem" : "10rem"}
              ml={2}
              px={2}
              borderRadius={4}
              h={7}
              opacity={10}
              bg={
                index === activeTab
                  ? utils.getTransparent(100, bg_color)
                  : utils.getTransparent(0.5, bg_color)
              }
              color={
                index === activeTab
                  ? accent_color
                  : utils.getTransparent(0.5, utils.getTextColor(bg_color))
              }
            >
              <Flex
                onClick={() => handleChangeTab(index)}
                w="full"
                alignItems="center"
              >
                {getFileName(tabs[parseInt(key)].path)}
              </Flex>
              {activeTab === index && Object.keys(tabs).length > 1 && (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  onClick={() => removeTab(index)}
                  fill={accent_color}
                  _hover={{ fill: accent_color }}
                  cursor="pointer"
                  w="fit-content"
                  h="full"
                >
                  <svg
                    width="1rem"
                    height="1rem"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                    enable-background="new 0 0 52 52"
                  >
                    <path d="M31,25.4L44,12.3c0.6-0.6,0.6-1.5,0-2.1L42,8.1c-0.6-0.6-1.5-0.6-2.1,0L26.8,21.2c-0.4,0.4-1,0.4-1.4,0L12.3,8c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l13.1,13.1c0.4,0.4,0.4,1,0,1.4L8,39.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0L25.3,31c0.4-0.4,1-0.4,1.4,0l13.1,13.1c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1L31,26.8C30.6,26.4,30.6,25.8,31,25.4z" />
                  </svg>
                </Flex>
              )}
            </Flex>
          </motion.div>
        ))}
      </AnimatePresence>
      {
        Object.keys(tabs).length > 0 && 
        <AddIcon
          ml={2}
          onClick={addTab}
          cursor="pointer"
          color={muted_text_color}
          _hover={{ color: accent_color }}
        />
      }
      
    </Flex>
  )
}

export default Index
