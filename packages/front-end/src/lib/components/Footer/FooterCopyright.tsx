import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { useTheme } from '../Flowbite/ThemeContext';

export interface CopyrightProps extends Omit<PropsWithChildren<ComponentProps<'span'>>,'className'> {
  href?: string;
  by: string;
  year?: number;
}

export const FooterCopyright: FC<CopyrightProps> = ({ href, by, year }) => {
  const theme = useTheme().theme.footer.copyright;

  return (
    <div data-testid="footer-copyright">
      <span className={theme.base}>
        © {year}
        {href ? (
          <a href={href} className={theme.base}>
            {by}
          </a>
        ) : (
          <span className={theme.span}>{by}</span>
        )}
        . All Rights Reserved.
      </span>
    </div>
  );
};
