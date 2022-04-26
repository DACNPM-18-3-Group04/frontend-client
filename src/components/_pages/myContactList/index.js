import { Card, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { handleGetListContact } from '../../../helpers/api/contact';
import { handleFailure } from '../../../helpers/api/_helpers';
import Loader from '../../_common/loader';
import ContactItem from './contactItem';

export default function MyContactList() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setLoading(true);
      //fetching
      handleGetListContact()
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          setContacts(res.data.data.contacts);
        })
        .catch((err) => {
          handleFailure(err);
        });
    }
    return () => {
      setContacts([]);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth='lg'>
      <Card variant='outlined'>
        <Stack mx={2} spacing={2} my={2}>
          <Box>
            <Typography variant='h5'>Các tin nhắn liên hệ</Typography>
          </Box>
          {contacts && contacts.length > 0 ? (
            contacts.map((c, i) => <ContactItem key={i} contact={c} />)
          ) : (
            <Box>
              <Typography>Không có thông tin liên hệ</Typography>
            </Box>
          )}
        </Stack>
      </Card>
    </Container>
  );
}
