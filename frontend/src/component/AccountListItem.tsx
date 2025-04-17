import Account from '../types/Account';

interface AccountListItemProps {
  account: Account;
  isActive: boolean;
  onClick?: (account: Account) => void;
}

const AccountListItem = ({
  account,
  isActive,
  onClick,
}: AccountListItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.(account);
  };

  return (
    <li className="mb-1 mt-1">
      <button
        onClick={handleClick}
        id="accountList"
        className={`flex w-full items-center justify-between gap-4 rounded-xl text-left text-white no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-white/20'}`}
      >
        <div className="m-2 flex min-h-[3em] w-full items-center justify-between">
          <div className="mr-3 flex flex-col overflow-hidden whitespace-nowrap">
            {account.Url && <span>{account.Url}</span>}
            <span className="text-xs text-gray-400">{account.Email}</span>
          </div>
          <span className="text-[#eeb004]">{account.Favorite && '★'}</span>
        </div>
      </button>
    </li>
  );
};

export default AccountListItem;
