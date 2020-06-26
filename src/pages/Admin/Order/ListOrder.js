import React, {useState, useEffect, forwardRef} from 'react';
import MaterialTable from 'material-table';
import {
  AlbumOutlined as AlbumOutlinedIcon,
  FilterList,
} from '@material-ui/icons';
import {Grid, TablePagination} from '@material-ui/core';
import apiGetOrders from '../../../services/getOrders';
import {convertDate} from '../../../helpers';
import ModalOrder from './ModalOrder';

export default function MaterialTableDemo() {
  const [open, setOpen] = useState(false);
  const [orderShow, setOrderShow] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (row) => {
    setOrderShow(row);
    setOpen(true);
  };
  useEffect(() => {}, []);
  const columnsConfig = [
    {
      title: 'ID',
      width: 80,
      field: 'order_id',
      type: 'numeric',
    },
    {title: 'E-mail', field: 'user_email'},
    {title: 'Nome', field: 'user_name'},
    {
      title: 'Status',
      field: 'order_status_slug',
      render: ({order_status_color, order_status_name}) => (
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}>
          <Grid item>
            <AlbumOutlinedIcon style={{color: order_status_color}} />
          </Grid>
          <Grid item>{order_status_name}</Grid>
        </Grid>
      ),
    },
    {title: 'Criado em', field: 'order_created_at'},
  ];

  const getOrders = async (query) => {
    let result = await apiGetOrders(
      query.page + 1,
      query.pageSize,
      query.search,
      query.orderDirection,
      query.orderBy ? query.orderBy.field : '',
    );
    result.data.map((value) => {
      value.order_created_at = convertDate(value.order_created_at);
    });

    return {
      data: result.data,
      page: result.page,
      totalCount: result.total,
    };
  };

  return (
    <>
      <MaterialTable
        title="Meus Pedidos"
        columns={columnsConfig}
        data={(query) =>
          new Promise(async (resolve, reject) => {
            getOrders(query).then((result) => {
              resolve({
                data: result.data,
                page: result.page - 1,
                totalCount: result.totalCount,
              });
            });
          })
        }
        icons={{
          Filter: forwardRef((props, ref) => (
            <FilterList style={{fontSize: 12}} {...props} ref={ref} />
          )),
        }}
        localization={{
          body: {
            deleteTooltip: 'Deletar',
            addTooltip: 'Adicionar',
            editTooltip: 'Editar',
            editRow: {
              deleteText: 'Deseja realmente deletar esse item?',
              cancelTooltip: 'Cancelar',
              saveTooltip: 'Confirmar',
            },
          },
          pagination: {
            labelRowsSelect: 'Linhas',
            firstTooltip: 'Primeira página',
            firstAriaLabel: 'Primeira página',
            previousAriaLabel: 'Página anterior',
            previousTooltip: 'Página anterior',
            nextAriaLabel: 'Próxima página',
            nextTooltip: 'Próxima página',
            lastAriaLabel: 'Última página',
            lastTooltip: 'Última página',
            labelDisplayedRows: '{from}-{to} de {count}',
            rowsPerPageOptions: [5, 10, 20, 30],
          },
          toolbar: {
            searchTooltip: 'Pesquisar',
            searchAriaLabel: 'Pesquisar',
            searchPlaceholder: 'Pesquisar',
          },
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                // setState((prevState) => {
                //   const data = [...prevState.data];
                //   data.push(newData);
                //   return {...prevState, data};
                // });
              }, 600);
            }),
        }}
        onRowClick={(event, rowData) => handleOpen(rowData)}
        actions={[
          {
            icon: 'visibility',
            tooltip: 'Visualizar pedido',
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: 'build_circle',
            tooltip: 'Alterar pedido',
            onClick: (event, rowData) =>
              alert('You want to delete ' + rowData.name),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          detailPanelColumnAlignment: 'right',
          sorting: true,
        }}
        components={{
          Pagination: (props) => (
            <TablePagination
              {...props}
              rowsPerPageOptions={[5, 10, 30, 50, 100]}
            />
          ),
        }}
      />
      <ModalOrder open={open} handleClose={handleClose} data={orderShow} />
    </>
  );
}
