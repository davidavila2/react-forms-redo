import PropTypes from 'prop-types';

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../todo';
import { useState } from 'react';

function ListView(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (
    index: number
  ) => {
    setSelectedIndex(index);
  };

  if (!props.items.length) {
    return <Typography sx={{ mt: 4, mb: 2 }} variant="h2" component="div">Items</Typography>;
  } else {
    return (
      <>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
            Items
          </Typography>
          <List>
            {
              props.items.map((item: Todo, index: number) => (
                <ListItem
                  sx={{
                    ":active": {
                      border: 'action.active'
                    },
                    ":hover": {
                      boxShadow: 6,
                    }
                  }}
                  key={item.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => props.delete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  selected={selectedIndex === index}
                  onClick={() => {
                    handleListItemClick(index)
                    props.selectItem(item)
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    secondary={item.description}
                  />
                </ListItem>
              ))
            }
            </List>
        </Box>
      </>
    );
  }
}

interface Props {
  items: Todo[],
  selectItem: (item: Todo) => void
  delete: (id: number) => void
}

ListView.propTypes = {
  items: PropTypes.array,
  selectItem: PropTypes.func,
  delete: PropTypes.func
};

export default ListView;
