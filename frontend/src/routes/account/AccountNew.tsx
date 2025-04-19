import AccountForm from '../../component/AccountForm';
import Account from '../../types/Account';
import accountService from '../../services/accountService';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../hooks/SnackBarProvider';

const AccountNew = () => {
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();

  const addAccount = (account: Account) => {
    accountService.addAccount(account).then(() => {
      navigate('/accounts');
    });

    showSnackbar({
      message: 'Account created',
      type: 'success',
    });
  };

  return (
    <AccountForm
      mode="add"
      onSubmit={addAccount}
      onCancel={() => navigate('/accounts')}
    />
  );
};

export default AccountNew;
