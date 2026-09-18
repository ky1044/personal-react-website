import { PropsWithChildren } from "react";
import useTokenValue from "./useTokenValue";

/* Shared furniture for the styleguide. Deliberately built out of the same
   rails, hairlines and blue headings as the site itself — the page should
   look like it belongs to the thing it documents. */

export const Rails = ({ children }: PropsWithChildren) => (
  <div className="max-w-layout mx-auto border-l border-r border-layout-divider">
    {children}
  </div>
);

export const FullBleedRule = () => (
  <div className="w-screen border-t border-layout-divider relative left-1/2 -translate-x-1/2" />
);

export const Section = ({
  title,
  jp,
  intro,
  children,
}: PropsWithChildren<{ title: string; jp: string; intro?: string }>) => (
  <section>
    <div className="flex flex-row justify-between items-baseline gap-4 px-4 pt-16">
      <h1 className="text-primary-blue">{title}</h1>
      <h1 className="text-background-site leading-none md:block hidden">
        {jp}
      </h1>
    </div>
    {intro && (
      <p className="px-4 pb-6 max-w-[64ch] text-content-secondary">{intro}</p>
    )}
    <FullBleedRule />
    <div className="p-4">{children}</div>
  </section>
);

export const SubHead = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="mb-4">
    <h3>{title}</h3>
    {description && (
      <p className="text-sm text-content-secondary max-w-[68ch] mt-1">
        {description}
      </p>
    )}
  </div>
);

/** A token name rendered as the code you'd actually type. */
export const TokenName = ({ name }: { name: string }) => (
  <code className="text-2xs text-content-secondary break-all">
    var({name})
  </code>
);

export const Swatch = ({ token }: { token: string }) => {
  const read = useTokenValue();
  const value = read(token);
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-16 border border-layout-divider"
        style={{ background: value }}
        title={value}
      />
      <span className="text-xs font-medium text-content-primary">
        {token.replace(/^--/, "")}
      </span>
      <span className="text-2xs text-content-secondary uppercase">
        {value || "—"}
      </span>
    </div>
  );
};

export const SwatchGrid = ({ tokens }: { tokens: string[] }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
    {tokens.map((t) => (
      <Swatch key={t} token={t} />
    ))}
  </div>
);

/** Name / live value / copy-ready reference. */
export const TokenTable = ({ tokens }: { tokens: string[] }) => {
  const read = useTokenValue();
  return (
    <div className="border border-layout-divider overflow-hidden">
      {tokens.map((token, i) => (
        <div
          key={token}
          className={`grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1.2fr] gap-3 px-3 py-2 items-center ${
            i > 0 ? "border-t border-layout-divider" : ""
          }`}
        >
          <span className="text-sm font-medium">
            {token.replace(/^--/, "")}
          </span>
          <span className="text-sm text-content-secondary break-all">
            {read(token) || "—"}
          </span>
          <span className="hidden sm:block">
            <TokenName name={token} />
          </span>
        </div>
      ))}
    </div>
  );
};
