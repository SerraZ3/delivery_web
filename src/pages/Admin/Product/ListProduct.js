import React, {useState, forwardRef, createRef} from 'react';
import MaterialTable from 'material-table';
import {
  AlbumOutlined as AlbumOutlinedIcon,
  FilterList,
} from '@material-ui/icons';
import {Grid, TablePagination, Avatar} from '@material-ui/core';
import getProductsAPI from '../../../services/getProducts';
import getProductCategoriesAPI from '../../../services/getProductCategories';
import {convertDate, formatMoney} from '../../../helpers';
import ModalProduct from './ModalProduct';
import ModalCategory from './ModalCategory';

export default function ListProduct() {
  const [openProduct, setOpenProduct] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openProductUpdate, setOpenProductUpdate] = useState(false);
  const [openCategoryUpdate, setOpenCategoryUpdate] = useState(false);
  const [productShow, setProductShow] = useState(null);
  const [categoryShow, setCategoryShow] = useState(null);
  const tableProductRef = createRef();
  const tableCategoryRef = createRef();

  const handleClose = (category = false, update = false) => {
    category
      ? update
        ? setOpenCategoryUpdate(false)
        : setOpenCategory(false)
      : update
      ? setOpenProductUpdate(false)
      : setOpenProduct(false);
    tableProductRef.current.onQueryChange();
  };
  const handleOpen = (row, category = false, update = false) => {
    console.log(category);
    console.log(row);

    category ? setCategoryShow(row) : setProductShow(row);
    category
      ? update
        ? setOpenCategoryUpdate(true)
        : setOpenCategory(true)
      : update
      ? setOpenProductUpdate(true)
      : setOpenProduct(true);
  };

  const getProducts = async (query) => {
    let result = await getProductsAPI(
      query.page + 1,
      query.pageSize,
      query.search,
      query.orderDirection,
      query.orderBy ? query.orderBy.field : '',
    );
    return {
      data: result.data,
      page: result.pagination.page,
      totalCount: result.pagination.total,
    };
  };
  const getProductCategories = async (query) => {
    let result = await getProductCategoriesAPI(
      query.page + 1,
      query.pageSize,
      query.search,
      query.orderDirection,
      query.orderBy ? query.orderBy.field : '',
    );
    return {
      data: result.data,
      page: result.pagination.page,
      totalCount: result.pagination.total,
    };
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MaterialTable
          title="Meus Produtos"
          tableRef={tableProductRef}
          columns={columnsProductConfig}
          data={(query) =>
            new Promise(async (resolve, reject) => {
              getProducts(query).then((result) => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.totalCount,
                });
              });
            })
          }
          localization={locationConfig}
          onRowClick={(e, rowData) => handleOpen(rowData)}
          actions={[
            {
              icon: 'build_circle',
              tooltip: 'Alterar pedido',
              onClick: (e, rowData) => handleOpen(rowData, false, true),
            },
            {
              icon: 'add_box',
              tooltip: 'Adicionar produto',
              isFreeAction: true,
              onClick: () => alert('aaa'),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            detailPanelColumnAlignment: 'right',
            sorting: true,
            pageSizeOptions: [5, 10, 30, 50, 100],
          }}
        />
        <ModalProduct
          open={openProduct}
          handleClose={handleClose}
          data={productShow}
        />
        {/* <ModalProduct
        open={openProductUpdate}
        handleClose={() => handleClose(false, true)}
        data={productShow}
        update
      /> */}
      </Grid>
      {/* <Grid item xs={5}>
        <MaterialTable
          title="Categorias"
          tableRef={tableCategoryRef}
          columns={columnsCategoryConfig}
          data={(query) =>
            new Promise(async (resolve, reject) => {
              getProductCategories(query).then((result) => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.totalCount,
                });
              });
            })
          }
          localization={locationConfig}
          onRowClick={(e, rowData) => handleOpen(rowData, true)}
          actions={[
            {
              icon: 'build_circle',
              tooltip: 'Alterar pedido',
              onClick: (e, rowData) => handleOpen(rowData, true, true),
            },
            {
              icon: 'add_box',
              tooltip: 'Adicionar categoria',
              isFreeAction: true,
              onClick: () => alert('aaa'),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            detailPanelColumnAlignment: 'right',
            sorting: true,
            pageSizeOptions: [5, 10, 30, 50, 100],
          }}
        />
        <ModalCategory
          open={openCategory}
          handleClose={() => handleClose(true)}
          data={categoryShow}
        />
        {/* <ModalCategory
        open={openCategoryUpdate}
        handleClose={() => handleClose(true,true)}
        data={categoryShow}
        update
      />
      </Grid> */}
    </Grid>
  );
}
const locationConfig = {
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
  header: {actions: 'Ações'},
};
const columnsProductConfig = [
  {
    title: 'ID',
    width: 80,
    field: 'id',
    type: 'numeric',
  },
  {
    title: 'Imagem Principal',
    width: 80,
    field: 'images',
    render: ({images, name}) => <Avatar alt={name} src={images[0].url} />,
  },
  {title: 'Nome', field: 'name'},
  {
    title: 'Preço',
    field: 'price',
    render: ({price}) => <div>{`R$ ${formatMoney(price)}`}</div>,
  },
];
const columnsCategoryConfig = [
  {
    title: 'Imagem Principal',
    width: 80,
    field: 'images',
    render: ({images, name}) =>
      images.length > 0 ? (
        <Avatar alt={name} src={images[0].url} />
      ) : (
        <Avatar>{name[0]}</Avatar>
      ),
  },
  {title: 'Nome', field: 'name'},
];
