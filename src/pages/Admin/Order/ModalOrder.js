import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Modal,
  Grid,
  CircularProgress,
  Typography,
  List,
  ListItem,
  Button,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
} from '@material-ui/core';
import showOrder from '../../../services/showOrder';
import getOrderStatus from '../../../services/getOrderStatus';
import setOrderStatusAPI from '../../../services/setOrderStatus';
import TextFieldDesable from '../../../components/TextFieldDesable';
import {formatMoney, getPaymentType} from '../../../helpers';
import {GridContainer} from './styles';
import {AlbumOutlined as AlbumOutlinedIcon} from '@material-ui/icons';
import {Autocomplete} from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '80vw',
    height: '80vh',
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${process.env.REACT_APP_PRIMARY_COLOR}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CloseButton = ({setOrder, handleClose}) => (
  <Button
    variant="outlined"
    color="primary"
    onClick={() => {
      setOrder(null);
      handleClose();
    }}
    style={{position: 'absolute', right: 50, bottom: 30}}>
    Fechar
  </Button>
);

function ModalOrder({open, handleClose, data, update}) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const [selectOpen, setSelectOpen] = useState(false);
  const loadOrderStatus = selectOpen && orderStatus.length === 0;

  const classes = useStyles();
  // Pega pedido quando o data é atualizado
  useEffect(() => {
    if (data) getOrder();
  }, [data]);
  // Pega pedido quando o data é atualizado
  useEffect(() => {
    let active = true;

    if (!loadOrderStatus) {
      return undefined;
    }

    (async () => {
      let response = await getOrderStatus();
      if (active) {
        setOrderStatus(response.data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadOrderStatus]);

  useEffect(() => {
    if (!selectOpen) {
      setOrderStatus([]);
    }
  }, [selectOpen]);

  const sendOrderStatus = async () => {
    let response = await setOrderStatusAPI(data.order_id, selectedOrderStatus);
    setOrder(response);
    setSelectedOrderStatus(null);
  };

  const getOrder = async () => {
    try {
      let response = await showOrder(data.order_id);
      setOrder(response);
    } catch (error) {
      setError('Erro ao carregar pedido, tente novamente!');
    }
  };

  useEffect(() => {
    if (open && !order) getOrder();
  }, [open]);
  return (
    <Modal
      open={open}
      onClose={() => {
        setOrder(null);
        handleClose();
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div
        style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}}
        className={classes.paper}>
        {order ? (
          <>
            <Grid container spacing={2}>
              <GridContainer item xs={6}>
                <h2>Cliente</h2>
              </GridContainer>
              <GridContainer
                item
                xs={6}
                direction="row"
                justify="flex-start"
                alignItems="center">
                <h2>Pedido</h2>
                {update ? (
                  <>
                    <Grid item>
                      <AlbumOutlinedIcon
                        style={{color: order.orderStatus.color}}
                      />
                    </Grid>
                    <Autocomplete
                      id="country-select-demo"
                      style={{width: 300}}
                      onChange={(e, val) =>
                        setSelectedOrderStatus(val ? val.id : null)
                      }
                      open={selectOpen}
                      onOpen={() => {
                        setSelectOpen(true);
                      }}
                      onClose={() => {
                        setSelectOpen(false);
                      }}
                      options={orderStatus}
                      autoHighlight
                      getOptionLabel={(option) => option.name}
                      getOptionSelected={(option, value) =>
                        option.name === value.name
                      }
                      loading={loadOrderStatus}
                      loadingText="Carregando..."
                      renderOption={(option) => (
                        <React.Fragment>
                          <AlbumOutlinedIcon style={{color: option.color}} />
                          {option.name}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Escolha o status do pedido"
                          variant="outlined"
                        />
                      )}
                    />
                    {selectedOrderStatus ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => sendOrderStatus()}
                        style={{marginLeft: 10}}>
                        Salvar
                      </Button>
                    ) : null}
                  </>
                ) : (
                  <>
                    <Grid item>
                      <AlbumOutlinedIcon
                        style={{color: order.orderStatus.color}}
                      />
                    </Grid>
                    <Grid item>{order.orderStatus.name}</Grid>
                  </>
                )}
              </GridContainer>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Informações do cliente
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" gutterBottom>
                  Pagamento por meio de:{' '}
                  <b>{getPaymentType(order.type_payment)}</b>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  style={{textAlign: 'right'}}
                  variant="subtitle1"
                  gutterBottom>
                  Valor total:
                  <b>
                    {order.total.total
                      ? ` R$ ${formatMoney(order.total.total)}`
                      : ' R$ 00,00'}
                  </b>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextFieldDesable label="Nome" value={order.user.person.name} />
              </Grid>
              <Grid item xs={3}>
                <TextFieldDesable label="E-mail" value={order.user.email} />
              </Grid>
              <Grid item xs={3}>
                <h3>Produtos</h3>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  style={{textAlign: 'right'}}>
                  Troco:
                  <b>
                    {order.products.length > 0
                      ? ` R$ ${formatMoney(
                          order.amount_will_paid - order.total.total,
                        )}`
                      : ' R$ 00,00'}
                  </b>
                </Typography>
              </Grid>
              <GridContainer
                style={{margin: 0, padding: 0}}
                item
                xs={6}
                spacing={2}>
                <Grid item xs={6}>
                  <TextFieldDesable
                    label="Aniversário"
                    value={order.user.person.date_birth}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldDesable label="CPF" value={order.user.person.cpf} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Endereço
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextFieldDesable
                    label="Rua - Nº"
                    value={`${order.address.street} - ${order.address.number}`}
                  />
                </Grid>
              </GridContainer>
              <Grid item xs={6}>
                <List
                  dense
                  style={{
                    maxHeight: '160px',
                    height: '160px',
                    overflowY: 'scroll',
                    width: '100%',
                  }}>
                  {order.products.length > 0 ? (
                    order.products.map((value, idx) => (
                      <ListItem key={value.id} divider>
                        <ListItemAvatar>
                          <Avatar alt={value.name} src={value.images[0].url} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={value.name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary">
                                {`Total: ${value.quantity}`}
                              </Typography>
                              {`- Preço: R$ ${formatMoney(
                                value.price,
                              )} - total: R$ ${formatMoney(
                                value.price * value.quantity,
                              )}`}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    ))
                  ) : (
                    <h3>Nenhum produto encontrato. Recarregue a página</h3>
                  )}
                </List>
              </Grid>

              <Grid item xs={3}>
                <TextFieldDesable
                  label="Bairro"
                  value={order.address.neightborhood}
                />
              </Grid>
              <Grid item xs={3}>
                <TextFieldDesable label="CEP" value={order.address.zip_code} />
              </Grid>

              <Grid item xs={3}>
                <TextFieldDesable
                  label="Tipo de entraga"
                  value={`${order.deliveryType.name} - valor: R$ ${formatMoney(
                    order.deliveryType.price,
                  )}`}
                />
              </Grid>
            </Grid>
            <CloseButton setOrder={setOrder} handleClose={handleClose} />
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
                <CloseButton setOrder={setOrder} handleClose={handleClose} />
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

export default ModalOrder;
