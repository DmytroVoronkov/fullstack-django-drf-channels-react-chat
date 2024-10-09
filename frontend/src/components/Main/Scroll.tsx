import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";

type ScrollProps = {
  children: ReactNode;
};

const ScrollbarContainer = styled(Box)(() => ({
  height: `calc(100vh - 190px)`,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "4px",
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  "&::-webkit-scrollbar-track": {
    // backgroundColor: "#f0f0f0",
  },
  "&::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
  },
}));

const Scroll: React.FC<ScrollProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, children]);

  return <ScrollbarContainer ref={scrollRef}>{children}</ScrollbarContainer>;
};

export default Scroll;
