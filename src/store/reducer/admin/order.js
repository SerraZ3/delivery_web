const INITIAL_STATE = [
  {
    order_status_name: '',
    order_status_slug: '',
    order_status_color: '',
    user_email: '',
    user_active: null,
    user_name: '',
    user_date_birth: '',
    deliveryman_name: '',
    address_street: '',
    address_neightborhood: '',
    address_zip_code: '',
    address_number: '',
    city_name: '',
    state_name: '',
    country_name_br: '',
    country_name_en: '',
    order_id: 0,
    order_created_at: '',
    order_updated_at: '',
  },
];

function order(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'NEW_ORDER_LIST':
      return action.new_order;

    default:
      return state;
  }
}

export default order;
