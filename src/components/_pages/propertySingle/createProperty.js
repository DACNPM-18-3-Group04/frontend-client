import {
  FormControl,
  FormControlLabel,
  InputLabel,
  RadioGroup,
  TextField,
  FormLabel,
  Radio,
  MenuItem,
  Select,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { toast } from 'react-toastify';
import PropertyAPI from '../../../helpers/api/property';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/user';

const useStyles = makeStyles({
  form: {
    padding: '20px',
    margin: '80px',
    border: 'solid 1px black',
    borderRadius: '8px',
    backgroundColor: 'white',
  },
  formElement: {
    margin: '10px 0px',
  },
});

export default function CreateProperty() {
  const user = useSelector(selectUser);
  const disctrict = [
    {
      id: 1,
      name: 'Quận 1',
    },
    {
      id: 2,
      name: 'Quận 2',
    },
    {
      id: 3,
      name: 'Quận 3',
    },
    {
      id: 4,
      name: 'Quận 4',
    },
    {
      id: 5,
      name: 'Quận 5',
    },
    {
      id: 6,
      name: 'Quận 6',
    },
  ];
  const classes = useStyles();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [price, setPrice] = useState(-1);
  const [type, setType] = useState('S');
  const [address, setAddress] = useState('');
  const [selectDistrict, setSelectDistrict] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const model = {
      title,
      description,
      area,
      price,
      type,
      district_id: selectDistrict,
      address,
      author_id: user.id,
    };

    PropertyAPI.createProperty(model)
      .then(() => {
        toast.success('Tạo tin thành công');
        history.push('/');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  if (user && user.isLogin) {
    return (
      <>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label='Tên'
            variant='outlined'
            required
            fullWidth
            className={classes.formElement}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label='Mô tả'
            variant='outlined'
            required
            fullWidth
            className={classes.formElement}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label='Diện tích'
            variant='outlined'
            type='number'
            required
            fullWidth
            className={classes.formElement}
            onChange={(e) => setArea(e.target.value)}
          />
          <TextField
            label='Giá'
            variant='outlined'
            type='number'
            required
            className={classes.formElement}
            onChange={(e) => setPrice(e.target.value)}
          />

          <FormControl fullWidth className={classes.formElement}>
            <FormLabel id='property-type'>Loại</FormLabel>
            <RadioGroup
              aria-labelledby='property-type'
              onChange={(e) => setType(e.target.value)}
            >
              <FormControlLabel
                value='L'
                control={<Radio />}
                label='Cho thuê'
              />
              <FormControlLabel value='S' control={<Radio />} label='Bán' />
            </RadioGroup>
          </FormControl>
          <TextField
            label='Địa chỉ'
            variant='outlined'
            required
            fullWidth
            className={classes.formElement}
            onChange={(e) => setAddress(e.target.value)}
          />
          <FormControl fullWidth className={classes.formElement}>
            <InputLabel id='property-disctrict'>Quận</InputLabel>
            <Select
              aria-labelledby='property-disctrict'
              label='Quận'
              value={selectDistrict}
              onChange={(e) => setSelectDistrict(e.target.value)}
            >
              {disctrict.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type='submit' variant='contained' color='primary'>
            Tạo
          </Button>
        </form>
      </>
    );
  } else {
    history.push('/');
    return <></>;
  }
}
