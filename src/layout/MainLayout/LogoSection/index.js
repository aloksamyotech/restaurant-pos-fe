import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import { MENU_OPEN } from 'store/actions';
import { getApi } from 'core/apis/apiClient.js';
import { getUserInfoFromToken } from 'core/apis/common';
import { useState } from 'react';
import { useEffect } from 'react';
import { urls } from 'core/constant/urls';
import demoImage from '../../../assets/images/Dummy_Image.png'

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  const [rowData, setrowdata] = useState({});
  const UserInfo = getUserInfoFromToken();
  const fetchuserData = async () => {
    const id = UserInfo?.id;

    const response = await getApi(urls?.employee?.getbyid.replace(':id', id));
    const user = response.data;
    const formattedData = {

      image: user?.companyLogo,

    };
    setrowdata(formattedData);
  };

  useEffect(() => {
    fetchuserData();
  }, []);
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
      
      <img src={rowData?.image ? `${urls?.item?.image}${rowData?.image}` : "/fallback.png"} alt='Logo Loading' width={50} height ={50} style={{ marginLeft: "15px" }}></img>
      
    </ButtonBase>
  );
};

export default LogoSection;
