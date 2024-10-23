import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Input,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useFileStore from '../../../hooks/useFileStore';

const FileUploadModal: React.FC = () => {
  const { uploadExcel } = useFileStore();

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await uploadExcel(selectedFile);
      setSelectedFile(null);
      setOpen(false);
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef?.current?.click();
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        endIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            height: 'auto',
            maxHeight: '95%',
            width: '95%',
          },
        }}
      >
        <DialogTitle>Upload Excel File</DialogTitle>

        <Divider />
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <input
              ref={fileInputRef}
              accept=".xlsx, .xls"
              id="upload-file-input"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="upload-file-input">
              <Input
                sx={{ width: '100%' }}
                onClick={handleClick}
                readOnly
                value={selectedFile ? selectedFile.name : ''}
                placeholder="Select File"
              />
            </label>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary" variant="contained">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileUploadModal;
