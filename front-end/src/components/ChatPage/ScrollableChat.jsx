import { Avatar,Tooltip } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "./ChatLogic";
import { ChatState } from "./ChatProvider";

export default function ScrollableChat ({ message }){
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {message &&
        message.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(message, m, i, user._id) ||
              isLastMessage(message, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr="1"
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: m.sender._id === user._id ? "#0889ff" : "#D3D3D3",
                marginLeft: isSameSenderMargin(message, m, i, user._id),
                marginTop: isSameUser(message, m, i, user._id) ? "3px" : "10px",
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                color: m.sender._id === user._id ? "#ffffff" : "#252323",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}
