import { cleanup, render } from '@testing-library/react';
import { BsFacebook } from 'react-icons/bs';
import { describe, expect, it } from 'vitest';
import { Footer } from '.';

describe.concurrent('Footer Component should be able to render a', () => {
  afterEach(cleanup);

  it('footer', () => {
    const { getByTestId } = render(<FooterTest />);
    expect(getByTestId('footer-element')).toBeTruthy();
  });

  it('footer with logo', () => {
    const { getByTestId } = render(<FooterTest />);
    expect((getByTestId('footer-element').children[0].children[0] as HTMLImageElement).src).toEqual(
      'https://flowbite.com/docs/images/logo.svg',
    );
  });

  it('footer with social media icons ', () => {
    const { getByTestId } = render(<FooterTest />);
    expect(getByTestId('footer-element').children[3].children[0].tagName).toEqual('svg');
  });
});

const FooterTest = (): JSX.Element => (
  <Footer>
    <Footer.Brand
      href="https://flowbite.com"
      src="https://flowbite.com/docs/images/logo.svg"
      alt="Flowbite Logo"
      name="Flowbite"
    />
    <Footer.LinkGroup>
      <Footer.Link href="#">About</Footer.Link>
      <Footer.Link href="#">Services</Footer.Link>
    </Footer.LinkGroup>
    <Footer.Copyright href="#" by="Flowbite™" year={2022} />
    <Footer.Icon href="#" icon={BsFacebook} />
  </Footer>
);
