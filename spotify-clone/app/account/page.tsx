"use client"
import { Header } from '@/components/Header';

import { AccountContent } from './components/AccountContent';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/libs/helpers';

const Account = () => {

  const user = getCookie("sb-xleestdvpunvshbwzgnx-auth-token");
  const router = useRouter();

  useEffect(() => {
    console.log(user)
    if (!user) {
      router.push("/")
    }
  }, [user])

  if (!user) {
    return null;
  }

  return (
    <div
      className="
    overflow-hidden
    overflow-y-auto
    h-full
    w-full
    rounded-lg
    bg-neutral-900"
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Account Settings</h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};

export default Account;