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
  const [data, setData] = useState<ISiteDataProvider>(initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(
          "https://ky1044.github.io/personal-react-website/data/data.json"
        );
        const respJson = await resp.json();
        setData({ data: respJson, loading: false });
      } catch (e) {
        console.log("error loading static data file\n", e);
        setData((prev) => ({ ...prev, loading: false }));
      }
    }
    fetchData();
  }, []);

  return (
    <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>
  );
};
