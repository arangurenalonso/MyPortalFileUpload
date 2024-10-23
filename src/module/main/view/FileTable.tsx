import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import { FileType } from '../../../store/file/file.initial-state';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

interface Props {
  data?: FileType[] | null;
}

const FileTable: React.FC<Props> = ({ data = [] }) => {
  const handleDownload = (url: string, fileName: string) => {
    // Create an invisible link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.style.display = 'none';

    // Add the link to the body and trigger the click
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link element
    document.body.removeChild(link);
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
      <Table stickyHeader aria-label="file table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell>Size (bytes)</TableCell>
            <TableCell>Extension</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(data || []).length > 0 ? (
            (data || []).map((file, index) => (
              <TableRow key={index}>
                <TableCell>{file.fileName}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.fileExtension}</TableCell>
                <TableCell>
                  <IconButton
                    size="large"
                    color="primary"
                    onClick={() =>
                      handleDownload(
                        file.url,
                        file.fileName + file.fileExtension
                      )
                    }
                  >
                    <CloudDownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="subtitle1">No items available</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default FileTable;
