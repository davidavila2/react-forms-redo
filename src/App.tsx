import { useEffect, useState } from 'react';

import ListView from './components/ListView';
import DetailsView from './components/DetailsView';
import AppToolbar from './components/AppToolbar';
import { BASEURL, emptyTodo, getUrlWithId, Todo } from './todo';
import { theme } from './theme';

import axios, { AxiosResponse } from 'axios';
import { Box, Grid, ThemeProvider } from '@mui/material';

function App() {
  const [selectedItem, setSelectedItem] = useState<Todo>(emptyTodo);
  const [items, setItems] = useState<Todo[]>([]);

  useEffect(() => {
    axios
    .get<Todo[]>(BASEURL)
    .then((res: AxiosResponse<Todo[]>) => {
      setItems(res.data);
    })
    .catch((error) => {
      console.error(error)
      alert(error);
    });
  }, []);

  const selectItem = (item: Todo) => {
    setSelectedItem(item);
  };

  const resetItem = () => {
    setSelectedItem(emptyTodo);
  };

  const addItem = async (item: Todo) => {
    if (!item) {
      alert('Please fill out form');
    } else {
      setSelectedItem(item);
      try {
        const newItem = (await axios.post<Todo>(BASEURL, item)).data;
        setItems((currentItems: Todo[]) => (currentItems = [...currentItems, newItem]));
      } catch (error) {
        console.error('ERROR from ADD Item In Parent', error);
      } finally {
        resetItem();
      }
    }
  };

  const updateItem = async (item: Todo) => {
    try {
      await axios.patch<Todo>(getUrlWithId(item.id), selectedItem);
      setItems(
        (currItems) =>
          (currItems = currItems.map((currItem) =>
            item.id === currItem.id ? { ...item } : currItem
          ))
      );
    } catch (error) {
      console.error('ERROR from Update Item in Parent', error);
    } finally {
      resetItem();
    }
  };

  const deleteItem = async (id: number) => {
    const config = {
      data: {
        id: selectedItem
      }
    }

    try {
      await axios.delete<Todo>(getUrlWithId(id), config);
      setItems(
        (prevItems: Todo[]) => (prevItems = prevItems.filter(
          (item) => item.id !== id)
        ));
    } catch (error) {
      console.error('ERROR from Delete Item in The Parent', error);
    } finally {
      resetItem();
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppToolbar />
        <Box sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            p: 2,
            m: 2,
        }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
                <ListView items={items} selectItem={selectItem} delete={deleteItem} />
            </Grid>
            <Grid item xs={6}>
              <DetailsView
                item={selectedItem}
                update={updateItem}
                resetItem={resetItem}
                add={addItem}
              />
            </Grid>
          </Grid>
          </Box>
        </ThemeProvider>
    </>
  )
}

export default App;
