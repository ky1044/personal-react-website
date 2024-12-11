import React, { createContext, useContext, useEffect, useState } from "react";

type SiteData = {
  latestDeploy: number | null;
  stravaStats: {
    ytdDistance: number | null;
    allTimeDistance: number | null;
  };
};
interface ISiteDataProvider {
  data: SiteData;
  loading: boolean;
}
const initialState = {
  data: {
    latestDeploy: null,
    stravaStats: {
      ytdDistance: null,
      allTimeDistance: null,
    },
  },
  loading: true,
};

const SiteDataContext = createContext<ISiteDataProvider>(initialState);

export const useSiteData = () => useContext(SiteDataContext);

export const SiteDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [data, setData] = useState<SiteData>(initialState.data);
  const [loading, setLoading] = useState(initialState.loading);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const resp = await fetch(
          "https://ky1044.github.io/personal-react-website/data/data.json"
        );
        const respJson = await resp.json();
        setData(respJson);
      } catch (e) {
        console.log("error loading static data file\n", e);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <SiteDataContext.Provider
      value={{
        data,
        loading,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};
