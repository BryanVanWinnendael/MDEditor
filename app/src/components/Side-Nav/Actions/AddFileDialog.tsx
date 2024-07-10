import { useWorkspace } from "contexts/WorkspaceContext";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Input,
  Text,
} from "@chakra-ui/react";
import { utils } from "utils/index";
import useColors from "hooks/useColors";

const AddFileDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { activeFolder, makeNewFile } = useWorkspace();
  const {
    getBackgroundColor,
    getAccentColor,
  } = useColors();
  
  const cancelRef = useRef();
  const [fileName, setFileName] = useState<string>("");
  const [inValidName, setInValidName] = useState<boolean>(false);

  const bg_color = getBackgroundColor();
  const accent_color = getAccentColor();

  const handleCreateFile = async () => {
    if (fileName === "") {
      setInValidName(true);
      return;
    }
    const folderPath = activeFolder || "";
    const filename = fileName + ".noted";
    const res = await makeNewFile(filename, folderPath);
    if (!res) {
      setInValidName(true);
      return;
    }
    setFileName("");
    onClose();
  };
  return (
    <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
        isOpen={isOpen}
      >
        <AlertDialogOverlay />
        <AlertDialogContent
          bg={bg_color}
          color={utils.getTextColor(bg_color)}
          shadow="md"
        >
          <AlertDialogBody>
            <Input
              value={fileName}
              onChange={(e) => {
                setInValidName(false);
                setFileName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateFile();
                }
              }}
              isInvalid={inValidName}
              focusBorderColor={inValidName ? "red.300" : accent_color}
              errorBorderColor="red.300"
              placeholder="Choose a file name"
            />
            {inValidName && (
              <Text mt={1} color="red.200">
                Name is already in use or in invalid
              </Text>
            )}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
  )
}

export default AddFileDialog