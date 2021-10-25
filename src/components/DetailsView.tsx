import { Todo } from '../todo';

import PropTypes from 'prop-types';
import {
  Typography,
  Divider,
  Stack,
  Button,
  TextField
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

function DetailsView(props: Props) {
  const { handleSubmit, setValue, register } = useForm<formValues>();

  const onSubmit: SubmitHandler<formValues> = (item: Todo) => {
    if (props.item.id) {
      const updatedItem = Object.assign(props.item, item);
      props.update(updatedItem);
    } else {
      props.add(item);
    }
  }

  if (props.item?.id) {
    setValue('name', props.item.name);
    setValue('description', props.item.description);
  }

  return (
    <>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
      {props.item.id ? `Editing: ${props.item.name}` : 'Select a Item'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Stack divider={<Divider orientation="vertical" flexItem />} spacing={2}>
          <TextField
            variant="outlined"
            {...register('name', { required: true })}
            name="name"
            type="text"
          />

          <TextField
            variant="outlined"
            {...register('description', { required: true })}
            name="description"
            type="text"
          />

          <Button color="success" variant="outlined" type="submit">{props.item.id ? 'Update': 'Create'}</Button>
          <Button color="error" variant="outlined" type="reset" onClick={() => props.resetItem()}>Cancel</Button>
        </Stack>
      </form>
    </>
  )
}

interface Props {
  item: Todo,
  add: (item: Todo) => Promise<void>,
  update: (item: Todo) => Promise<void>,
  resetItem: () => void
}

type formValues = {
  id: number,
  name: string
  description: string
}

DetailsView.propTypes = {
  item: PropTypes.object,
  resetItem: PropTypes.func,
  update: PropTypes.func,
  add: PropTypes.func,
};

export default DetailsView;
