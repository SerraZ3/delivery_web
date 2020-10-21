import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Modal,
  Grid,
  CircularProgress,
  Typography,
  Button,
  Avatar,
  GridList,
  GridListTile,
  GridListTileBar,
  Chip,
} from '@material-ui/core';
import showCategory from '../../../services/showProductCategories';
import TextFieldDesable from '../../../components/TextFieldDesable';
import {formatMoney} from '../../../helpers';
import Image from 'material-ui-image';

function ModalCategory({open, handleClose, data = null, update}) {
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    const getCategory = async () => {
      try {
        console.log(data);
        let response = await showCategory(data.id);
        console.log(response);

        setCategory(response);
      } catch (error) {
        setError('Erro ao carregar pedido, tente novamente!');
      }
    };
    if (data) if (open && !category) getCategory();
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Modal
      open={open}
      onClose={() => {
        setCategory(null);
        handleClose();
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div
        style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}}
        className={classes.paper}>
        {category ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {category.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Imagem da categoria
                </Typography>
                <GridList className={classes.gridList} cols={2.5}>
                  {category.images.length > 0 ? (
                    category.images.map((image, idx) => (
                      <GridListTile key={image.id}>
                        <Image
                          src={image.url ? image.url : ''}
                          alt={category.name}
                          onClick={() => console.log('onClick')}
                          aspectRatio={16 / 9}
                        />
                        <GridListTileBar
                          title={idx === 0 ? 'Imagem principal' : ''}
                          classes={{
                            root: classes.titleBar,
                            title: classes.title,
                          }}
                          // actionIcon={
                          //   <IconButton aria-label={`star `}>
                          //     <StarBorderIcon className={classes.title} />
                          //   </IconButton>
                          // }
                        />
                      </GridListTile>
                    ))
                  ) : (
                    <GridListTile>
                      <Image
                        src="http://lorempixels.com/1600/900/nature/"
                        alt="Nenhuma imagem cadastrada"
                        onClick={() => console.log('onClick')}
                        aspectRatio={16 / 9}
                      />
                      <GridListTileBar
                        title="Nenhuma imagem cadastrada"
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                        // actionIcon={
                        //   <IconButton aria-label={`star `}>
                        //     <StarBorderIcon className={classes.title} />
                        //   </IconButton>
                        // }
                      />
                    </GridListTile>
                  )}
                </GridList>
              </Grid>
              <Grid item xs={6}>
                <TextFieldDesable
                  multiline
                  label="Descrição"
                  value={category.description}
                />
              </Grid>
              <Grid item xs={6}>
                {category.products.length > 0 ? (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      Produto(s)
                    </Typography>
                    {category.products.map((product) => (
                      <Chip
                        avatar={
                          product.images.length > 0 ? (
                            <Avatar
                              alt={product.name}
                              src={product.images[0].url}
                            />
                          ) : (
                            <Avatar>{product.name[0]}</Avatar>
                          )
                        }
                        color="primary"
                        label={product.name}
                        // onDelete={handleDelete}
                      />
                    ))}
                  </>
                ) : null}
              </Grid>
            </Grid>
            <CloseButton setCategory={setCategory} handleClose={handleClose} />
          </>
        ) : (
          <Grid
            style={{height: '100%'}}
            container
            justify="center"
            alignItems="center">
            {error ? (
              <>
                <h3>{error}</h3>
                <CloseButton
                  setCategory={setCategory}
                  handleClose={handleClose}
                />
              </>
            ) : (
              <CircularProgress />
            )}
          </Grid>
        )}
      </div>
    </Modal>
  );
}

export default ModalCategory;

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '60vw',
    height: '80vh',
    backgroundColor: theme.palette.background.paper,
    bcategory: `2px solid ${process.env.REACT_APP_PRIMARY_COLOR}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
}));

const CloseButton = ({setCategory, handleClose}) => (
  <Button
    variant="outlined"
    color="primary"
    onClick={() => {
      setCategory(null);
      handleClose();
    }}
    style={{position: 'absolute', right: 50, bottom: 30}}>
    Fechar
  </Button>
);
