import { CardActions, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/slices/user';

export default function PropertyCardActions({
  //
  propertyId = null,
  author_id = -1,
}) {
  const user = useSelector(selectUser);
  const displayEdit =
    `${author_id}`.toUpperCase() === `${user.id}`.toUpperCase();
  return (
    <CardActions
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      {displayEdit && (
        <Paper>
          <IconButton component={Link} to={`/property/update/${propertyId}`}>
            <EditIcon />
          </IconButton>
        </Paper>
      )}
    </CardActions>
  );
}
