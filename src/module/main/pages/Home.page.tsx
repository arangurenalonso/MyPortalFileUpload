import { Box, Grid2 } from '@mui/material';
import FileTable from '../view/FileTable';
import useFileStore from '../../../hooks/useFileStore';
import FileUploadModal from '../view/FileUploadModal';
import TitleComponent from '../../../common/components/TitleComponent';

const HomePage = () => {
  const { files } = useFileStore();
  return (
    <Box
      sx={{
        maxWidth: 'md',
        margin: 'auto',
        pt: 5,
      }}
    >
      <Grid2 container spacing={3}>
        <Grid2 size={12}>
          <TitleComponent text="Document Management Portal" />
        </Grid2>
        <Grid2 size={12}>
          <Grid2 container>
            <Grid2 size={'grow'}></Grid2>
            <Grid2 size={'auto'}>
              <FileUploadModal />
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={12}>
          <FileTable data={files} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default HomePage;
