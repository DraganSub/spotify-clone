import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupabaseUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propsName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const {
    isLoading: isLoadingUser,
    session,
    supabaseClient: supabase
  } = useSessionContext();

  const user = useSupabaseUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from("users").select("*").single();
  const getSupbscription = () => supabase.from("subscriptions").select("*, prices(*, products(*))").in("status", ["trialing", "active"]).single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSupbscription()]).then((results) => {
        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];

        if (userDetailsPromise.status === "fulfilled") {
          setUserDetails(userDetailsPromise.value.data as UserDetails)
        }

        if (subscriptionPromise.status === "fulfilled") {
          setSubscription(subscriptionPromise.value.data as Subscription)
        }

        setIsLoadingData(false);
      })
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setSubscription(null);
      setUserDetails(null)
    }

  }, [user, isLoadingUser])

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }

  return context;
}