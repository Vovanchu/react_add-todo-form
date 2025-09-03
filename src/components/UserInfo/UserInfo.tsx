type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

interface UserInfoProps {
  user: User | undefined;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
