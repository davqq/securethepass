import { useEffect, useRef, useState } from 'react';
import Account from '../../types/Account';
import Navbar from '../../component/Navbar';
import AccountList from '../../component/AccountList';
import Layout from '../../layouts/Layout';
import accountService from '../../services/accountService';
import { Outlet, useMatch, useSearchParams } from 'react-router-dom';
import formatUpdatedAt from '../../utils/formattedDate';
import { useMediaQuery } from 'react-responsive';
import PopUp from '../../component/PopUp';
import { useAuth } from '../../hooks/AuthProvider';

const AccountsOverview = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery] = useSearchParams();
  const controllerRef = useRef<AbortController | null>();
  const isDetailPage = useMatch({
    path: '/accounts/:id',
    end: false,
  });
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    accountService
      .getAccounts(searchQuery.get('q') || '', controller)
      .then((data) => {
        setAccounts(data);
        setLoading(false);
      });
  }, [searchQuery]);

  const sortOrder = [
    'Today',
    'Past 7 days',
    ...Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString('en', { month: 'long' })
    ),
  ];

  const groupedAccounts = new Map<string, Account[]>();

  accounts.forEach((account) => {
    const groupLabel = formatUpdatedAt(account.UpdatedAt.toString());

    if (!groupedAccounts.has(groupLabel)) {
      groupedAccounts.set(groupLabel, []);
    }

    groupedAccounts.get(groupLabel)!.push(account);
  });

  // Sortierte Gruppen in ein normales Objekt umwandeln
  const sortedGroups: { [key: string]: Account[] } = Object.fromEntries(
    [...groupedAccounts.entries()].sort(([a], [b]) => {
      const isYearA = /^\d{4}$/.test(a);
      const isYearB = /^\d{4}$/.test(b);

      if (isYearA && isYearB) return parseInt(b) - parseInt(a); // Neueste Jahre zuerst
      if (isYearA) return 1; // Jahre nach den anderen Gruppen einordnen
      if (isYearB) return -1;

      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    })
  );

  return (
    <Layout>
      {(!isDetailPage || !isMobile) && (
        <div className="grid w-full grid-rows-[auto,1fr,auto] border-r border-gray-700 md:max-w-sm">
          <Navbar loading={loading} />
          <div className="overflow-y-auto">
            <AccountList groupedAccounts={sortedGroups} />
          </div>
          <PopUp
            className="border-t border-gray-600 py-2"
            name={user?.Username || ''}
          >
            <a
              href="/settings"
              className="w-full rounded p-2 text-left text-white hover:bg-white/10"
            >
              Einstellungen
            </a>
            <a
              href="/logout"
              className="w-full rounded p-2 text-left text-white hover:bg-white/10"
            >
              Sign Out
            </a>
          </PopUp>
        </div>
      )}
      {(isDetailPage || !isMobile) && (
        <div className="mx-5 mt-10 w-full md:mx-10 md:mt-20">
          <Outlet />
        </div>
      )}
    </Layout>
  );
};

export default AccountsOverview;
