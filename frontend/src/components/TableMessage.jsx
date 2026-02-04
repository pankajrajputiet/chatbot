import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

export default function TableMessage({ message }) {
  const { columns = [], rows = [] } = message;

  if (!columns.length || !rows.length) {
    return null;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 1,
        maxWidth: "100%",
        overflowX: "auto"
      }}
    >
      <Table size="small" aria-label="chat table">
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell
                key={i}
                sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
