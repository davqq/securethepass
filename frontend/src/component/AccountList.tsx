import AccountListItem from './AccountListItem';
import Account from '../types/Account';
import AccountGroupLabel from './AccountGroupLabel';
import { useNavigate, useParams } from 'react-router-dom';

interface AccountListProps {
  groupedAccounts: { [key: string]: Account[] };
}

const AccountList = ({ groupedAccounts }: AccountListProps) => {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const handleClick = (account: Account) => {
    navigate(`/accounts/${account.Guid}`, {
      state: { accountId: account.Guid },
      replace: true,
    });
  };

  if (!groupedAccounts || Object.entries(groupedAccounts).length === 0) {
    return <p className="text-white">No accounts yet</p>;
  }

  return (
    <nav className="my-1 mr-1.5 flex-1 overflow-auto px-8 pt-4">
      {Object.entries(groupedAccounts).map(([groupLabel, accounts]) => (
        <li className="list-none" key={groupLabel}>
          <AccountGroupLabel label={groupLabel} />
          <ul>
            {accounts.map((account) => (
              <AccountListItem
                isActive={account.Guid === accountId}
                account={account}
                key={account.Guid}
                onClick={handleClick}
              />
            ))}
          </ul>
        </li>
      ))}
    </nav>
  );
};

export default AccountList;
