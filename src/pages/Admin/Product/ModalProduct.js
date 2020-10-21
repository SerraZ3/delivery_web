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
import showProduct from '../../../services/showProduct';
import TextFieldDesable from '../../../components/TextFieldDesable';
import {formatMoney} from '../../../helpers';

function ModalProduct({open, handleClose, data = null, update}) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    const getProduct = async () => {
      try {
        console.log(data);
        let response = await showProduct(data.id);
        console.log(response);

        setProduct(response);
      } catch (error) {
        setError('Erro ao carregar pedido, tente novamente!');
      }
    };
    if (data) if (open && !product) getProduct();
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Modal
      open={open}
      onClose={() => {
        setProduct(null);
        handleClose();
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div
        style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}}
        className={classes.paper}>
        {product ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Imagem do produto
                </Typography>
                <GridList className={classes.gridList} cols={2.5}>
                  {product.images.map((image, idx) => (
                    <GridListTile key={image.id}>
                      <img src={image.url} alt={product.name} />
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
                  ))}
                </GridList>
              </Grid>
              <Grid item xs={6}>
                <TextFieldDesable
                  multiline
                  label="Descrição"
                  value={product.description}
                />
                <TextFieldDesable
                  label="Preço"
                  value={`R$${formatMoney(product.price)}`}
                />
              </Grid>
              <Grid item xs={6}>
                {product.productCategories ? (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      Categoria(s)
                    </Typography>
                    {Object.keys(product.productCategories).map((val) => (
                      <Chip
                        avatar={
                          product.productCategories[val].images.length > 0 ? (
                            <Avatar
                              alt={product.productCategories[val].name}
                              src={product.productCategories[val].images[0].url}
                            />
                          ) : (
                            <Avatar>
                              {product.productCategories[val].name[0]}
                            </Avatar>
                          )
                        }
                        color="primary"
                        label={product.productCategories[val].name}
                        // onDelete={handleDelete}
                      />
                    ))}
                  </>
                ) : null}
              </Grid>
            </Grid>
            <CloseButton setProduct={setProduct} handleClose={handleClose} />
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
                  setProduct={setProduct}
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

export default ModalProduct;

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '60vw',
    height: '80vh',
    backgroundColor: theme.palette.background.paper,
    bproduct: `2px solid ${process.env.REACT_APP_PRIMARY_COLOR}`,
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

const CloseButton = ({setProduct, handleClose}) => (
  <Button
    variant="outlined"
    color="primary"
    onClick={() => {
      setProduct(null);
      handleClose();
    }}
    style={{position: 'absolute', right: 50, bottom: 30}}>
    Fechar
  </Button>
);
