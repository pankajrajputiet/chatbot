import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import TableMessage from "./TableMessage";

export default function ChatMessage({ message, onOptionClick }) {
  const isUser = message.role === "user";

  return (
    <Box
      sx={{
        maxWidth: "85%",
        alignSelf: isUser ? "flex-end" : "flex-start",
        mb: 1.5
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 1.5,
          borderRadius: 2,
          bgcolor: isUser ? "primary.main" : "grey.200",
          color: isUser ? "primary.contrastText" : "text.primary"
        }}
      >
        {/* TEXT */}
        {message.type !== "table" && message.content && (
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {message.content}
          </Typography>
        )}

        {/* TABLE */}
        {message.type === "table" && (
          <TableMessage message={message} />
        )}

        {/* OPTIONS */}
        {message.options && (
          <Stack
            direction="row"
            spacing={1}
            mt={1}
            flexWrap="wrap"
          >
            {message.options.map((opt, i) => (
              <Button
                key={i}
                size="small"
                variant="outlined"
                onClick={() => onOptionClick(opt)}
                sx={{
                  textTransform: "none",
                  bgcolor: "white"
                }}
              >
                {opt}
              </Button>
            ))}
          </Stack>
        )}
      </Paper>
    </Box>
  );
}
