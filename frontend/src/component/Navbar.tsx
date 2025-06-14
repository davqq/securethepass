import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import loadingIcon from '@/assets/reload.svg';

interface NavbarProps {
  loading: boolean;
}

const Navbar = ({ loading }: NavbarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleNew = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/accounts/new');
  };

  return (
    <div className="gap-2 border-b border-gray-600 px-8 py-4">
      <form
        role="search"
        className="relative flex w-full gap-2"
        onSubmit={handleNew}
      >
        <Input
          id="q"
          aria-label="Search accounts"
          placeholder="Search"
          type="search"
          name="q"
          className="pl-7"
          value={searchParams.get('q') || ''}
          onChange={(e) => setSearchParams({ q: e.target.value })}
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 transform">
          <img
            src={loadingIcon}
            alt="search"
            className={`h-4 w-4 ${loading ? 'animate-spin' : 'animate-none'}`}
          />
        </div>
        <Button type="submit" color="blue">
          New
        </Button>
      </form>
    </div>
  );
};

export default Navbar;
